
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { ProductData } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

interface ProductCardProps {
  product: ProductData;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  // Calculate discount percentage if originalPrice exists
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div 
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-container">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} className="product-image" />
        </Link>
        
        {/* Quick actions - visible on hover */}
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-3 flex justify-between transition-all duration-300 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          <button 
            onClick={() => addItem(product)}
            className="flex-1 bg-glamup-600 hover:bg-glamup-700 text-white py-2 rounded-l-md text-sm font-medium transition-colors flex items-center justify-center"
          >
            <ShoppingCart size={16} className="mr-1" />
            Add to Cart
          </button>
          <button className="bg-white hover:bg-gray-100 p-2 rounded-r-md border-y border-r border-gray-200">
            <Heart size={16} className="text-glamup-600" />
          </button>
        </div>
        
        {/* Badges */}
        {product.isNew && (
          <span className="product-badge">New</span>
        )}
        
        {discountPercentage && (
          <span className="discount-badge">-{discountPercentage}%</span>
        )}
      </div>
      
      <div className="p-4">
        <div className="mb-1 text-xs text-gray-500 uppercase">{product.category}</div>
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-sm md:text-base font-medium text-gray-800 hover:text-glamup-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-2 flex items-center">
          <span className="text-lg font-semibold text-glamup-800">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        {/* Rating stars */}
        {product.reviews && (
          <div className="mt-2 flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.reviews.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-xs text-gray-500">
              ({product.reviews.count})
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
