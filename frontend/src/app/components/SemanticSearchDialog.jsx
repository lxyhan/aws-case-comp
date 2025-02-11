import React, { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Brain, Search, Sparkles, Database, Code, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SemanticSearchDialog = ({ isOpen, onClose, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchStage, setSearchStage] = useState(0);
  
  const searchStages = [
    { icon: Brain, text: "Processing natural language...", color: "text-blue-500" },
    { icon: Database, text: "Searching video archives...", color: "text-purple-500" },
    { icon: Code, text: "Computing semantic relevance...", color: "text-indigo-500" },
    { icon: Wand2, text: "Generating results...", color: "text-green-500" }
  ];

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setIsSearching(true);
    
    // Simulate staged search process
    for (let i = 0; i < searchStages.length; i++) {
      setSearchStage(i);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      onSearch(query);
      onClose();
    } finally {
      setIsSearching(false);
      setSearchStage(0);
    }
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
                  <div className="absolute -bottom-24 left-0 right-0 bg-white rounded-lg shadow-lg p-4">
                    <div className="space-y-2">
                      {searchStages.map((stage, index) => {
                        const Icon = stage.icon;
                        const isActive = index === searchStage;
                        const isPast = index < searchStage;

                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ 
                              opacity: isActive || isPast ? 1 : 0.5,
                              x: 0,
                              scale: isActive ? 1.02 : 1
                            }}
                            className="flex items-center space-x-2"
                          >
                            <motion.div
                              animate={isActive ? {
                                rotate: [0, 360],
                                scale: [1, 1.1, 1]
                              } : {}}
                              transition={{ duration: 1, repeat: Infinity }}
                              className={`${stage.color} ${isPast ? 'opacity-50' : ''}`}
                            >
                              <Icon className="h-4 w-4" />
                            </motion.div>
                            <span className={`text-sm ${isActive ? stage.color : 'text-gray-500'}`}>
                              {stage.text}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Suggestions */}
              <AnimatePresence>
                {!isSearching && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gray-50 rounded-lg p-4"
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