
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

// Define types based on our database structure
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
}

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        // Fetch orders from Supabase
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('id, created_at, status, total')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (ordersError) throw ordersError;
        
        // For each order, fetch its items
        const ordersWithItems = await Promise.all(
          (ordersData || []).map(async (order) => {
            // Fetch order items with product details
            const { data: itemsData, error: itemsError } = await supabase
              .from('order_items')
              .select(`
                id, 
                quantity, 
                price,
                product_id,
                products (name)
              `)
              .eq('order_id', order.id);
              
            if (itemsError) throw itemsError;
            
            // Format order items for display
            const items: OrderItem[] = (itemsData || []).map(item => ({
              id: item.id,
              name: item.products?.name || 'Unknown Product',
              price: item.price,
              quantity: item.quantity
            }));
            
            // Format the order
            return {
              id: order.id,
              date: new Date(order.created_at).toISOString().split('T')[0],
              status: order.status,
              total: order.total,
              items
            };
          })
        );
        
        setOrders(ordersWithItems);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [user]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif font-bold text-glamup-800 mb-8">My Orders</h1>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-glamup-600" />
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-medium mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex flex-wrap justify-between items-center">
                    <div>
                      <h2 className="text-xl font-medium">{order.id}</h2>
                      <p className="text-gray-600">{order.date}</p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "Delivered" 
                          ? "bg-green-100 text-green-800" 
                          : order.status === "Processing"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4">
                  <h3 className="text-lg font-medium mb-3">Items</h3>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 border-t">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-700">Order Total</p>
                    <p className="text-xl font-semibold">${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Orders;
