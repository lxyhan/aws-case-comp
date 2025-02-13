'use client';
import React from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Brain, Sparkles, Target, Clock, PlayCircle, Gauge, Pin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SearchResultsDialog = ({ results, isOpen, onClose }) => {
  if (!isOpen || !results) return null;

  const confidenceScore = (results.metadata.relevance * 100).toFixed(0);

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
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          as={motion.div}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-xl max-w-3xl w-full shadow-2xl overflow-hidden"
        >
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-white/20 rounded-lg p-2"
                >
                  <Sparkles className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <Dialog.Title className="text-xl font-semibold text-white">
                    AI-Powered Results
                  </Dialog.Title>
                  <p className="text-white/80 text-sm">Intelligent video analysis complete</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {/* AI Analysis Card */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="h-6 w-6 text-indigo-600" />
                <h4 className="text-lg font-semibold text-indigo-900">Semantic Analysis</h4>
              </div>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-700 leading-relaxed"
              >
                {results.metadata.llmAnalysis}
              </motion.p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-4 shadow-md border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="h-5 w-5 text-green-500" />
                  <p className="text-sm text-gray-600">Relevance Score</p>
                </div>
                <p className="text-2xl font-bold text-green-600">{confidenceScore}%</p>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-4 shadow-md border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <p className="text-sm text-gray-600">Processing Time</p>
                </div>
                <p className="text-2xl font-bold text-blue-600">{results.metadata.searchTime}</p>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-4 shadow-md border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  <p className="text-sm text-gray-600">Matches Found</p>
                </div>
                <p className="text-2xl font-bold text-purple-600">{results.metadata.totalResults}</p>
              </motion.div>
            </div>

            {/* Tags Cloud */}
            {results.metadata.suggestedTags?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Pin className="h-5 w-5 text-indigo-600" />
                  <h4 className="font-medium text-gray-900">Related Topics</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {results.metadata.suggestedTags.map((tag, index) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-sm bg-gradient-to-r from-indigo-50 to-purple-50 
                               text-indigo-700 px-3 py-1.5 rounded-full border border-indigo-100
                               shadow-sm"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Video Results */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 flex items-center gap-2">
                <PlayCircle className="h-5 w-5 text-indigo-600" />
                Matched Content
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {results.videos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100
                             hover:shadow-lg transition-shadow"
                  >
                    <div className="relative aspect-video">
                      <img
                        src={video.thumbnailSrc}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white font-medium text-sm">{video.title}</p>
                        <p className="text-white/80 text-xs">{video.duration}</p>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{video.type}</span>
                        <span className="text-xs font-medium text-green-600">
                          {(video.confidence * 100).toFixed(0)}% match
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-end">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 
                       rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all
                       shadow-md hover:shadow-lg"
            >
              View All Results
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default SearchResultsDialog;