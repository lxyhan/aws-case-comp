'use client'
import React from 'react';
import { Sparkles } from 'lucide-react';

const LoadingAnimation = ({ message = "Processing request..." }) => {
  return (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
      <div className="flex flex-col items-center max-w-sm mx-auto p-6">
        {/* Primary Animation */}
        <div className="relative">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-indigo-100 animate-pulse"></div>
          
          {/* Middle ring */}
          <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-indigo-600 border-r-indigo-600 animate-spin"></div>
          
          {/* Inner content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-indigo-600 animate-bounce" />
          </div>
        </div>

        {/* Loading Message */}
        <div className="mt-4 text-center">
          <div className="text-sm font-medium text-gray-900">{message}</div>
          <div className="mt-1 text-xs text-gray-500 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce"></span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-600 animate-progressBar"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;