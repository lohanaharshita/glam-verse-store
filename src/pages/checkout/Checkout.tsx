
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";

const Checkout = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address) {
      toast({
        title: "Error",
        description: "Please enter a delivery address",
        variant: "destructive",
      });
      return;
    }
    
    setProcessing(true);
    
    // This would normally connect to Supabase
    // For now we'll simulate a successful order
    setTimeout(() => {
      toast({
        title: "Order Placed!",
        description: "Your order has been successfully placed.",
      });
      setProcessing(false);
      navigate("/orders");
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif font-bold text-glamup-800 mb-8">Checkout</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-medium mb-4">Shipping Information</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    defaultValue={user?.name || ""}
                    readOnly
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    defaultValue={user?.email || ""}
                    readOnly
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address
                  </label>
                  <textarea
                    id="address"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    placeholder="Enter your full delivery address"
                  />
                </div>
                
                <h2 className="text-xl font-medium mb-4 mt-8">Payment Method</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="card"
                      name="paymentMethod"
                      type="radio"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="h-4 w-4 text-glamup-600"
                    />
                    <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
                      Credit/Debit Card
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="upi"
                      name="paymentMethod"
                      type="radio"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="h-4 w-4 text-glamup-600"
                    />
                    <label htmlFor="upi" className="ml-3 block text-sm font-medium text-gray-700">
                      UPI
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="netbanking"
                      name="paymentMethod"
                      type="radio"
                      checked={paymentMethod === "netbanking"}
                      onChange={() => setPaymentMethod("netbanking")}
                      className="h-4 w-4 text-glamup-600"
                    />
                    <label htmlFor="netbanking" className="ml-3 block text-sm font-medium text-gray-700">
                      Net Banking
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="cod"
                      name="paymentMethod"
                      type="radio"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="h-4 w-4 text-glamup-600"
                    />
                    <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">
                      Cash on Delivery
                    </label>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full mt-8 bg-glamup-600 text-white py-3 px-4 rounded-md hover:bg-glamup-700 transition-colors"
                  disabled={processing}
                >
                  {processing ? "Processing..." : "Complete Order"}
                </button>
              </form>
            </div>
          </div>
          
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-medium mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">$79.98</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">$4.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">$6.40</span>
                </div>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>$91.37</span>
                </div>
              </div>
              
              <div className="mt-6">
                <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">
                  Coupon Code
                </label>
                <div className="flex">
                  <input
                    id="coupon"
                    type="text"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md"
                    placeholder="Enter code"
                  />
                  <button className="bg-gray-100 px-4 py-2 border border-gray-300 border-l-0 rounded-r-md hover:bg-gray-200 transition-colors">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
