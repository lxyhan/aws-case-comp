import React, { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Brain, Search, Sparkles, Database, CheckCircle, Code, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SemanticSearchDialog = ({ isOpen, onClose, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchStage, setSearchStage] = useState(0);
  
  const searchStages = [
    { 
      icon: Brain, 
      text: "Processing natural language query...", 
      color: "text-blue-500",
      detail: "Analyzing semantic context and intent"
    },
    { 
      icon: Database, 
      text: "Searching historical archives...", 
      color: "text-purple-500",
      detail: "Scanning through decades of footage"
    },
    { 
      icon: Code, 
      text: "Computing relevance scores...", 
      color: "text-indigo-500",
      detail: "Matching content with semantic vectors"
    },
    { 
      icon: Wand2, 
      text: "Curating results...", 
      color: "text-green-500",
      detail: "Organizing findings by relevance"
    }
  ];
  
  // Enhanced search animation sequence
  const handleSearch = async (query) => {
    setSearchQuery(query);
    setIsSearching(true);
    
    // Longer, more detailed search process
    for (let i = 0; i < searchStages.length; i++) {
      setSearchStage(i);
      // Vary the timing for each stage
      await new Promise(resolve => setTimeout(resolve, 1000 + (i * 500)));
    }
  
    // Final processing before showing results
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSearch(query);
    
    // Smooth transition out
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSearching(false);
    setSearchStage(0);
    onClose();
  };

  // Reset stages when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setSearchStage(0);
      setIsSearching(false);
    }
  }, [isOpen]);

  const suggestions = [
    {
      text: "Show me footage from the 1970s space program",
      icon: "🚀",
      tags: ["space", "historical"]
    },
    {
      text: "Find early computer technology demonstrations",
      icon: "💾",
      tags: ["technology", "vintage"]
    },
    {
      text: "Documentary clips about environmental change",
      icon: "🌍",
      tags: ["nature", "science"]
    }
  ];

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      className="relative z-50"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      </motion.div>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel 
            as={motion.div}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="mx-auto max-w-xl w-full rounded-xl bg-white p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-indigo-100 rounded-lg p-2"
                >
                  <Sparkles className="h-6 w-6 text-indigo-600" />
                </motion.div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Semantic Search</h3>
                  <p className="text-sm text-gray-500">AI-powered archive exploration</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <XMarkIcon className="h-5 w-5" />
              </motion.button>
            </div>
            
            <div className="space-y-6">
              {/* Search Input */}
              <div className="relative">
                <motion.div
                  animate={isSearching ? {
                    boxShadow: ["0 0 0 0px rgba(99, 102, 241, 0.2)", "0 0 0 4px rgba(99, 102, 241, 0.2)"]
                  } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="relative"
                >
                  <input
                    type="text"
                    className="w-full pl-10 pr-12 py-3 rounded-lg text-gray-700 border-2 border-gray-200 
                              focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="What would you like to find?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                  />
                  <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </motion.div>

                {/* Search Stages Animation */}
                {isSearching && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-0 right-0 mt-4 mx-auto max-w-md bg-white rounded-xl shadow-2xl p-6 border border-gray-100 z-50"
                  >
                    <div className="space-y-3">
                      {searchStages.map((stage, index) => {
                        const Icon = stage.icon;
                        const isActive = index === searchStage;
                        const isPast = index < searchStage;

                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ 
                              opacity: isActive || isPast ? 1 : 0.4,
                              y: 0
                            }}
                            className={`relative ${isActive ? 'bg-gray-50 rounded-lg p-3' : 'p-2'}`}
                          >
                            <div className="flex items-center space-x-3">
                              <motion.div
                                animate={isActive ? {
                                  rotate: [0, 360],
                                  scale: [1, 1.1, 1]
                                } : {}}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className={`${stage.color} ${isPast ? 'opacity-75' : ''} 
                                          p-2 rounded-lg bg-white shadow-sm`}
                              >
                                <Icon className="h-4 w-4" />
                              </motion.div>
                              
                              <div className="flex-1 min-w-0"> {/* Add min-w-0 to prevent text overflow */}
                                <p className={`text-sm font-medium truncate ${
                                  isActive ? stage.color : 'text-gray-600'
                                }`}>
                                  {stage.text}
                                </p>
                                
                                {isActive && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-2"
                                  >
                                    <p className="text-xs text-gray-500 mb-2">{stage.detail}</p>
                                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                                      <motion.div
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 1.5 }}
                                        className={`h-full ${stage.color.replace('text', 'bg')}`}
                                      />
                                    </div>
                                  </motion.div>
                                )}
                              </div>

                              {isPast && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="flex-shrink-0 text-green-500"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Final processing message */}
                    {searchStage === searchStages.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 text-center text-sm text-gray-500"
                      >
                        Preparing your results...
                      </motion.div>
                    )}
                  </motion.div>
                )}


              </div>

              {/* Suggestions */}
              <AnimatePresence>
                {!isSearching && (
                    <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-4 bg-gray-50 rounded-lg p-4"
                  >
                    <p className="text-sm text-gray-600 mb-3">Popular searches:</p>
                    <div className="space-y-2">
                      {suggestions.map((suggestion, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.9)" }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSearch(suggestion.text)}
                          className="block w-full text-left bg-white shadow-sm rounded-lg p-3 
                                   transition-all hover:shadow-md"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-xl">{suggestion.icon}</span>
                            <div>
                              <p className="text-sm text-gray-700">{suggestion.text}</p>
                              <div className="flex space-x-2 mt-1">
                                {suggestion.tags.map(tag => (
                                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default SemanticSearchDialog;