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
import VideoIngestionCard from '../components/VideoIngestionCard';

export default function VideoPlatform() {
  const [isSearchDialogOpen, setSearchDialogOpen] = useState(false);
  const [isGenerateDialogOpen, setGenerateDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoModalOpen, setVideoModalOpen] = useState(false);
  const [apiVideos, setApiVideos] = useState([]);
  const [isIngesting, setIsIngesting] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [newVideo, setNewVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [searchResults, setSearchResults] = useState(null);

  const MOCK_SEARCH_RESPONSES = {
    'arctic': {
      relevance: 0.95,
      matches: [
        'Arctic_Ice.mp4',
        'Polar_Bears.mp4'
      ],
      suggestedTags: ['climate change', 'wildlife', 'environmental']
    },
    'factory': {
      relevance: 0.88,
      matches: [
        'Factory.mp4'
      ],
      suggestedTags: ['industrial', 'manufacturing', 'technology']
    },
    'river': {
      relevance: 0.92,
      matches: [
        'River.mp4'
      ],
      suggestedTags: ['nature', 'indigenous', 'cultural']
    }
  };

  useEffect(() => {
    async function fetchVideos() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/videos');
        const data = await response.json();
        
        setApiVideos(data.videos);
        
        if (data.processingVideo) {
          setNewVideo(data.processingVideo);
          setIsIngesting(true);
          
          setTimeout(() => {
            setIsIngesting(false);
            // Check if video already exists before adding
            setApiVideos(prev => {
              const exists = prev.some(v => v.id === data.processingVideo.id);
              return exists ? prev : [data.processingVideo, ...prev];
            });
          }, 8000);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setTimeout(() => setIsLoading(false), 1000);
      }
    }
    fetchVideos();
  }, []);

const handleSemanticSearch = async (query) => {
  setSearchLoading(true);
  setSearchTerm(query);

  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Find matching mock response based on keywords
    const matchingKeyword = Object.keys(MOCK_SEARCH_RESPONSES).find(
      keyword => query.toLowerCase().includes(keyword.toLowerCase())
    );

    if (matchingKeyword) {
      const mockResponse = MOCK_SEARCH_RESPONSES[matchingKeyword];
      
      // Filter videos based on mock response
      const results = apiVideos.filter(video => 
        mockResponse.matches.includes(video.id)
      );

      setSearchResults({
        videos: results,
        metadata: {
          relevance: mockResponse.relevance,
          suggestedTags: mockResponse.suggestedTags,
          totalResults: results.length,
          searchTime: '0.67 seconds'
        }
      });
    } else {
      // Default "no exact match" response
      setSearchResults({
        videos: [],
        metadata: {
          relevance: 0,
          suggestedTags: [],
          totalResults: 0,
          searchTime: '0.54 seconds'
        }
      });
    }
  } finally {
    setSearchLoading(false);
  }
};


const videosToDisplay = searchResults || apiVideos;

const handleFilterChange = (filterId, value, isChecked) => {
  setActiveFilters(prev => ({
    ...prev,
    [filterId]: isChecked
      ? [...(prev[filterId] || []), value]
      : (prev[filterId] || []).filter(v => v !== value)
  }));
};

// Filter videos based on search and filters
const filteredVideos = apiVideos.filter(video => {
  // Search term filter
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      video.title.toLowerCase().includes(searchLower) ||
      video.description.toLowerCase().includes(searchLower) ||
      video.type.toLowerCase().includes(searchLower) ||
      video.metadata?.tags?.some(tag => tag.toLowerCase().includes(searchLower));
    
    if (!matchesSearch) return false;
  }

  // Active filters
  for (const [filterId, values] of Object.entries(activeFilters)) {
    if (values.length === 0) continue;

    switch (filterId) {
      case 'type':
        if (!values.includes(video.type)) return false;
        break;
      case 'year':
        const videoYear = new Date(video.metadata.date).getFullYear();
        if (!values.includes(videoYear.toString())) return false;
        break;
      case 'tags':
        if (!values.some(tag => video.metadata.tags.includes(tag))) return false;
        break;
      // Add more filter cases as needed
    }
  }

  return true;
});

const SearchResults = ({ results }) => {
  if (!results) return null;

  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm text-gray-500">
            Found {results.metadata.totalResults} results 
            ({results.metadata.searchTime})
          </span>
          {results.metadata.relevance > 0 && (
            <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
              {(results.metadata.relevance * 100).toFixed(0)}% relevant
            </span>
          )}
        </div>
        {results.metadata.suggestedTags.length > 0 && (
          <div className="flex gap-2">
            {results.metadata.suggestedTags.map(tag => (
              <span key={tag} className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


// Modal handlers
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
                  <div className="relative flex items-center">
                    <div className="absolute left-3 z-10">
                      <div className="flex items-center bg-indigo-50 rounded-full px-2 py-1">
                        <Brain className="h-3.5 w-3.5 text-indigo-600" />
                        <span className="ml-1 text-xs font-medium text-indigo-700">RAG Search</span>
                      </div>
                    </div>
                    
                      {/* Update search input to show active search */}
                      <input
                        type="text"
                        className="w-full pl-28 pr-12 py-2.5 rounded-lg border-2 border-gray-200 
                                  bg-gray-50/50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 
                                  focus:bg-white transition-colors"
                        placeholder="Search video archives..."
                        value={searchTerm}
                        onClick={() => setSearchDialogOpen(true)}
                        readOnly
                      />
                    <div className="absolute right-3 flex items-center space-x-2">
                      <Sparkles className="h-4 w-4 text-indigo-400" />
                      <Search className="h-5 w-5 text-gray-400" />
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
                  {searchLoading && <LoadingAnimation message="Processing semantic search..." />}
                  
                  {searchResults && <SearchResults results={searchResults} />}
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Ingestion Card - Add this back */}
                    {isIngesting && (
                      <div className="transform transition-all duration-300">
                        <VideoIngestionCard 
                          videoName={newVideo?.title || "New Video"}
                          onComplete={() => {
                            setIsIngesting(false);
                          }}
                        />
                      </div>
                    )}
                    
                    {/* Videos Display - Fix the conditional rendering */}
                    {(searchResults?.videos || filteredVideos).map((video) => (
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
                  
                  {/* No Results Message - Update condition */}
                  {((searchResults?.videos.length === 0) || 
                    (!searchResults && filteredVideos.length === 0)) && 
                    !isIngesting && (
                    <div className="text-center py-12">
                      <LayoutGrid className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        No matches found
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Try different search terms or browse all videos
                      </p>
                    </div>
                  )}
                </div>
              </div>
          </div>
        </main>

      {/* Update SemanticSearchDialog */}
      <SemanticSearchDialog 
        isOpen={isSearchDialogOpen}
        onClose={() => {
          setSearchDialogOpen(false);
          if (!searchTerm) {
            setSearchResults(null);
          }
        }}
        onSearch={handleSemanticSearch}
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