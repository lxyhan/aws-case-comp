import React from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Brain, Camera, Clock, Calendar, Film } from 'lucide-react';

const VideoModal = ({ video, isOpen, onClose }) => {
  if (!video) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
      
      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-5xl w-full bg-white rounded-xl shadow-2xl">
          {/* Video Section */}
          <div className="relative">
            <div className="aspect-video w-full bg-black">
              <video 
                className="w-full h-full"
                controls
                autoPlay
                src={video.url}
              >
                Your browser does not support the video tag.
              </video>

              {/* AI Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="flex items-center gap-1.5 bg-indigo-600/90 text-white px-3 py-1.5 rounded-full text-xs">
                  <Brain className="w-3.5 h-3.5" />
                  AI Enhanced
                </div>
                <div className="flex items-center gap-1.5 bg-blue-600/90 text-white px-3 py-1.5 rounded-full text-xs">
                  <Camera className="w-3.5 h-3.5" />
                  Objects Detected
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            {/* Title and Info */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {video.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {video.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(video.metadata?.date).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Film className="w-4 h-4" />
                  {video.metadata?.format}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4">
              {video.description}
            </p>
            
            {/* Tags */}
            {video.metadata?.tags && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {video.metadata.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Video Details */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">Type</p>
                  <p className="text-sm text-gray-500">{video.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Format</p>
                  <p className="text-sm text-gray-500">{video.metadata?.format}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Upload Date</p>
                  <p className="text-sm text-gray-500">
                    {new Date(video.metadata?.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Duration</p>
                  <p className="text-sm text-gray-500">{video.duration}</p>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default VideoModal;