import React, { useState, useRef, useEffect } from 'react';
import { Bell, X, Check, Trash2, Package, Settings, Tag, Shield } from 'lucide-react';
import { useNotifications, Notification } from '../contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

export default function NotificationCenter() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
  } = useNotifications();
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const getTimeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="h-5 w-5" />;
      case 'system':
        return <Settings className="h-5 w-5" />;
      case 'promotion':
        return <Tag className="h-5 w-5" />;
      case 'security':
        return <Shield className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'bg-blue-500';
      case 'system':
        return 'bg-purple-500';
      case 'promotion':
        return 'bg-pink-500';
      case 'security':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.link) {
      navigate(notification.link);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-300 hover:text-white transition-colors rounded-full hover:bg-gray-800"
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-pink-500 text-white text-xs items-center justify-center">
              {unreadCount}
            </span>
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden transform origin-top-right transition-all duration-200 ease-out">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Notifications</h3>
            <div className="flex items-center gap-2">
              {notifications.some(n => !n.read) && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Mark all as read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Clear all notifications"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 border-b border-gray-700 hover:bg-gray-700/50 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-gray-700/20' : ''
                  }`}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)} bg-opacity-10`}>
                      <div className={`${getNotificationColor(notification.type)} bg-opacity-20 text-white`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-white">{notification.title}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">
                            {getTimeAgo(notification.created_at)}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="text-gray-400 hover:text-white transition-colors"
                            aria-label="Delete notification"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                      {!notification.read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification.id);
                          }}
                          className="mt-2 text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
                        >
                          <Check className="h-3 w-3" />
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}