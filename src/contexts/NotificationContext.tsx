import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'system' | 'promotion' | 'security';
  priority: 'low' | 'medium' | 'high';
  read: boolean;
  link?: string;
  created_at: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'created_at'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load notifications from local storage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    } else {
      // Add some sample notifications if none exist
      const sampleNotifications: Notification[] = [
        {
          id: '1',
          title: 'Welcome to Hooks!',
          message: 'Thanks for joining our tech community. Start exploring our products.',
          type: 'system',
          priority: 'medium',
          read: false,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Special Offer',
          message: 'Get 20% off on all audio products this week!',
          type: 'promotion',
          priority: 'high',
          read: false,
          link: '/deals',
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      setNotifications(sampleNotifications);
      localStorage.setItem('notifications', JSON.stringify(sampleNotifications));
    }
  }, []);

  // Update local storage when notifications change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  // Try to subscribe to real-time notifications from Supabase
  useEffect(() => {
    try {
      const channel = supabase
        .channel('notifications')
        .on('broadcast', { event: 'notification' }, ({ payload }) => {
          addNotification(payload);
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch (error) {
      console.warn('Error subscribing to notifications channel:', error);
      // Continue without real-time updates
    }
  }, []);

  const addNotification = (notification: Omit<Notification, 'id' | 'created_at'>) => {
    const newNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    };

    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast for new notifications
    toast(notification.message, {
      icon: getNotificationIcon(notification.type),
      duration: 4000,
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAllNotifications,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

function getNotificationIcon(type: string) {
  switch (type) {
    case 'order':
      return '📦';
    case 'system':
      return '🔧';
    case 'promotion':
      return '🎉';
    case 'security':
      return '🔒';
    default:
      return '📢';
  }
}