// VideoCard.jsx
import React from 'react';
import { Play, Clock, Tag, Calendar, Film } from 'lucide-react';

const VideoCard = ({ video, onOpenModal }) => {
  const handleOpenModal = (e) => {
    e.preventDefault();
    onOpenModal(video);
  };

  return (
    <div 
      onClick={handleOpenModal}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
    >
      <div className="relative aspect-video">
        <img
          alt={video.title}
          src={video.thumbnailSrc}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
          <button 
            className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors"
            onClick={handleOpenModal}
          >
            <Play className="w-8 h-8 text-indigo-600" />
          </button>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          {video.duration}
        </div>
        {video.metadata?.format && (
          <div className="absolute top-2 left-2 bg-indigo-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs flex items-center">
            <Film className="w-3 h-3 mr-1" />
            {video.metadata.format}
          </div>
        )}
      </div>
      
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-1 mb-1">
          <button 
            onClick={handleOpenModal}
            className="hover:text-indigo-600 transition-colors text-left"
          >
            {video.title}
          </button>
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
          {video.description}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(video.metadata?.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </div>
          <div className="flex items-center">
            <Tag className="w-3 h-3 mr-1" />
            {video.type}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;