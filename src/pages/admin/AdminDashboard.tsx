import { useState } from "react";
import { Package, Users, ShoppingBag, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Redirect if not admin
  if (!isAdmin) {
    navigate("/");
    return null;
  }

  // Mock stats
  const stats = [
    { title: "Total Products", value: "128", icon: Package, color: "bg-blue-500" },
    { title: "Total Users", value: "2,543", icon: Users, color: "bg-green-500" },
    { title: "Total Orders", value: "1,839", icon: ShoppingBag, color: "bg-purple-500" },
  ];

  // Mock recent users
  const recentUsers = [
    { id: "1", name: "Alice Johnson", email: "alice@example.com", date: "Apr 15, 2025", status: "active" },
    { id: "2", name: "Robert Smith", email: "robert@example.com", date: "Apr 14, 2025", status: "active" },
    { id: "3", name: "Emma Wilson", email: "emma@example.com", date: "Apr 12, 2025", status: "inactive" },
    { id: "4", name: "Michael Brown", email: "michael@example.com", date: "Apr 10, 2025", status: "active" },
  ];

  // Mock recent orders
  const recentOrders = [
    { id: "1094", customer: "Alice Johnson", total: "$154.90", date: "Apr 15, 2025", status: "delivered" },
    { id: "1093", customer: "Robert Smith", total: "$89.99", date: "Apr 14, 2025", status: "processing" },
    { id: "1092", customer: "Emma Wilson", total: "$245.50", date: "Apr 12, 2025", status: "pending" },
    { id: "1091", customer: "Michael Brown", total: "$112.30", date: "Apr 10, 2025", status: "delivered" },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-glamup-800">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <button 
              className="btn-glamup"
              onClick={() => navigate("/admin/add-product")}
            >
              Add New Product
            </button>
            <button 
              className="btn-glamup"
              onClick={() => navigate("/admin/orders")}
            >
              Manage Orders
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex overflow-x-auto">
            <button
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                activeTab === "overview"
                  ? "border-b-2 border-glamup-600 text-glamup-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                activeTab === "products"
                  ? "border-b-2 border-glamup-600 text-glamup-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("products")}
            >
              Products
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                activeTab === "users"
                  ? "border-b-2 border-glamup-600 text-glamup-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("users")}
            >
              Users
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                activeTab === "orders"
                  ? "border-b-2 border-glamup-600 text-glamup-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => navigate("/admin/orders")}
            >
              Orders
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">Recent Users</h2>
              <button className="text-glamup-600 text-sm font-medium flex items-center">
                View All
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{user.date}</p>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">Recent Orders</h2>
              <button 
                className="text-glamup-600 text-sm font-medium flex items-center"
                onClick={() => navigate("/admin/orders")}
              >
                View All
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-glamup-600">{order.total}</p>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "processing"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
