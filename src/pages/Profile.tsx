import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Camera,
  Settings,
  ShoppingBag,
  CreditCard,
  Heart,
  Bell,
  LogOut,
  Edit2,
  MapPin,
  Phone,
  Mail,
  User as UserIcon,
  ChevronRight,
  Calendar,
  Shield,
  Star,
  Check,
  Award,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    joinDate: 'January 2024',
  });

  const stats = [
    { label: 'Orders', value: '12', icon: <ShoppingBag className="w-4 h-4" /> },
    { label: 'Wishlist', value: '24', icon: <Heart className="w-4 h-4" /> },
    { label: 'Reviews', value: '8', icon: <Star className="w-4 h-4" /> },
    { label: 'Points', value: '2,456', icon: <Award className="w-4 h-4" /> },
  ];

  const menuItems = [
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      label: 'Orders',
      path: '/orders',
      count: 3,
    },
    {
      icon: <Heart className="w-5 h-5" />,
      label: 'Wishlist',
      path: '/wishlist',
      count: 12,
    },
    {
      icon: <Bell className="w-5 h-5" />,
      label: 'Notifications',
      path: '/notifications',
      count: 5,
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: 'Payment Methods',
      path: '/payments',
    },
    {
      icon: <Shield className="w-5 h-5" />,
      label: 'Security',
      path: '/security',
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: 'Settings',
      path: '/settings',
    },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full animate-pulse"
                    style={{ animationDuration: '3s' }}
                  />
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80"
                    alt="Profile"
                    className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 bg-pink-500 p-2 rounded-full text-white hover:bg-pink-600 transition-colors transform hover:scale-110 duration-200">
                    <Camera size={16} />
                  </button>
                </div>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-1">
                  {profileData.name}
                </h2>
                <p className="text-gray-400 flex items-center justify-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {profileData.location}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer group"
                  >
                    <div className="text-xl font-bold text-white group-hover:text-pink-500 transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 flex items-center justify-center gap-1">
                      {stat.icon}
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="flex items-center justify-between p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      {item.count && (
                        <span className="bg-pink-500/10 text-pink-500 px-2 py-1 rounded-full text-xs">
                          {item.count}
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                    </div>
                  </Link>
                ))}
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-between p-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-red-400 transition-colors" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Profile Information */}
            <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">
                  Profile Information
                </h3>
                <button
                  onClick={() =>
                    isEditing ? handleSaveProfile() : setIsEditing(true)
                  }
                  className="flex items-center space-x-2 text-pink-500 hover:text-pink-400 transition-colors"
                >
                  {isEditing ? (
                    <>
                      <Check size={16} />
                      <span>Save</span>
                    </>
                  ) : (
                    <>
                      <Edit2 size={16} />
                      <span>Edit</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <UserIcon
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        size={18}
                      />
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            name: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 disabled:opacity-50 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        size={18}
                      />
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 disabled:opacity-50 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Phone
                    </label>
                    <div className="relative">
                      <Phone
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        size={18}
                      />
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            phone: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 disabled:opacity-50 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        size={18}
                      />
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            location: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 disabled:opacity-50 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Member since {profileData.joinDate}
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Verified Account
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Recent Orders</h3>
                <Link
                  to="/orders"
                  className="text-pink-500 hover:text-pink-400 transition-colors flex items-center gap-2"
                >
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((order) => (
                  <div
                    key={order}
                    className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-600 rounded-lg overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac"
                          alt="Product"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-medium group-hover:text-pink-500 transition-colors">
                          Order #{order}23456
                        </h4>
                        <p className="text-gray-400 text-sm">
                          2 items • $299.99
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-500 text-sm font-medium">
                        Delivered
                      </div>
                      <div className="text-gray-400 text-sm">Oct 24, 2023</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}