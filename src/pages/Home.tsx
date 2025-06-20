import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { supabase } from '../lib/supabase';
import LoadingSpinner from '../components/LoadingSpinner';
import { ArrowRight, Sparkles, Shield, Truck, Headphones, Smartphone, Camera, Laptop, Gamepad, Monitor, Router, Speaker, Cpu, Watch, Keyboard, Mouse, Microscope as Microphone, Printer, Tablet, Tv } from 'lucide-react';
import { generateSampleProducts } from '../lib/sampleProducts';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const productsPerPage = 20;

  useEffect(() => {
    // Load sample products first to ensure we have data
    const sampleProducts = generateSampleProducts();
    setProducts(sampleProducts);
    setLoading(false);
    
    // Try to fetch from Supabase, but don't block UI on this
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = selectedCategory === 'all'
      ? products
      : products.filter(product => product.category === selectedCategory);
    
    setVisibleProducts(filtered.slice(0, page * productsPerPage));
  }, [selectedCategory, products, page]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) {
        console.warn('Using sample products due to Supabase error:', error.message);
        return; // Keep using sample products
      }
      
      if (data && data.length > 0) {
        setProducts(data);
      }
    } catch (error) {
      // Just log the error but don't affect the UI
      console.warn('Using sample products due to fetch error:', error);
      // We already have sample products loaded, so no need to set loading to false again
    }
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const categories = [
    { id: 'vr', name: 'VR & AR', icon: <Headphones /> },
    { id: 'audio', name: 'Audio', icon: <Speaker /> },
    { id: 'monitors', name: 'Monitors', icon: <Monitor /> },
    { id: 'accessories', name: 'Accessories', icon: <Gamepad /> },
    { id: 'smart-home', name: 'Smart Home', icon: <Smartphone /> },
    { id: 'cameras', name: 'Cameras', icon: <Camera /> },
    { id: 'networking', name: 'Networking', icon: <Router /> },
    { id: 'laptops', name: 'Laptops', icon: <Laptop /> },
    { id: 'gaming', name: 'Gaming', icon: <Gamepad /> },
    { id: 'phones', name: 'Phones', icon: <Smartphone /> },
    { id: 'tablets', name: 'Tablets', icon: <Tablet /> },
    { id: 'printers', name: 'Printers', icon: <Printer /> }
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-pink-600 opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 pt-32 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
                Next Generation
              </span>
              <br />
              <span className="text-white">Tech & Gadgets</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Discover cutting-edge technology and premium gaming gear
            </p>
            <button className="bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors duration-300 shadow-lg shadow-pink-500/20">
              Explore Now
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <div className={`mb-2 ${
                  selectedCategory === category.id
                    ? 'text-white'
                    : 'text-pink-500'
                }`}>
                  {category.icon}
                </div>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">Featured Products</h2>
            <button className="flex items-center space-x-2 text-pink-500 hover:text-pink-400">
              <span>View All</span>
              <ArrowRight size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {visibleProducts.length < (selectedCategory === 'all' ? products.length : products.filter(p => p.category === selectedCategory).length) && (
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Load More
              </button>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center space-x-4 p-6 rounded-xl bg-gray-800/50">
            <div className="bg-pink-500/10 p-3 rounded-lg">
              <Truck className="h-6 w-6 text-pink-500" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Free Shipping</h3>
              <p className="text-gray-400">On orders over $100</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-6 rounded-xl bg-gray-800/50">
            <div className="bg-purple-500/10 p-3 rounded-lg">
              <Shield className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Secure Payment</h3>
              <p className="text-gray-400">100% secure checkout</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-6 rounded-xl bg-gray-800/50">
            <div className="bg-pink-500/10 p-3 rounded-lg">
              <Sparkles className="h-6 w-6 text-pink-500" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Premium Support</h3>
              <p className="text-gray-400">24/7 customer service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}