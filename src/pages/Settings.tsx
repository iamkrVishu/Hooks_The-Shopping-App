import React, { useState } from 'react';
import { Bell, Lock, CreditCard, Globe, Moon, Smartphone, Mail, Shield, Eye, EyeOff, ChevronRight, ToggleLeft as Toggle, Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface Setting {
  id: string;
  label: string;
  description: string;
  type: 'toggle' | 'select' | 'button';
  value?: boolean | string;
  options?: string[];
  icon: JSX.Element;
  section: 'notifications' | 'privacy' | 'payment' | 'preferences';
}

export default function Settings() {
  const [settings, setSettings] = useState<Setting[]>([
    {
      id: 'push-notifications',
      label: 'Push Notifications',
      description: 'Receive notifications about orders, deals, and updates',
      type: 'toggle',
      value: true,
      icon: <Bell className="w-5 h-5" />,
      section: 'notifications'
    },
    {
      id: 'email-notifications',
      label: 'Email Notifications',
      description: 'Get important updates via email',
      type: 'toggle',
      value: true,
      icon: <Mail className="w-5 h-5" />,
      section: 'notifications'
    },
    {
      id: 'mobile-notifications',
      label: 'Mobile Notifications',
      description: 'Receive SMS alerts for order status',
      type: 'toggle',
      value: false,
      icon: <Smartphone className="w-5 h-5" />,
      section: 'notifications'
    },
    {
      id: 'two-factor',
      label: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      type: 'toggle',
      value: false,
      icon: <Shield className="w-5 h-5" />,
      section: 'privacy'
    },
    {
      id: 'privacy-mode',
      label: 'Privacy Mode',
      description: 'Hide sensitive information in the app',
      type: 'toggle',
      value: true,
      icon: <Eye className="w-5 h-5" />,
      section: 'privacy'
    },
    {
      id: 'payment-methods',
      label: 'Payment Methods',
      description: 'Manage your saved payment methods',
      type: 'button',
      icon: <CreditCard className="w-5 h-5" />,
      section: 'payment'
    },
    {
      id: 'language',
      label: 'Language',
      description: 'Choose your preferred language',
      type: 'select',
      value: 'English',
      options: ['English', 'Spanish', 'French', 'German'],
      icon: <Globe className="w-5 h-5" />,
      section: 'preferences'
    },
    {
      id: 'dark-mode',
      label: 'Dark Mode',
      description: 'Toggle dark mode appearance',
      type: 'toggle',
      value: true,
      icon: <Moon className="w-5 h-5" />,
      section: 'preferences'
    }
  ]);

  const sections = {
    notifications: {
      title: 'Notifications',
      description: 'Manage how you receive notifications'
    },
    privacy: {
      title: 'Privacy & Security',
      description: 'Control your privacy settings and security preferences'
    },
    payment: {
      title: 'Payment Settings',
      description: 'Manage your payment methods and preferences'
    },
    preferences: {
      title: 'Preferences',
      description: 'Customize your app experience'
    }
  };

  const handleToggle = (id: string) => {
    setSettings(prev =>
      prev.map(setting =>
        setting.id === id
          ? { ...setting, value: setting.type === 'toggle' ? !setting.value : setting.value }
          : setting
      )
    );
    toast.success('Setting updated successfully');
  };

  const handleSelect = (id: string, value: string) => {
    setSettings(prev =>
      prev.map(setting =>
        setting.id === id ? { ...setting, value } : setting
      )
    );
    toast.success(`Language changed to ${value}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

        {Object.entries(sections).map(([sectionKey, section]) => (
          <div key={sectionKey} className="mb-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <p className="text-gray-400">{section.description}</p>
            </div>

            <div className="bg-gray-800 rounded-xl overflow-hidden">
              {settings
                .filter(setting => setting.section === sectionKey)
                .map((setting, index, array) => (
                  <div
                    key={setting.id}
                    className={`p-6 flex items-center justify-between hover:bg-gray-700/50 transition-colors ${
                      index !== array.length - 1 ? 'border-b border-gray-700' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-pink-500">{setting.icon}</div>
                      <div>
                        <h3 className="text-white font-medium">{setting.label}</h3>
                        <p className="text-gray-400 text-sm">{setting.description}</p>
                      </div>
                    </div>

                    {setting.type === 'toggle' && (
                      <button
                        onClick={() => handleToggle(setting.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          setting.value ? 'bg-pink-600' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            setting.value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    )}

                    {setting.type === 'select' && (
                      <div className="relative">
                        <select
                          value={setting.value as string}
                          onChange={(e) => handleSelect(setting.id, e.target.value)}
                          className="appearance-none bg-gray-700 text-white px-4 py-2 pr-8 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
                        >
                          {setting.options?.map(option => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transform rotate-90" />
                      </div>
                    )}

                    {setting.type === 'button' && (
                      <button
                        onClick={() => toast.success('Opening payment methods...')}
                        className="text-pink-500 hover:text-pink-400 transition-colors flex items-center gap-2"
                      >
                        Manage
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}