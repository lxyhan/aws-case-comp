'use client'
import React, { useState, useEffect } from 'react';import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from '@headlessui/react';
import { 
  XMarkIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline';
import { 
  Mic, 
  Brain,
  Film,
  Clock,
  Sparkles,
  History,
  PlayCircle,
  LayoutGrid,
  Wand2,
  Calendar,
  Layers,
  MenuIcon,
  Search
} from 'lucide-react';
import videoLibrary from '../../data/videos';
import VideoCard from '../components/VideoCard';
import LoadingAnimation from '../components/LoadingAnimation';
import useVideoFilters from '../hooks/useVideoFilters';
import SemanticSearchDialog from '../components/SemanticSearchDialog';
import VideoGenerationDialog from '../components/VideoGenerationDialog';
import Link from 'next/link';
import VideoModal from '../components/VideoModal';

export default function VideoPlatform() {
  const [isSearchDialogOpen, setSearchDialogOpen] = useState(false);
  const [isGenerateDialogOpen, setGenerateDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoModalOpen, setVideoModalOpen] = useState(false);
  const [apiVideos, setApiVideos] = useState([]); // Add this state

  useEffect(() => {
      async function fetchVideos() {
          try {
              const response = await fetch('/api/videos');
              const data = await response.json();
              setApiVideos(data.videos);
          } catch (error) {
              console.error('Error fetching videos:', error);
          }
      }
      fetchVideos();
  }, []);

// Change this line
const {
  filteredVideos,
  isLoading,
  activeFilters,
  searchQuery,
  handleFilterChange,
  handleSearch,
} = useVideoFilters(apiVideos); // Changed from videoLibrary.videos to apiVideos
    const handleOpenVideoModal = (video) => {
      setSelectedVideo(video);
      setVideoModalOpen(true);
    };
  
    const handleCloseVideoModal = () => {
      setVideoModalOpen(false);
      setSelectedVideo(null);
    };
  

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Project Info Banner */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <span className="flex items-center text-sm">
                <Brain className="h-4 w-4 mr-1" />
                Amazon Bedrock
              </span>
              <span className="flex items-center text-sm">
                <Sparkles className="h-4 w-4 mr-1" />
                RAG System
              </span>
              <span className="flex items-center text-sm">
                <History className="h-4 w-4 mr-1" />
                Legacy Archives
              </span>
            </div>
            <a href="#" className="text-sm hover:text-white/90">
              View Documentation →
            </a>
          </div>
        </div>

        {/* Main Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              {/* Logo */}
              <div className="flex items-center">
                <MenuIcon className="h-6 w-6 text-gray-600 lg:hidden cursor-pointer" onClick={() => setMobileMenuOpen(true)} />
                <div className="ml-4 text-2xl font-bold text-indigo-600">RCBC</div>
              </div>

              <div className="flex-1 max-w-2xl mx-4 flex items-center space-x-4">
                <div className="relative flex-1 group">
                  {/* Search Container */}
                  <div className="relative">
                    {/* AI Badge */}
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                      <div className="flex items-center bg-indigo-50 rounded-full px-2 py-1">
                        <Brain className="h-3.5 w-3.5 text-indigo-600" />
                        <span className="ml-1 text-xs font-medium text-indigo-700 whitespace-nowrap">RAG Search</span>
                      </div>
                    </div>

                    {/* Search Input */}
                    <input
                      type="text"
                      className="w-full pl-32 pr-20 py-3 rounded-lg border-2 border-gray-200 bg-gray-50/50 
                                focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:bg-white
                                cursor-pointer hover:bg-white transition-colors"
                      placeholder="Ask about our archives..."
                      onClick={() => setSearchDialogOpen(true)}
                      readOnly
                    />

                    {/* Right Icons */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                      <Sparkles className="h-4 w-4 text-indigo-400" />
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>

                    {/* Hover Tooltip */}
                    <div className="absolute -bottom-8 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded shadow-sm border">
                        AI-powered semantic search with Amazon Bedrock
                      </span>
                    </div>
                  </div>
                </div>

                {/* Generate Video Button */}
                <Link
                  href="/generate"
                  className="flex items-center px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 
                            text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 
                            transition-all shadow-sm hover:shadow whitespace-nowrap"
                >
                  <Wand2 className="h-5 w-5 mr-2" />
                  <span className="font-medium">Generate Video</span>
                </Link>
              </div>
              {/* Right Nav Items */}
              <div className="flex items-center space-x-4">
                <button className="hidden lg:flex items-center text-sm text-gray-600 hover:text-gray-900">
                  <Calendar className="h-5 w-5 mr-1" />
                  Timeline
                </button>
                <button className="hidden lg:flex items-center text-sm text-gray-600 hover:text-gray-900">
                  <Layers className="h-5 w-5 mr-1" />
                  Collections
                </button>
                <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                  <BookmarkIcon className="h-5 w-5" />
                  <span className="ml-1 hidden lg:inline">Saved</span>
                </button>
              </div>
            </div>
          </div>
        </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats in a more compact design */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <Film className="h-8 w-8 text-indigo-600" />
              <div className="ml-3">
                <p className="text-xs text-gray-500">Archive Size</p>
                <p className="text-lg text-gray-800 font-semibold">238.3 hrs</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-xs text-gray-500">Time Span</p>
                <p className="text-lg text-gray-800 font-semibold">1960-2024</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-xs text-gray-500">AI Coverage</p>
                <p className="text-lg text-gray-800 font-semibold">100%</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <LayoutGrid className="h-8 w-8 text-pink-600" />
              <div className="ml-3">
                <p className="text-xs text-gray-500">Categories</p>
                <p className="text-lg text-gray-800 font-semibold">12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Collections - Compact Horizontal Scroll */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Featured Collections</h2>
          <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
            {videoLibrary.categories.map((category) => (
              category.featured.map((item) => (
                <div key={item.name} className="flex-none w-72 group">
                  <div className="relative h-40 rounded-lg overflow-hidden">
                    <img
                      src={item.thumbnailSrc}
                      alt={item.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-xs text-gray-300 line-clamp-2 mt-1">{item.description}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlayCircle className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>
              ))
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-6">
            {/* Filters */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-medium text-gray-900 mb-4">Filters</h3>
                <div className="space-y-6">
                  {videoLibrary.filters.map((section) => (
                    <div key={section.name}>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">{section.name}</h4>
                      <div className="space-y-2">
                        {section.options.map((option) => (
                          <label key={option.value} className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              checked={activeFilters[section.id]?.includes(option.value)}
                              onChange={(e) => handleFilterChange(section.id, option.value, e.target.checked)}
                            />
                            <span className="ml-2 text-sm text-gray-600">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Video Grid */}
            <div className="lg:col-span-3">
              <div className="relative min-h-[400px]">
                {isLoading && <LoadingAnimation />}
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredVideos.map((video) => (
                    <div
                      key={video.id}
                      className="transform transition-all duration-300"
                    >
                      <VideoCard 
                        video={video} 
                        onOpenModal={handleOpenVideoModal}
                      />
                    </div>
                  ))}
                </div>

                {filteredVideos.length === 0 && !isLoading && (
                  <div className="text-center py-12">
                    <LayoutGrid className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No videos found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Try adjusting your filters or search terms
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

      {/* Dialogs */}
      <SemanticSearchDialog 
        isOpen={isSearchDialogOpen} 
        onClose={() => setSearchDialogOpen(false)} 
      />
      <VideoGenerationDialog 
        isOpen={isGenerateDialogOpen} 
        onClose={() => setGenerateDialogOpen(false)} 
      />
      <VideoModal
        video={selectedVideo}
        isOpen={isVideoModalOpen}
        onClose={handleCloseVideoModal}
      />
    </div>
  );
}