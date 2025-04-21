
import { useState } from "react";
import QRCode from "react-qr-code";
import { User, Mail, Phone, MapPin, ShoppingBag, LogOut, Edit } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ProfilePicture from "@/components/profile/ProfilePicture";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState(user?.avatar);
  
  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "555-123-4567", // Mock data
    address: "123 Fashion St, New York, NY 10001", // Mock data
  });

  // QR code URL (redirects to Vogue fashion page as requested)
  const qrCodeUrl = "https://www.vogue.com/fashion";

  // Handle avatar change
  const handleAvatarChange = (newAvatarUrl: string) => {
    setAvatar(newAvatarUrl);
    // In a real app with Supabase, this would update the user's avatar in the database
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile
    setIsEditing(false);
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-serif font-bold text-glamup-800 mb-8">My Profile</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="bg-white rounded-lg shadow-md p-6 h-fit">
              <div className="flex flex-col items-center text-center mb-6">
                <ProfilePicture 
                  avatarUrl={avatar} 
                  userName={user.name}
                  onAvatarChange={handleAvatarChange}
                />
                <h2 className="text-xl font-medium mt-4">{user.name}</h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
                <p className="text-xs mt-1 bg-glamup-100 text-glamup-800 px-2 py-1 rounded-full">
                  {user.role === "admin" ? "Admin" : "Customer"}
                </p>
              </div>

              <div className="flex flex-col space-y-1 mb-6">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-glamup-800 bg-glamup-50 rounded-md font-medium"
                >
                  <User size={18} className="mr-3" />
                  <span>Profile</span>
                </Link>
                <Link
                  to="/orders"
                  className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                >
                  <ShoppingBag size={18} className="mr-3" />
                  <span>Orders</span>
                </Link>
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                  >
                    <User size={18} className="mr-3" />
                    <span>Admin Dashboard</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-md mt-4"
                >
                  <LogOut size={18} className="mr-3" />
                  <span>Logout</span>
                </button>
              </div>

              {/* QR Code */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Scan to Visit Vogue Fashion</h3>
                <div className="bg-white p-4 rounded-lg border flex justify-center">
                  <QRCode value={qrCodeUrl} size={150} />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Scan to discover latest fashion trends at Vogue
                </p>
              </div>
            </div>

            {/* Main content */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-medium">Personal Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-glamup-600 flex items-center text-sm font-medium"
                  >
                    <Edit size={16} className="mr-1" />
                    {isEditing ? "Cancel" : "Edit"}
                  </button>
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-glamup-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-glamup-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-glamup-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-glamup-500"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="btn-glamup px-6 py-2"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <User className="text-glamup-600 w-5 h-5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                        <p>{user.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="text-glamup-600 w-5 h-5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                        <p>{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="text-glamup-600 w-5 h-5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                        <p>555-123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="text-glamup-600 w-5 h-5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Address</h3>
                        <p>123 Fashion St, New York, NY 10001</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Recent Orders (placeholder) */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-medium">Recent Orders</h2>
                  <Link to="/orders" className="text-glamup-600 text-sm font-medium">
                    View All
                  </Link>
                </div>

                <div className="border rounded-md divide-y">
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="font-medium">Order #1092</p>
                      <p className="text-sm text-gray-500">Placed on April 12, 2025</p>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Delivered
                      </span>
                      <span className="ml-4 text-glamup-600 text-sm font-medium">$154.90</span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="font-medium">Order #1085</p>
                      <p className="text-sm text-gray-500">Placed on March 24, 2025</p>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Processing
                      </span>
                      <span className="ml-4 text-glamup-600 text-sm font-medium">$89.99</span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="font-medium">Order #1076</p>
                      <p className="text-sm text-gray-500">Placed on February 18, 2025</p>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Delivered
                      </span>
                      <span className="ml-4 text-glamup-600 text-sm font-medium">$253.25</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
