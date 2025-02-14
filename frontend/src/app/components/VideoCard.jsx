import React from 'react';
import { 
  Play, 
  Clock, 
  Calendar, 
  Film, 
  Brain, 
  Camera, 
  Gauge,
  Languages,
  ScrollText
} from 'lucide-react';

const VideoCard = ({ video, onOpenModal }) => {
  const handleOpenModal = (e) => {
    e.preventDefault();
    onOpenModal(video);
  };

  // Calculate stats
  const confidenceScore = (video.metadata?.aiAnalysis?.averageConfidence * 100).toFixed(0);
  const detectedObjects = video.metadata?.aiAnalysis?.detectedObjects?.length || 0;
  const translationCount = Object.keys(video.metadata?.translations || {}).length;

  return (
    <div 
      onClick={handleOpenModal}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/20 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer backdrop-blur-sm"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden">
        {/* Loading background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 animate-pulse" />
        
        {/* Thumbnail Image */}
        <img
          alt={video.title}
          src={video.thumbnailSrc}
          className="relative z-10 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Overlay Gradient - More sophisticated with multiple layers */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-indigo-900/90 via-indigo-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play Button with enhanced animation */}
        <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            className="relative bg-white/90 p-4 rounded-full hover:bg-white transition-colors group/button"
            onClick={handleOpenModal}
          >
            <Play className="w-8 h-8 text-indigo-600 transition-transform group-hover/button:scale-110" />
            <div className="absolute inset-0 bg-white/50 rounded-full animate-ping" />
          </button>
        </div>

        {/* Enhanced Metadata Badges */}
        <div className="absolute top-3 right-3 z-30 flex flex-col gap-2 items-end">
          {/* Format Badge */}
          {video.metadata?.format && (
            <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs flex items-center shadow-lg group-hover:bg-black/90 transition-colors">
              <Film className="w-3 h-3 mr-1.5 stroke-[2.5]" />
              {video.metadata.format}
            </div>
          )}
          {/* Duration Badge */}
          <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs flex items-center shadow-lg group-hover:bg-black/90 transition-colors">
            <Clock className="w-3 h-3 mr-1.5 stroke-[2.5]" />
            {video.duration}
          </div>
        </div>

        {/* AI Feature Badges */}
        <div className="absolute top-3 left-3 z-30 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs shadow-lg hover:scale-105 transition-transform">
            <Brain className="w-3 h-3 stroke-[2.5]" />
            AI Enhanced
          </div>
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1.5 rounded-full text-xs shadow-lg hover:scale-105 transition-transform">
            <Camera className="w-3 h-3 stroke-[2.5]" />
            {detectedObjects} Objects
          </div>
        </div>

        {/* Preservation Notice - Only show if exists */}
        {video.metadata?.aiAnalysis?.preservation && (
          <div className="absolute bottom-3 left-3 right-3 z-30">
            <div className="bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ScrollText className="w-3 h-3 stroke-[2.5]" />
              <span className="line-clamp-1">{video.metadata.aiAnalysis.preservation}</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Content Section with enhanced styling */}
      <div className="relative flex flex-col p-5">
        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 line-clamp-1 mb-2 group-hover:text-indigo-600 transition-colors">
          {video.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 group-hover:text-gray-900 transition-colors">
          {video.description}
        </p>

        {/* AI Analysis Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/60 rounded-lg p-2 border border-indigo-100">
            <div className="flex items-center gap-1 mb-1">
              <Camera className="w-3 h-3 text-blue-600" />
              <span className="text-xs font-medium text-gray-700">Objects</span>
            </div>
            <div className="text-sm font-bold text-blue-600">{detectedObjects}</div>
          </div>
          <div className="bg-white/60 rounded-lg p-2 border border-indigo-100">
            <div className="flex items-center gap-1 mb-1">
              <Languages className="w-3 h-3 text-purple-600" />
              <span className="text-xs font-medium text-gray-700">Languages</span>
            </div>
            <div className="text-sm font-bold text-purple-600">{translationCount}</div>
          </div>
        </div>

        {/* Tags with enhanced styling */}
        {video.metadata?.tags && video.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {video.metadata.tags.slice(0, 3).map((tag, index) => (
              <div 
                key={index} 
                className="px-2.5 py-1 rounded-full text-xs border border-indigo-100 text-indigo-600 bg-white hover:bg-indigo-50 transition-colors"
              >
                {tag}
              </div>
            ))}
            {video.metadata.tags.length > 3 && (
              <div className="px-2.5 py-1 rounded-full text-xs border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                +{video.metadata.tags.length - 3}
              </div>
            )}
          </div>
        )}

        {/* Footer with metadata */}
        <div className="pt-3 border-t border-indigo-100 flex items-center justify-between text-xs text-gray-500">
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
              <Film className="w-3.5 h-3.5 mr-1.5 stroke-[2.5] text-indigo-500" />
              <span className="hover:text-gray-900 transition-colors">{video.type}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;