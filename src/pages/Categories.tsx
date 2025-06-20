import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Laptop, Headphones, Camera, Gamepad, Monitor, Router, Speaker, Watch, Keyboard, Tablet, Printer } from 'lucide-react';

export default function Categories() {
  const categories = [
    {
      id: 'smartphones',
      name: 'Smartphones',
      icon: <Smartphone className="w-8 h-8" />,
      count: 156,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'laptops',
      name: 'Laptops',
      icon: <Laptop className="w-8 h-8" />,
      count: 89,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'audio',
      name: 'Audio',
      icon: <Headphones className="w-8 h-8" />,
      count: 204,
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 'cameras',
      name: 'Cameras',
      icon: <Camera className="w-8 h-8" />,
      count: 76,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'gaming',
      name: 'Gaming',
      icon: <Gamepad className="w-8 h-8" />,
      count: 167,
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'monitors',
      name: 'Monitors',
      icon: <Monitor className="w-8 h-8" />,
      count: 94,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'networking',
      name: 'Networking',
      icon: <Router className="w-8 h-8" />,
      count: 52,
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'accessories',
      name: 'Accessories',
      icon: <Keyboard className="w-8 h-8" />,
      count: 312,
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      id: 'wearables',
      name: 'Wearables',
      icon: <Watch className="w-8 h-8" />,
      count: 83,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'tablets',
      name: 'Tablets',
      icon: <Tablet className="w-8 h-8" />,
      count: 45,
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'audio-devices',
      name: 'Audio Devices',
      icon: <Speaker className="w-8 h-8" />,
      count: 128,
      color: 'from-rose-500 to-rose-600'
    },
    {
      id: 'printers',
      name: 'Printers',
      icon: <Printer className="w-8 h-8" />,
      count: 37,
      color: 'from-emerald-500 to-emerald-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Browse Categories</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group relative overflow-hidden rounded-xl bg-gray-800 p-6 transition-transform hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <div className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-white`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                  <p className="text-gray-400">{category.count} Products</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}