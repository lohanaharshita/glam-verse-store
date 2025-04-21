
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { totalItems, toggleCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar with announcement or shipping info */}
      <div className="bg-glamup-800 text-white text-center py-2 text-sm">
        Free shipping on orders over $100 | Use code GLAMUP20 for 20% off
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-serif font-bold text-glamup-800">
            GlamUp
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-glamup-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/categories"
              className="text-gray-700 hover:text-glamup-600 transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/new-arrivals"
              className="text-gray-700 hover:text-glamup-600 transition-colors"
            >
              New Arrivals
            </Link>
            <Link
              to="/sale"
              className="text-gray-700 hover:text-glamup-600 transition-colors"
            >
              Sale
            </Link>
          </nav>

          {/* Icons for search, account, cart */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className="text-gray-700 hover:text-glamup-600 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <div className="relative">
              {isAuthenticated ? (
                <div className="relative group">
                  <Link
                    to={isAdmin ? "/admin" : "/profile"}
                    className="flex items-center text-gray-700 hover:text-glamup-600 transition-colors"
                  >
                    <User size={20} />
                  </Link>
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="py-2 px-4 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to={isAdmin ? "/admin" : "/profile"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-glamup-50"
                      >
                        {isAdmin ? "Admin Dashboard" : "My Profile"}
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-glamup-50"
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-glamup-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-glamup-600 transition-colors"
                >
                  <User size={20} />
                </Link>
              )}
            </div>

            <button
              onClick={toggleCart}
              className="text-gray-700 hover:text-glamup-600 transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-glamup-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-700 hover:text-glamup-600 transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search bar - conditionally rendered */}
        {isSearchOpen && (
          <div className="mt-4 relative animate-fade-in">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full p-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-glamup-500"
            />
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <button
              onClick={toggleSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Mobile Navigation - conditionally rendered */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 animate-fade-in">
            <div className="flex flex-col space-y-2 py-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-glamup-600 transition-colors py-2 px-1 border-b border-gray-100"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/categories"
                className="text-gray-700 hover:text-glamup-600 transition-colors py-2 px-1 border-b border-gray-100"
                onClick={toggleMobileMenu}
              >
                Shop
              </Link>
              <Link
                to="/new-arrivals"
                className="text-gray-700 hover:text-glamup-600 transition-colors py-2 px-1 border-b border-gray-100"
                onClick={toggleMobileMenu}
              >
                New Arrivals
              </Link>
              <Link
                to="/sale"
                className="text-gray-700 hover:text-glamup-600 transition-colors py-2 px-1"
                onClick={toggleMobileMenu}
              >
                Sale
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
