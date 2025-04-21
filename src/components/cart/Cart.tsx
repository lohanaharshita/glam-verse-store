
import { X, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items, isCartOpen, toggleCart, removeItem, updateQuantity, totalPrice } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleCart}></div>
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
            {/* Cart header */}
            <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
              <div className="flex items-center">
                <ShoppingCart size={24} className="text-glamup-600 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
                <span className="ml-2 text-sm text-gray-500">
                  ({items.length} {items.length === 1 ? "item" : "items"})
                </span>
              </div>
              <button
                onClick={toggleCart}
                className="text-gray-400 hover:text-gray-500"
                aria-label="Close cart"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart items */}
            <div className="flex-1 p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <ShoppingCart size={48} className="text-gray-300 mb-4" />
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <button
                    onClick={toggleCart}
                    className="btn-glamup-outline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex border-b border-gray-200 pb-4">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">${item.price.toFixed(2)}</p>
                          </div>
                          {item.size && (
                            <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
                          )}
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="text-gray-500 hover:text-gray-700 px-2 border rounded-l-md"
                            >
                              -
                            </button>
                            <span className="px-2 border-t border-b">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-gray-500 hover:text-gray-700 px-2 border rounded-r-md"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="font-medium text-glamup-600 hover:text-glamup-800 flex items-center"
                          >
                            <Trash2 size={16} className="mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-4">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                  <p>Subtotal</p>
                  <p>${totalPrice.toFixed(2)}</p>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Shipping and taxes calculated at checkout.
                </p>
                <Link
                  to="/checkout"
                  onClick={toggleCart}
                  className="w-full btn-glamup flex items-center justify-center"
                >
                  Checkout
                </Link>
                <div className="mt-2">
                  <button
                    onClick={toggleCart}
                    className="w-full text-sm text-glamup-600 hover:text-glamup-800"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
