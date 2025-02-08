import React from 'react';
import { PlayCircle, Clock, Tag } from 'lucide-react';

const VideoCard = ({ video }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="relative">
        <img
          alt={video.title}
          src={video.thumbnailSrc}
          className="aspect-video w-full object-cover group-hover:opacity-75"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <PlayCircle className="w-16 h-16 text-white" />
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {video.duration}
        </div>
      </div>
      
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          <a href={video.href}>
            <span aria-hidden="true" className="absolute inset-0" />
            {video.title}
          </a>
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">{video.description}</p>
        <div className="flex flex-1 flex-col justify-end">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Tag className="w-4 h-4" />
            {video.type}
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
            <span>{new Date(video.metadata.date).toLocaleDateString()}</span>
            <span>•</span>
            <span>{video.metadata.views.toLocaleString()} views</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;