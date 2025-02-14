import React, { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Brain, Search, Sparkles, Database, CheckCircle, Code, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SemanticSearchDialog = ({ isOpen, onClose, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchStage, setSearchStage] = useState(0);
  const [stats, setStats] = useState({
    matches: 0,
    confidence: 0,
    processed: 0
  });
  
  const searchStages = [
    { 
      icon: Brain, 
      text: "Processing natural language query...", 
      color: "text-blue-500",
      bgColor: "bg-blue-500",
      detail: "Analyzing semantic context and intent",
      steps: [
        "Tokenizing input sequence",
        "Extracting key entities",
        "Computing semantic embeddings",
        "Optimizing search vectors"
      ]
    },
    { 
      icon: Database, 
      text: "Searching historical archives...", 
      color: "text-purple-500",
      bgColor: "bg-purple-500",
      detail: "Scanning through decades of footage",
      steps: [
        "Initializing temporal index",
        "Mapping content clusters",
        "Traversing archive nodes",
        "Building result cache"
      ]
    },
    { 
      icon: Code, 
      text: "Computing relevance scores...", 
      color: "text-indigo-500",
      bgColor: "bg-indigo-500",
      detail: "Matching content with semantic vectors",
      steps: [
        "Calculating similarity metrics",
        "Ranking temporal relevance",
        "Adjusting confidence scores",
        "Filtering matches"
      ]
    },
    { 
      icon: Wand2, 
      text: "Curating results...", 
      color: "text-green-500",
      bgColor: "bg-green-500",
      detail: "Organizing findings by relevance",
      steps: [
        "Sorting by relevance score",
        "Grouping similar content",
        "Optimizing presentation",
        "Finalizing rankings"
      ]
    }
  ];

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setIsSearching(true);
    setSearchStage(0);
    setStats({ matches: 0, confidence: 0, processed: 0 });
    
    for (let i = 0; i < searchStages.length; i++) {
      setSearchStage(i);
      // Simulate processing stats updates
      for (let j = 0; j < 4; j++) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setStats(prev => ({
          matches: prev.matches + Math.floor(Math.random() * 2),
          confidence: Math.min(((i * 25) + (j * 6)) + Math.random() * 5, 100),
          processed: prev.processed + Math.floor(Math.random() * 2)
        }));
      }
    }
    
    try {
      await onSearch(query);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setSearchStage(0);
      setIsSearching(false);
      setStats({ matches: 0, confidence: 0, processed: 0 });
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
            className="mx-auto max-w-xl w-full rounded-xl bg-white p-6 shadow-2xl"
          >
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

                {/* Enhanced Search Stages Animation */}
                {isSearching && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                  >
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden max-w-xl w-full mx-4 max-h-[80vh]"
                  >
                    {/* Processing Stats */}
                    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
                      <div className="grid grid-cols-3 gap-6 text-white">
                        <div>
                          <p className="text-xs opacity-80">Matches Found</p>
                          <p className="font-mono text-xl">{stats.matches}</p>
                        </div>
                        <div>
                          <p className="text-xs opacity-80">Confidence Score</p>
                          <p className="font-mono text-xl">{stats.confidence.toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-xs opacity-80">Items Processed</p>
                          <p className="font-mono text-xl">{stats.processed}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 140px)' }}>
                      {searchStages.map((stage, index) => {
                        const Icon = stage.icon;
                        const isActive = index === searchStage;
                        const isPast = index < searchStage;

                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ 
                              opacity: isActive || isPast ? 1 : 0.4,
                              x: 0,
                              scale: isActive ? 1.02 : 1
                            }}
                            className={`relative ${isActive ? 'bg-gray-50 rounded-xl p-4' : 'p-3'}`}
                          >
                            <div className="flex items-start space-x-4">
                              <motion.div
                                animate={isActive ? {
                                  rotate: [0, 360],
                                  scale: [1, 1.2, 1]
                                } : {}}
                                transition={{ duration: 2, repeat: Infinity }}
                                className={`${stage.color} p-2 rounded-lg bg-white shadow-md`}
                              >
                                <Icon className="h-5 w-5" />
                              </motion.div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p className={`font-medium ${
                                    isActive ? stage.color : 'text-gray-600'
                                  }`}>
                                    {stage.text}
                                  </p>
                                  {isPast && (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  )}
                                </div>
                                
                                {isActive && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-2 space-y-2"
                                  >
                                    <p className="text-sm text-gray-600">{stage.detail}</p>
                                    
                                    <div className="space-y-2">
                                      {stage.steps.map((step, stepIndex) => (
                                        <motion.div
                                          key={step}
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: stepIndex * 0.15 }}
                                          className="flex items-center space-x-2"
                                        >
                                          <div className={`h-1.5 w-1.5 rounded-full ${stage.bgColor}`} />
                                          <p className="text-xs text-gray-500">{step}</p>
                                        </motion.div>
                                      ))}
                                    </div>

                                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                                      <motion.div
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 2 }}
                                        className={`h-full ${stage.bgColor}`}
                                      />
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
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