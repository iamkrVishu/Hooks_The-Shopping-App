import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, ChevronDown, Home, Package, Tag, HeadphonesIcon, Laptop, Smartphone, Camera, Gamepad } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import NotificationCenter from './NotificationCenter';
import SearchBar from './SearchBar';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const categories = [
    { icon: <Laptop className="w-5 h-5" />, name: 'Laptops', path: '/category/laptops' },
    { icon: <Smartphone className="w-5 h-5" />, name: 'Phones', path: '/category/phones' },
    { icon: <HeadphonesIcon className="w-5 h-5" />, name: 'Audio', path: '/category/audio' },
    { icon: <Camera className="w-5 h-5" />, name: 'Cameras', path: '/category/cameras' },
    { icon: <Gamepad className="w-5 h-5" />, name: 'Gaming', path: '/category/gaming' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
              Hooks
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="nav-link">
              <Home className="w-5 h-5" />
            </Link>
            
            <div className="relative group">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="nav-link flex items-center space-x-1"
              >
                <Package className="w-5 h-5" />
                <span>Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoryOpen && (
                <div className="absolute top-full left-0 w-56 mt-2 bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden">
                  {categories.map((category) => (
                    <Link
                      key={category.path}
                      to={category.path}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-700/50 transition-colors"
                    >
                      {category.icon}
                      <span className="text-gray-300">{category.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/deals" className="nav-link flex items-center space-x-1">
              <Tag className="w-5 h-5" />
              <span>Deals</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-xl px-8">
            <SearchBar />
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            <NotificationCenter />
            
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-300 hover:text-white transition-colors" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <User className="h-6 w-6" />
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                  <div className="profile-menu">
                    <Link to="/profile" className="profile-menu-item">Profile</Link>
                    <Link to="/orders" className="profile-menu-item">Orders</Link>
                    <Link to="/settings" className="profile-menu-item">Settings</Link>
                    <button onClick={handleSignOut} className="profile-menu-item text-red-400 hover:text-red-300">
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-primary"
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu lg:hidden ${isMenuOpen ? 'active' : ''}`}>
          <div className="flex flex-col space-y-4 p-4">
            <div className="mb-4">
              <SearchBar />
            </div>
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.icon}
                <span className="text-gray-300">{category.name}</span>
              </Link>
            ))}
            <Link
              to="/deals"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Tag className="w-5 h-5" />
              <span className="text-gray-300">Deals</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}