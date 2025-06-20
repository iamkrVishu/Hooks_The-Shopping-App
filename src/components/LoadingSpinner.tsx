import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-gray-900/75 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative">
        <div className="loading-ring"></div>
        <div className="mt-4 text-center text-purple-400 animate-pulse">Loading...</div>
      </div>
    </div>
  );
}