import React from 'react';
import { Database, FileSearch, Brain } from 'lucide-react';

const LoadingAnimation = ({ message = "Processing with RAG..." }) => {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center p-6 max-w-sm mx-auto">
        {/* RAG Process Animation */}
        <div className="flex items-center space-x-4 mb-4">
          <Database className="w-6 h-6 text-blue-600 animate-pulse" />
          <div className="h-px w-8 bg-gradient-to-r from-blue-600 to-purple-600 animate-expandWidth" />
          <FileSearch className="w-6 h-6 text-purple-600 animate-pulse" />
          <div className="h-px w-8 bg-gradient-to-r from-purple-600 to-green-600 animate-expandWidth" />
          <Brain className="w-6 h-6 text-green-600 animate-pulse" />
        </div>
        
        {/* Message */}
        <p className="text-sm font-medium text-gray-900 text-center">{message}</p>
        
        {/* Simple Progress Dots */}
        <div className="flex space-x-2 mt-3">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
          <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce [animation-delay:0.2s]" />
          <div className="w-2 h-2 rounded-full bg-green-600 animate-bounce [animation-delay:0.4s]" />
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;