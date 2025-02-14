import React, { useState } from 'react';
import { Dialog, Tab } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Camera, 
  Clock, 
  Calendar, 
  Film,
  Languages,
  PlayCircle,
  ScrollText,
  AlertCircle,
  Volume2,
  Download,
  Share2
} from 'lucide-react';

const VideoModal = ({ video, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  if (!video) return null;

  const languages = [
    { code: 'en', name: 'English', icon: '🇺🇸', voiceName: 'Joanna' },
    { code: 'fr', name: 'Français', icon: '🇫🇷', voiceName: 'Céline' },
    { code: 'kr', name: '한국어', icon: '🇰🇷', voiceName: 'Seoyeon' }
  ];

  const transcriptData = video.metadata?.translations || {};

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
        className="fixed inset-0 bg-black/90 backdrop-blur-sm"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-6xl w-full bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="flex h-[80vh]">
            {/* Left Panel - Video and Main Info */}
            <div className="w-2/3 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 relative flex flex-col">
              {/* AI Content Notice */}
              <div className="p-4 border-b border-indigo-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Brain className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">AI-Enhanced Historical Content</h4>
                      <p className="text-sm text-gray-600">This content has been digitally restored and analyzed</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-indigo-700 transition-colors">
                    <Download className="w-4 h-4" />
                    Add to Library
                  </button>
                </div>
              </div>

              {/* Video Player */}
              <div className="relative flex-grow flex flex-col">
                <div className="aspect-video w-full relative">
                  <video 
                    className="w-full h-full object-contain bg-gray-900"
                    controls
                    autoPlay
                    src={video.url}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                {/* AI Processing Status */}
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-indigo-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Brain className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-medium text-gray-900">Analysis</span>
                      </div>
                      <div className="text-2xl font-bold text-indigo-600">
                        {(video.metadata?.aiAnalysis?.averageConfidence * 100).toFixed(0)}%
                      </div>
                      <p className="text-xs text-gray-600">Confidence Score</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-indigo-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Camera className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-900">Objects</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {video.metadata?.aiAnalysis?.detectedObjects?.length || 0}
                      </div>
                      <p className="text-xs text-gray-600">Items Detected</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-indigo-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Languages className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-gray-900">Languages</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-600">
                        {Object.keys(video.metadata?.translations || {}).length}
                      </div>
                      <p className="text-xs text-gray-600">Translations Available</p>
                    </div>
                  </div>
                </div>

                {/* Responsible AI Notice */}
                <div className="p-4 mt-auto">
                  <div className="bg-white/60 backdrop-blur-sm border border-yellow-200 rounded-lg p-4">
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Responsible AI Notice</h4>
                        <p className="text-sm text-gray-600">
                          This historical content has been enhanced using AI technology. While we strive for accuracy in restoration and analysis, please note that AI processing may affect the original content. Verify critical information from multiple sources.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs"
                  >
                    <Brain className="w-3.5 h-3.5" />
                    AI Enhanced
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1.5 rounded-full text-xs"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    {video.metadata?.aiAnalysis?.detectedObjects?.length || 0} Objects Detected
                  </motion.div>
                </div>

                {/* Preservation Notice */}
                {video.metadata?.aiAnalysis?.preservation && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-black/70 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4 text-yellow-400" />
                      <span>{video.metadata.aiAnalysis.preservation}</span>
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Video Info Bar */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4">
                <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {video.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(video.metadata?.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Film className="w-4 h-4" />
                    {video.metadata?.format}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Panel - Tabs */}
            <div className="w-1/3 border-l border-gray-200">
              <Tab.Group>
                <Tab.List className="flex border-b border-gray-200">
                  <Tab className={({ selected }) =>
                    `flex-1 px-4 py-3 text-sm font-medium focus:outline-none ${
                      selected ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'
                    }`
                  }>
                    Overview
                  </Tab>
                  <Tab className={({ selected }) =>
                    `flex-1 px-4 py-3 text-sm font-medium focus:outline-none ${
                      selected ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'
                    }`
                  }>
                    Transcript
                  </Tab>
                </Tab.List>

                <Tab.Panels className="h-full overflow-y-auto">
                  {/* Overview Panel */}
                  <Tab.Panel className="p-6 space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
                      <p className="text-sm text-gray-600">{video.description}</p>
                    </div>

                    {/* AI Analysis */}
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Brain className="h-5 w-5 text-indigo-600" />
                        <h4 className="font-medium text-gray-900">AI Analysis</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Confidence Score</span>
                          <span className="font-medium text-indigo-600">
                            {(video.metadata?.aiAnalysis?.averageConfidence * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">Detected Objects:</p>
                          <div className="flex flex-wrap gap-2">
                            {video.metadata?.aiAnalysis?.detectedObjects?.map((obj, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-white/60 text-indigo-700 text-xs rounded-full"
                              >
                                {obj}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {video.metadata?.tags?.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Processing Info */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">AI Processing</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(video.metadata?.processedBy || {}).map(([key, value]) => (
                          <div
                            key={key}
                            className={`p-2 rounded ${
                              value ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'
                            }`}
                          >
                            <span className="text-xs font-medium capitalize">{key}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Tab.Panel>

                  {/* Transcript Panel */}
                  <Tab.Panel className="h-full flex flex-col">
                    {/* Language Selector */}
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex gap-2">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => setSelectedLanguage(lang.code)}
                            className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 ${
                              selectedLanguage === lang.code
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <span>{lang.icon}</span>
                            <span>{lang.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Transcript Content */}
                    <div className="flex-1 overflow-y-auto p-4">
                      <div className="space-y-4">
                        {transcriptData[selectedLanguage]?.transcription?.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex gap-4"
                          >
                            <span className="text-sm font-medium text-gray-500 w-12">
                              {item.time}
                            </span>
                            <p className="text-sm text-gray-700 flex-1">{item.text}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Translation Info */}
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Languages className="w-4 h-4" />
                        <span>AI-translated by Amazon Translate</span>
                      </div>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default VideoModal;