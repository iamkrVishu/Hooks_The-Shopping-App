import React, { useState, useEffect } from 'react';
import { Tag, Clock, Percent } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { generateSampleProducts } from '../lib/sampleProducts';

export default function Deals() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(generateSampleProducts());
  }, []);

  const deals = [
    {
      id: 'flash-sale',
      title: 'Flash Sale',
      description: 'Limited time offers with massive discounts',
      endsIn: '2h 45m',
      type: 'time-limited',
      discount: '50%'
    },
    {
      id: 'clearance',
      title: 'Clearance',
      description: 'End of season clearance sale',
      type: 'ongoing',
      discount: '70%'
    },
    {
      id: 'bundle',
      title: 'Bundle Deals',
      description: 'Save more when you buy together',
      type: 'bundle',
      discount: '30%'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Special Deals</h1>

        {/* Featured Deals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-gray-800 rounded-xl p-6 relative overflow-hidden group"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-6 h-6 text-pink-500" />
                  <h3 className="text-xl font-bold text-white">{deal.title}</h3>
                </div>
                <p className="text-gray-400 mb-4">{deal.description}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-pink-500">
                    <Percent className="w-4 h-4" />
                    <span className="font-bold">Up to {deal.discount} OFF</span>
                  </div>
                  {deal.endsIn && (
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>Ends in {deal.endsIn}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 transform -skew-y-6 scale-150 -translate-y-1/2 group-hover:skew-y-0 transition-transform duration-700" />
            </div>
          ))}
        </div>

        {/* Deal Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                price: product.price * 0.7 // 30% discount
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}