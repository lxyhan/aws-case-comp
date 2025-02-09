import React from 'react';
import { Calendar, Clock, Tag, Film, Eye, Brain, X } from 'lucide-react';

const VideoModal = ({ video, isOpen, onClose }) => {
  if (!video || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Content */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900">{video.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* Video Preview */}
              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={video.thumbnailSrc}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{video.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Eye className="w-4 h-4" />
                    <span>{video.viewCount?.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Film className="w-4 h-4" />
                    <span>{video.metadata?.format}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(video.metadata?.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Video Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Description</h3>
                  <p className="mt-2 text-sm text-gray-600">{video.description}</p>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {video.metadata?.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Analysis */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 flex items-center">
                    <Brain className="w-4 h-4 mr-2 text-purple-600" />
                    AI Analysis
                  </h3>
                  <div className="mt-2 space-y-2">
                    {video.aiAnalysis?.map((insight, idx) => (
                      <div
                        key={idx}
                        className="text-sm text-gray-600 bg-purple-50 rounded-lg p-3"
                      >
                        {insight}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal