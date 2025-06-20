import React, { useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, ChevronRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

type OrderStatus = 'pending' | 'completed' | 'canceled';

interface Order {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

const sampleOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-02-05T10:30:00Z',
    total: 299.99,
    status: 'pending',
    items: [
      {
        id: 1,
        name: 'TechPro Wireless Headphones X 2024',
        quantity: 1,
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 2,
        name: 'Elite Gaming Mouse Pro 2024',
        quantity: 1,
        price: 100.00,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'ORD-2024-002',
    date: '2024-02-03T15:45:00Z',
    total: 1299.99,
    status: 'completed',
    items: [
      {
        id: 3,
        name: 'NextGen Gaming Laptop Ultra 2024',
        quantity: 1,
        price: 1299.99,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'ORD-2024-003',
    date: '2024-02-01T09:15:00Z',
    total: 549.99,
    status: 'canceled',
    items: [
      {
        id: 4,
        name: 'Prime 4K Monitor Elite 2024',
        quantity: 1,
        price: 549.99,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80'
      }
    ]
  }
];

const statusColors = {
  pending: 'bg-yellow-500/10 text-yellow-500',
  completed: 'bg-green-500/10 text-green-500',
  canceled: 'bg-red-500/10 text-red-500'
};

const statusIcons = {
  pending: <Clock className="w-4 h-4" />,
  completed: <CheckCircle className="w-4 h-4" />,
  canceled: <XCircle className="w-4 h-4" />
};

export default function Orders() {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = sampleOrders
    .filter(order => selectedStatus === 'all' || order.status === selectedStatus)
    .filter(order => 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">My Orders</h1>
          <p className="text-gray-400">Track and manage your orders</p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <div className="flex gap-4">
            {(['all', 'pending', 'completed', 'canceled'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedStatus === status
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700/50 transition-colors"
            >
              {/* Order Header */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{order.id}</h3>
                      <p className="text-gray-400 text-sm">{formatDate(order.date)}</p>
                    </div>
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${statusColors[order.status]}`}>
                      {statusIcons[order.status]}
                      <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-white">${order.total.toFixed(2)}</div>
                    <div className="text-gray-400 text-sm">{order.items.length} items</div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium truncate">{item.name}</h4>
                        <p className="text-gray-400">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">${item.price.toFixed(2)}</div>
                        <div className="text-gray-400 text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Actions */}
              <div className="px-6 py-4 bg-gray-700/30 flex justify-between items-center">
                <div className="space-x-4">
                  <button className="text-pink-500 hover:text-pink-400 transition-colors">
                    Track Order
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    Download Invoice
                  </button>
                </div>
                <Link
                  to={`/order/${order.id}`}
                  className="flex items-center gap-2 text-pink-500 hover:text-pink-400 transition-colors"
                >
                  View Details
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}