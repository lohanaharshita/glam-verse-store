
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";

// Mock order data
const MOCK_ORDERS = [
  {
    id: "ORD-001",
    date: "2025-04-18",
    status: "Delivered",
    total: 91.37,
    items: [
      { id: 1, name: "Glamour Eyeshadow Palette", price: 34.99, quantity: 1 },
      { id: 2, name: "Silk Scarf - Teal Pattern", price: 44.99, quantity: 1 }
    ]
  },
  {
    id: "ORD-002",
    date: "2025-04-10",
    status: "Processing",
    total: 65.98,
    items: [
      { id: 3, name: "Premium Facial Serum", price: 29.99, quantity: 1 },
      { id: 4, name: "Hydrating Face Mask Set", price: 35.99, quantity: 1 }
    ]
  }
];

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState(MOCK_ORDERS);

  // In a real application, this would fetch from Supabase
  useEffect(() => {
    // Simulating data fetching
    console.log("Fetching orders for user:", user?.id);
  }, [user]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif font-bold text-glamup-800 mb-8">My Orders</h1>
        
        {orders.length === 0 ? (
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
                          : "bg-blue-100 text-blue-800"
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
