'use client'
import React, { useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react';
import { 
  MagnifyingGlassIcon, 
  XMarkIcon,
  BookmarkIcon,
  ChevronDownIcon,
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

export default function VideoPlatform() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [isAiAssistantActive, setAiAssistantActive] = useState(false);

    // Use the video filters hook
    const {
      filteredVideos,
      isLoading,
      activeFilters,
      searchQuery,
      handleFilterChange,
      handleSearch,
    } = useVideoFilters(videoLibrary.videos);

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

              {/* Enhanced Search Bar - Always Visible */}
              <div className="flex-1 max-w-2xl mx-4">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full pl-10 pr-12 py-2 rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Search 50+ years of broadcast history..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <div className="absolute right-2 top-1.5 flex items-center space-x-1">
                    <button
                      type="button"
                      onClick={() => setAiAssistantActive(true)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                      title="AI Assistant"
                    >
                      <Wand2 className="h-5 w-5 text-indigo-600" />
                    </button>
                  </div>
                </div>
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
                      <VideoCard video={video} />
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

      {/* AI Assistant Dialog */}
      <Dialog 
        open={isAiAssistantActive} 
        onClose={() => setAiAssistantActive(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="mx-auto max-w-xl w-full rounded-xl bg-white p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="bg-indigo-100 rounded-lg p-2">
                    <Brain className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">AI Archive Assistant</h3>
                    <p className="text-sm text-gray-500">Powered by Amazon Bedrock</p>
                  </div>
                </div>
                <button
                  onClick={() => setAiAssistantActive(false)}
                  className="rounded-full p-2 hover:bg-gray-100"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                <input
                    type="text"
                    className="w-full pl-10 pr-12 py-2 rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Search 50+ years of broadcast history..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    />
                  <div className="absolute right-2 top-2 flex space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded-full">
                      <Mic className="h-5 w-5 text-indigo-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded-full">
                      <Search className="h-5 w-5 text-indigo-600" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Try asking:</p>
                  <div className="space-y-2">
                    {[
                      "Find space exploration coverage from the 1960s",
                      "Show me educational content about computers",
                      "Historical footage of significant political events"
                    ].map((suggestion, i) => (
                      <button
                        key={i}
                        className="block w-full text-left text-sm text-gray-700 hover:bg-gray-100 p-2 rounded"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}