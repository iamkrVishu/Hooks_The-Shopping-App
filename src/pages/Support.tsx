import React from 'react';
import { MessageCircle, Phone, Mail, FileQuestion, BookOpen, Video, HelpCircle } from 'lucide-react';

export default function Support() {
  const supportOptions = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Live Chat',
      description: 'Chat with our support team',
      action: 'Start Chat',
      available: true
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone Support',
      description: '24/7 phone assistance',
      action: 'Call Now',
      available: true
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Support',
      description: 'Get help via email',
      action: 'Send Email',
      available: true
    },
    {
      icon: <FileQuestion className="w-6 h-6" />,
      title: 'FAQs',
      description: 'Find quick answers',
      action: 'View FAQs',
      available: true
    }
  ];

  const helpfulResources = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'User Guides',
      description: 'Detailed product guides and manuals'
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: 'Video Tutorials',
      description: 'Step-by-step video instructions'
    },
    {
      icon: <HelpCircle className="w-6 h-6" />,
      title: 'Troubleshooting',
      description: 'Common issues and solutions'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">How Can We Help?</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose from our available support options below or browse our helpful resources
          </p>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {supportOptions.map((option, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700/50 transition-colors group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-pink-500">{option.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{option.title}</h3>
                <p className="text-gray-400 mb-4">{option.description}</p>
                <button
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    option.available
                      ? 'bg-pink-600 text-white hover:bg-pink-700'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {option.action}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Helpful Resources */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Helpful Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {helpfulResources.map((resource, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="text-pink-500 group-hover:scale-110 transition-transform">
                    {resource.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{resource.title}</h3>
                    <p className="text-gray-400">{resource.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}