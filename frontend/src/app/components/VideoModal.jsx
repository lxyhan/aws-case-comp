// VideoModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, Clock, Tag, X, Download, Share2, BookmarkPlus, 
  PlayCircle, Brain, MessageSquare, FileText, Sparkles,
  ChevronRight, ChevronDown, Search, Copy, Star, Chart
} from 'lucide-react';

const VideoModal = ({ video, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  // Mock AI analysis data (same as before)
  const aiAnalysis = {
    tags: ['Corporate Meeting', 'Strategy Discussion', 'Q4 Review', 'Financial Planning'],
    keyTopics: ['Revenue Growth', 'Market Expansion', 'Product Launch', 'Team Performance'],
    sentiment: 'Positive',
    speakerCount: 4,
    keyMoments: [
      { time: '2:30', topic: 'Q4 Revenue Discussion', confidence: 0.95 },
      { time: '5:45', topic: 'New Market Strategy', confidence: 0.88 },
      { time: '8:15', topic: 'Product Roadmap', confidence: 0.92 }
    ],
    transcript: [
      { time: '0:00', speaker: 'John', text: 'Welcome everyone to our Q4 review meeting.' },
      { time: '0:05', speaker: 'Sarah', text: 'Lets start with the financial overview.' },
    ]
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!video || !isOpen) return null;

  const handleTimeClick = (time) => {
    const [minutes, seconds] = time.split(':').map(Number);
    if (videoRef.current) {
      videoRef.current.currentTime = minutes * 60 + seconds;
      videoRef.current.play();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-[95vw] h-[90vh] bg-gray-100 rounded-xl overflow-hidden shadow-2xl animate-modalSlideUp">
        {/* Main Layout - Now split into two columns */}
        <div className="h-full flex">
          {/* Left Column - Video and Details */}
          <div className="w-[55%] h-full flex flex-col bg-white">
            {/* Video Section - Now more compact */}
            <div className="relative w-full bg-black group" style={{ height: '45%' }}>
              <video
                ref={videoRef}
                className="h-full w-full object-contain"
                src={video.videoUrl}
                poster={video.thumbnailSrc}
                onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controls
              >
                <source src={video.videoUrl} type="video/mp4" />
              </video>
              
              {/* Video overlay controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Play button and controls here */}
              </div>
            </div>

            {/* Video Details Section */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{video.title}</h2>
                    <div className="flex items-center space-x-4 mt-2 text-gray-500 text-sm">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(video.metadata?.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {video.duration}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                      <BookmarkPlus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{video.description}</p>
              </div>
            </div>
          </div>

          {/* Right Column - AI Analysis and Transcript */}
          <div className="flex-1 h-full flex flex-col bg-gray-50">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {['ai-analysis', 'transcript'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-6 py-3 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? 'text-indigo-600 border-b-2 border-indigo-500 bg-white'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    {tab === 'ai-analysis' && <Brain className="w-4 h-4" />}
                    {tab === 'transcript' && <MessageSquare className="w-4 h-4" />}
                    <span className="capitalize">{tab.replace('-', ' ')}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'ai-analysis' && (
                <div className="p-6 space-y-6">
                  {/* AI Analysis Content */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <Brain className="w-5 h-5 text-indigo-600" />
                      <h3 className="font-medium text-gray-900">AI Insights</h3>
                    </div>
                    
                    {/* Smart Tags */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Smart Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {aiAnalysis.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Moments */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Key Moments</h4>
                        <div className="space-y-2">
                          {aiAnalysis.keyMoments.map((moment) => (
                            <button
                              key={moment.time}
                              onClick={() => handleTimeClick(moment.time)}
                              className="w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left flex items-center justify-between group transition-colors"
                            >
                              <div>
                                <span className="text-sm font-medium text-indigo-600">{moment.time}</span>
                                <p className="text-sm text-gray-600">{moment.topic}</p>
                              </div>
                              <PlayCircle className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'transcript' && (
                <div className="p-6 space-y-6">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search transcript..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
                    />
                  </div>

                  {/* Transcript Content */}
                  <div className="space-y-4">
                    {aiAnalysis.transcript.map((entry, index) => (
                      <div
                        key={index}
                        onClick={() => handleTimeClick(entry.time)}
                        className="p-3 hover:bg-white rounded-lg cursor-pointer group transition-colors"
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-indigo-600">{entry.time}</span>
                          <span className="text-sm font-medium text-gray-900">{entry.speaker}</span>
                        </div>
                        <p className="text-sm text-gray-600">{entry.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-black/30 p-2 text-white 
            hover:bg-black/50 transition-all duration-300 hover:scale-110 group"
        >
          <X className="h-5 w-5 transform transition-transform group-hover:rotate-90" />
        </button>
      </div>
    </div>
  );
};

export default VideoModal;