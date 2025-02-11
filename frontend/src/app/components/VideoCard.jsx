import React from 'react';
import { Play, Clock, Tag, Calendar, Film, Brain, Camera, Award, Eye } from 'lucide-react';

const VideoCard = ({ video, onOpenModal }) => {
  const handleOpenModal = (e) => {
    e.preventDefault();
    onOpenModal(video);
  };

  return (
    <div 
      onClick={handleOpenModal}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200/50 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer backdrop-blur-sm"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden rounded-t-xl">
        {/* Background blur effect for loading */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 animate-pulse" />
        
        {/* Thumbnail Image */}
        <img
          alt={video.title}
          src={video.thumbnailSrc}
          className="relative z-10 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play Button with ripple effect */}
        <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            className="relative bg-white/90 p-4 rounded-full hover:bg-white transition-colors group/button"
            onClick={handleOpenModal}
          >
            <Play className="w-8 h-8 text-indigo-600 transition-transform group-hover/button:scale-110" />
            <div className="absolute inset-0 bg-white/50 rounded-full animate-ping" />
          </button>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 z-30 bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs flex items-center shadow-lg">
          <Clock className="w-3 h-3 mr-1.5 stroke-[2.5]" />
          {video.duration}
        </div>

        {/* Format Badge */}
        {video.metadata?.format && (
          <div className="absolute top-3 right-3 z-30 bg-indigo-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs flex items-center shadow-lg">
            <Film className="w-3 h-3 mr-1.5 stroke-[2.5]" />
            {video.metadata.format}
          </div>
        )}

        {/* AI Badges with hover effects */}
        <div className="absolute top-3 left-3 z-30 flex flex-col gap-2">
          <div className="group/ai flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs shadow-lg hover:scale-105 transition-transform">
            <Brain className="w-3 h-3 stroke-[2.5] group-hover/ai:animate-pulse" />
            AI Enhanced
          </div>
          <div className="group/detect flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1.5 rounded-full text-xs shadow-lg hover:scale-105 transition-transform">
            <Camera className="w-3 h-3 stroke-[2.5] group-hover/detect:animate-pulse" />
            Objects Detected
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="relative flex flex-col p-5 bg-gradient-to-b from-white to-gray-50/50">
        {/* Title with hover effect */}
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 mb-2 group-hover:text-indigo-600 transition-colors">
          <button className="text-left">
            {video.title}
          </button>
        </h3>

        {/* Description with subtle animation */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow group-hover:text-gray-900 transition-colors">
          {video.description}
        </p>

        {/* Tags with hover effects */}
        {video.metadata?.tags && video.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {video.metadata.tags.slice(0, 3).map((tag, index) => (
              <div 
                key={index} 
                className="px-2.5 py-1 rounded-full text-xs border border-indigo-100 text-indigo-600 bg-indigo-50/50 hover:bg-indigo-100 hover:border-indigo-200 transition-colors"
              >
                {tag}
              </div>
            ))}
            {video.metadata.tags.length > 3 && (
              <div className="px-2.5 py-1 rounded-full text-xs border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors">
                +{video.metadata.tags.length - 3} more
              </div>
            )}
          </div>
        )}

        {/* Footer with gradients */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1.5 stroke-[2.5] text-indigo-500" />
              <span className="hover:text-gray-900 transition-colors">
                {new Date(video.metadata?.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center">
              <Tag className="w-3.5 h-3.5 mr-1.5 stroke-[2.5] text-indigo-500" />
              <span className="hover:text-gray-900 transition-colors">{video.type}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;