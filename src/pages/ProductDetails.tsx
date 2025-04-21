
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, ChevronLeft, Star, Truck, Shield, RefreshCw } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/components/products/ProductCard";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  // Find product by ID
  const product = products.find((p) => p.id === id);
  
  // State for product options
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Find related products (same category, excluding current product)
  const relatedProducts = products.filter(
    (p) => p.category === product?.category && p.id !== id
  ).slice(0, 4);

  // Handle not found product
  useEffect(() => {
    if (!product) {
      navigate("/not-found");
    } else if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product, navigate]);

  if (!product) {
    return null; // Will navigate away in the useEffect
  }

  // Handle adding to cart
  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize);
  };

  // Handle buy now
  const handleBuyNow = () => {
    addItem(product, quantity, selectedSize);
    navigate("/checkout");
  };

  // Decrease quantity (minimum 1)
  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  // Increase quantity
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center text-glamup-600 hover:text-glamup-800">
            <ChevronLeft size={16} className="mr-1" />
            Back
          </button>
          <span className="mx-2">/</span>
          <span>{product.category}</span>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{product.name}</span>
        </div>

        {/* Product Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white border rounded-lg overflow-hidden h-[400px] md:h-[500px]">
              <img
                src={product.images?.[activeImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 border rounded-md overflow-hidden ${
                      activeImageIndex === index ? "border-glamup-600 ring-2 ring-glamup-200" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            
            {/* Category */}
            <div className="text-sm text-gray-500 uppercase mb-4">
              {product.category}
            </div>
            
            {/* Price */}
            <div className="flex items-center mb-6">
              <span className="text-3xl font-semibold text-glamup-800">
                ${product.price.toFixed(2)}
              </span>
              
              {product.originalPrice && (
                <>
                  <span className="ml-3 text-lg text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="ml-3 text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>
            
            {/* Rating */}
            {product.reviews && (
              <div className="flex items-center mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < Math.floor(product.reviews.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {product.reviews.rating.toFixed(1)} ({product.reviews.count} reviews)
                </span>
              </div>
            )}
            
            {/* Description */}
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            {/* Product Options */}
            <div className="space-y-6 mb-8">
              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Size
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 border rounded-md text-sm font-medium ${
                          selectedSize === size
                            ? "border-glamup-600 bg-glamup-50 text-glamup-800"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Color
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <div
                        key={color}
                        className="relative w-8 h-8 rounded-full border-2 border-white ring-1 ring-gray-200 cursor-pointer hover:ring-gray-400"
                        style={{
                          backgroundColor: color.toLowerCase().replace(" ", ""),
                        }}
                        title={color}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity Selector */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Quantity
                </h3>
                <div className="flex items-center">
                  <button
                    onClick={decreaseQuantity}
                    className="px-3 py-1 border border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-12 py-1 px-2 border-t border-b border-gray-300 text-center [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    onClick={increaseQuantity}
                    className="px-3 py-1 border border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            
            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-glamup-outline flex items-center justify-center"
              >
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 btn-glamup flex items-center justify-center"
              >
                Buy Now
              </button>
              <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
                <Heart size={20} className="text-glamup-600" />
              </button>
            </div>
            
            {/* Shipping and Returns */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-start">
                <Truck className="text-glamup-600 w-5 h-5 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Free Shipping</h3>
                  <p className="text-sm text-gray-500">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield className="text-glamup-600 w-5 h-5 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Secure Checkout</h3>
                  <p className="text-sm text-gray-500">Safe & protected checkout</p>
                </div>
              </div>
              <div className="flex items-start">
                <RefreshCw className="text-glamup-600 w-5 h-5 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Easy Returns</h3>
                  <p className="text-sm text-gray-500">30 days return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button className="border-glamup-600 text-glamup-600 py-4 px-1 border-b-2 font-medium text-sm">
                Details
              </button>
              <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 border-b-2 font-medium text-sm">
                Reviews
              </button>
              <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 border-b-2 font-medium text-sm">
                Shipping & Returns
              </button>
            </nav>
          </div>
          
          <div className="py-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Specifications</h3>
            
            {product.specifications ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex">
                    <span className="w-32 flex-shrink-0 text-sm font-medium text-gray-500">
                      {key}
                    </span>
                    <span className="text-sm text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No specifications available for this product.</p>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="section-heading mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
