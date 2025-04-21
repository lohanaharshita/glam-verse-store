
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Search } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import Layout from "@/components/layout/Layout";
import { products, categories } from "@/data/products";
import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const [featuredProducts, setFeaturedProducts] = useState(products.filter(p => p.isFeatured));
  const [newArrivals, setNewArrivals] = useState(products.filter(p => p.isNew));
  const [searchQuery, setSearchQuery] = useState("");

  // Get current hour to display appropriate greeting
  const currentHour = new Date().getHours();
  let greeting = "Hello";
  if (currentHour < 12) greeting = "Good morning";
  else if (currentHour < 18) greeting = "Good afternoon";
  else greeting = "Good evening";

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[500px] bg-glamup-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Fashion Hero"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
              Discover Your Style
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Explore our curated collection of fashion, beauty, and accessories to express your unique style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/categories"
                className="btn-glamup px-8 py-3 text-center"
              >
                Shop Now
              </Link>
              <Link
                to="/new-arrivals"
                className="btn-glamup-outline bg-white/10 backdrop-blur px-8 py-3 text-center"
              >
                New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome message when user is logged in */}
      {user && (
        <section className="py-6 bg-gradient-to-r from-glamup-50 to-soft-purple">
          <div className="container mx-auto px-4">
            <div className="flex items-center">
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full border-2 border-white mr-4"
                />
              )}
              <div>
                <p className="text-gray-600">{greeting}</p>
                <h2 className="text-xl font-medium text-glamup-800">
                  Welcome back, {user.name}
                </h2>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search Bar */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-glamup-500"
            />
            <Search
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gradient-to-b from-white to-soft-purple">
        <div className="container mx-auto px-4">
          <h2 className="section-heading text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                  <ChevronRight
                    size={20}
                    className="text-glamup-500 group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-heading">Featured Products</h2>
            <Link
              to="/categories"
              className="text-glamup-600 hover:text-glamup-800 font-medium flex items-center"
            >
              View All
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      {newArrivals.length > 0 && (
        <section className="py-12 bg-soft-gray">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="section-heading">New Arrivals</h2>
              <Link
                to="/new-arrivals"
                className="text-glamup-600 hover:text-glamup-800 font-medium flex items-center"
              >
                View All
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {newArrivals.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Banner */}
      <section className="py-12 bg-gradient-to-r from-glamup-800 to-glamup-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Special Offer: 20% Off Your First Order
            </h2>
            <p className="text-lg mb-8 text-gray-200">
              Sign up for our newsletter and get an exclusive discount on your first purchase.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-md focus:outline-none text-gray-800 w-full"
              />
              <button className="bg-white text-glamup-800 hover:bg-gray-100 font-medium px-6 py-2 rounded-md transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
