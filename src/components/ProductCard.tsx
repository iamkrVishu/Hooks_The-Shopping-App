import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  return (
    <div
      className="group relative bg-gray-800 rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-80' : 'opacity-60'}`} />
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 space-y-2 z-20">
          <button
            onClick={handleWishlist}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
              isWishlisted
                ? 'bg-pink-500 text-white'
                : 'bg-gray-900/50 text-gray-300 hover:bg-gray-900 hover:text-white'
            }`}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-gray-900/50 text-gray-300 hover:bg-gray-900 hover:text-white backdrop-blur-sm transition-all duration-300"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
        {product.stock < 10 && (
          <div className="absolute top-4 left-4 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
            Only {product.stock} left
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white line-clamp-1">{product.name}</h3>
          </div>
          <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
              ${product.price.toFixed(2)}
            </span>
            {product.stock > 0 && (
              <span className="ml-2 text-sm text-gray-400">
                In Stock
              </span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform active:scale-95 ${
              product.stock === 0
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-pink-600 text-white hover:bg-pink-700 hover:shadow-lg hover:shadow-pink-500/30'
            }`}
          >
            <ShoppingCart size={18} />
            <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}