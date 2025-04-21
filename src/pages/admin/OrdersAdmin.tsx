
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { Package, X, Check } from "lucide-react";

// Types
interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  total: number;
  items: OrderItem[];
}

const OrdersAdmin = () => {
  const { toast } = useToast();
  
  // Mock orders data
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customerId: "2",
      customerName: "Regular User",
      customerEmail: "user@glamup.com",
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
      customerId: "2",
      customerName: "Regular User",
      customerEmail: "user@glamup.com",
      date: "2025-04-10",
      status: "Processing",
      total: 65.98,
      items: [
        { id: 3, name: "Premium Facial Serum", price: 29.99, quantity: 1 },
        { id: 4, name: "Hydrating Face Mask Set", price: 35.99, quantity: 1 }
      ]
    },
    {
      id: "ORD-003",
      customerId: "3",
      customerName: "Sophie Martinez",
      customerEmail: "sophie@example.com",
      date: "2025-04-20",
      status: "Pending",
      total: 127.45,
      items: [
        { id: 5, name: "Designer Handbag - Black", price: 89.99, quantity: 1 },
        { id: 6, name: "Gold Hoop Earrings", price: 37.46, quantity: 1 }
      ]
    }
  ]);

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} has been marked as ${newStatus}`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif font-bold text-glamup-800 mb-8">Order Management</h1>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">All Orders</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-glamup-500 focus:border-glamup-500"
                  />
                  <svg
                    className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "Delivered" 
                          ? "bg-green-100 text-green-800" 
                          : order.status === "Processing"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "Shipped"
                          ? "bg-purple-100 text-purple-800"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => updateOrderStatus(order.id, "Processing")}
                          className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 p-1 rounded"
                          title="Mark as Processing"
                        >
                          <Package size={16} />
                        </button>
                        <button 
                          onClick={() => updateOrderStatus(order.id, "Delivered")}
                          className="text-green-600 hover:text-green-900 bg-green-50 p-1 rounded"
                          title="Mark as Delivered"
                        >
                          <Check size={16} />
                        </button>
                        <button 
                          onClick={() => updateOrderStatus(order.id, "Cancelled")}
                          className="text-red-600 hover:text-red-900 bg-red-50 p-1 rounded"
                          title="Mark as Cancelled"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {orders.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-gray-500">No orders found</p>
            </div>
          )}
          
          <div className="px-6 py-4 bg-gray-50 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{orders.length}</span> orders
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrdersAdmin;
