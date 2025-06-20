import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, total, clearCart } = useCart();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    toast.success('Proceeding to checkout...');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="mb-6">
              <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Looks like you haven't added anything to your cart yet</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
            >
              Start Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
          <p className="text-gray-400">{cartItems.length} items in your cart</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:bg-gray-700/50 transition-colors ${
                    index !== cartItems.length - 1 ? 'border-b border-gray-700' : ''
                  }`}
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">Unit Price: ${item.price.toFixed(2)}</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-gray-700 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Total Price */}
                  <div className="text-right sm:text-left">
                    <div className="text-xl font-bold text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Actions */}
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={clearCart}
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear Cart
              </button>
              <Link
                to="/products"
                className="text-pink-500 hover:text-pink-400 transition-colors flex items-center gap-2"
              >
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-white">Free</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax</span>
                  <span className="text-white">${(total * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-white">Total</span>
                    <span className="text-lg font-bold text-white">
                      ${(total + (total * 0.1)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-6 text-center text-gray-400 text-sm">
                <p>Secure Checkout</p>
                <p>Free shipping on all orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}