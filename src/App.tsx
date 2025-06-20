import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Deals from './pages/Deals';
import Support from './pages/Support';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <NotificationProvider>
            <div className="min-h-screen bg-gray-900">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/support" element={<Support />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
              <Toaster 
                position="top-right"
                toastOptions={{
                  className: 'bg-gray-800 text-white',
                  style: {
                    background: '#1f2937',
                    color: '#fff',
                    border: '1px solid #374151'
                  },
                }} 
              />
            </div>
          </NotificationProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;