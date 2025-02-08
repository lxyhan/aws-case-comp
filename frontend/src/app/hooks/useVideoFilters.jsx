'use client'
import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

export const useVideoFilters = (initialVideos) => {
  // Initialize all state values properly
  const [activeFilters, setActiveFilters] = useState({
    decade: [],
    format: [],
    type: []
  });
  const [filteredVideos, setFilteredVideos] = useState(initialVideos || []);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Initialize as empty string

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query, filters) => {
      if (!initialVideos) return; // Guard against undefined initialVideos

      const searchResults = initialVideos.filter(video => {
        // First apply search query
        const matchesSearch = query === '' || 
          video.title.toLowerCase().includes(query.toLowerCase()) ||
          video.description.toLowerCase().includes(query.toLowerCase()) ||
          video.metadata.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));

        if (!matchesSearch) return false;

        // Then apply filters
        return Object.entries(filters).every(([filterKey, selectedValues]) => {
          if (!selectedValues || selectedValues.length === 0) return true;
          
          switch (filterKey) {
            case 'decade': {
              const videoYear = new Date(video.metadata.date).getFullYear();
              const decade = Math.floor(videoYear / 10) * 10 + 's';
              return selectedValues.includes(decade);
            }
            case 'format':
              return selectedValues.includes(video.metadata.format.toLowerCase());
            case 'type':
              return selectedValues.includes(video.type.toLowerCase());
            default:
              return true;
          }
        });
      });

      setFilteredVideos(searchResults);
      setIsLoading(false);
    }, 500),
    [initialVideos]
  );

  // Handle search and filter changes
  useEffect(() => {
    if (!searchQuery && Object.values(activeFilters).every(arr => arr.length === 0)) {
      setFilteredVideos(initialVideos || []);
      return;
    }

    setIsLoading(true);
    debouncedSearch(searchQuery, activeFilters);
    return () => debouncedSearch.cancel();
  }, [searchQuery, activeFilters, debouncedSearch, initialVideos]);

  const handleFilterChange = useCallback((filterId, value, checked) => {
    setIsLoading(true);
    setActiveFilters(prev => ({
      ...prev,
      [filterId]: checked 
        ? [...(prev[filterId] || []), value]
        : (prev[filterId] || []).filter(v => v !== value)
    }));
  }, []);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query || ''); // Ensure we always have a string
  }, []);

  return {
    filteredVideos,
    isLoading,
    activeFilters,
    searchQuery,
    handleFilterChange,
    handleSearch,
  };
};

export default useVideoFilters