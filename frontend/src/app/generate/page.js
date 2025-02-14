'use client'
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ArrowLeft, Wand2, Film, Sparkles, History, Check, Search, Code, 
         Cog, Database, Clock, Tag, Box, Globe2, Languages, FileVideo, Camera,
         ChevronRight, AlertCircle, PieChart, Zap, Binary, FileJson } from 'lucide-react';
import Link from 'next/link';
import { VIDEO_METADATA } from '@/data/videoMetadata';

const VideoGenerationPage = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState(null);
  const [generationPhase, setGenerationPhase] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('analysis');
  
  const languages = [
    { code: 'en', name: 'English', icon: '🇺🇸', voiceName: 'Joanna' },
    { code: 'fr', name: 'Français', icon: '🇫🇷', voiceName: 'Céline' },
    { code: 'kr', name: '한국어', icon: '🇰🇷', voiceName: 'Seoyeon' }
  ];

  const phases = [
    { 
      icon: Search, 
      text: "Semantic Analysis",
      subtext: "Processing natural language intent",
      metrics: {
        confidence: 92,
        tokens: 156,
        parameters: 12
      },
      duration: 2000
    },
    { 
      icon: Database, 
      text: "Archive Search",
      subtext: "Querying video database",
      metrics: {
        searched: 2500,
        matches: 15,
        accuracy: 94
      },
      duration: 2500
    },
    { 
      icon: Brain, 
      text: "Neural Processing",
      subtext: "Deep content analysis",
      metrics: {
        layers: 24,
        connections: '1.2M',
        accuracy: 96
      },
      duration: 3000
    },
    { 
      icon: Binary, 
      text: "Frame Analysis",
      subtext: "Processing visual features",
      metrics: {
        frames: 3600,
        objects: 245,
        scenes: 18
      },
      duration: 2500
    },
    { 
      icon: Cog, 
      text: "Final Assembly",
      subtext: "Generating composition",
      metrics: {
        clips: 8,
        transitions: 12,
        duration: '3:45'
      },
      duration: 2000
    }
  ];

  const VideoWithAudio = ({ videoSrc, voiceoverSrc }) => {
    const videoRef = useRef(null);
    const audioRef = useRef(null);

    const languageSuffix = selectedLanguage === 'en' ? '' : `-${selectedLanguage}`;
    const processedVideoSrc = videoSrc.replace('.mp4', `${languageSuffix}.mp4`);
    const processedAudioSrc = voiceoverSrc.replace('.mp3', `${languageSuffix}.mp3`);

    useEffect(() => {
      const video = videoRef.current;
      const audio = audioRef.current;
      
      const handlePlay = () => {
        audio.currentTime = video.currentTime;
        audio.play();
      };
      
      const handlePause = () => audio.pause();
      
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      
      return () => {
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      };
    }, []);

    return (
      <>
        <video ref={videoRef} src={processedVideoSrc} controls className="w-full h-full object-contain" />
        <audio ref={audioRef} src={processedAudioSrc} />
      </>
    );
  };

  const renderProcessingOverlay = () => {
    if (!isGenerating) return null;
    const phase = phases[generationPhase];
    const CurrentIcon = phase?.icon || Film;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-4xl w-full border border-white/20"
        >
          <div className="text-center mb-8">
            <motion.div
              className="inline-block p-4 bg-blue-500/20 rounded-2xl mb-4"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CurrentIcon className="h-12 w-12 text-blue-400" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">{phase?.text}</h2>
            <p className="text-blue-200">{phase?.subtext}</p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            {Object.entries(phase?.metrics || {}).map(([key, value]) => (
              <div key={key} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-white/60 text-sm mb-2 capitalize">{key}</h3>
                <p className="text-2xl font-bold text-white">{value}</p>
                <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: phase.duration / 1000 }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-2 mb-6">
            {phases.map((p, index) => (
              <motion.div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === generationPhase ? 'bg-blue-500' :
                  index < generationPhase ? 'bg-green-500' : 'bg-white/20'
                }`}
                animate={index === generationPhase ? {
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1]
                } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              />
            ))}
          </div>

          <div className="space-y-2 font-mono text-sm text-white/60">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex items-center space-x-2"
              >
                <span className="text-blue-400">{'>'}</span>
                <span>Processing frame {Math.floor(Math.random() * 1000)}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setGenerationResult(null);
    setGenerationPhase(0);
    
    for (let i = 0; i < phases.length; i++) {
      setGenerationPhase(i);
      await new Promise(resolve => setTimeout(resolve, phases[i].duration));
    }
    
    try {
      const response = await fetch('/api/video-generation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, language: selectedLanguage })
      });

      if (!response.ok) throw new Error('Generation failed');
      
      const result = await response.json();
      setGenerationResult(result);
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
      setGenerationPhase(-1);
    }
  };

  const renderResults = () => {
    if (!generationResult) return null;

  // Use relevantClips instead of sourceClips
  const relevantClips = generationResult.relevantClips || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-12 gap-6"
    >
        {/* Main Content Area */}
        <div className="col-span-8 space-y-6">
          {/* Video Player & Language Selector */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  {generationResult.finalVideo.title}
                </h2>
                <div className="flex space-x-2">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLanguage(lang.code)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                        selectedLanguage === lang.code
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">{lang.icon}</span>
                      <span className="text-sm font-medium">{lang.voiceName}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="aspect-video bg-black">
              <VideoWithAudio
                videoSrc={generationResult.finalVideo.finalVideo}
                voiceoverSrc={generationResult.finalVideo.voiceover}
              />
            </div>
          </div>
  
          {/* AI Analysis & Transcript */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-bold text-gray-900">AI Analysis</h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">{generationResult.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(generationResult.metadata).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-500 mb-1 capitalize">{key}</div>
                      <div className="font-medium text-gray-900">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
  
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <FileJson className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-bold text-gray-900">Generated Script</h3>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 max-h-[300px] overflow-y-auto">
                <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                  {generationResult.voiceoverScript}
                </pre>
              </div>
            </div>
          </div>
        </div>
        {/* Source Clips Sidebar */}
        <div className="col-span-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-bold text-gray-900">Source Material</h3>
              </div>
              <span className="text-sm text-gray-500">
                {relevantClips.length} clips used
              </span>
            </div>

            <div className="space-y-4">
              {/* Debug log */}
              {console.log('Relevant Clips:', relevantClips)}
              {relevantClips.map((clip, index) => {
                // Find matching video from VIDEO_METADATA
                const matchingVideo = Object.entries(VIDEO_METADATA).find(([key, data]) => 
                  data.type.toLowerCase().includes(clip.type.toLowerCase())
                );

                if (!matchingVideo) return null;
                const [key, metadata] = matchingVideo;

                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-gray-50 rounded-xl overflow-hidden hover:bg-gray-100 transition-all"
                  >
                    <div className="aspect-video bg-gray-100 relative">
                      <img
                        src={metadata.thumbnailSrc}
                        alt={metadata.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-white text-xs font-medium px-2 py-1 bg-black/50 rounded-full">
                              {metadata.duration}
                            </span>
                            <span className="text-white text-xs font-medium px-2 py-1 bg-blue-500/50 rounded-full">
                              {clip.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{metadata.title}</h4>
                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                          {metadata.metadata.format}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {metadata.metadata.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Original Date: {metadata.metadata.date}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <PieChart className="h-4 w-4 mr-2" />
                          <span>
                            Confidence: {(metadata.metadata.aiAnalysis.averageConfidence * 100).toFixed(0)}%
                          </span>
                        </div>
                        {clip.segments && (
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>Used Segments: {clip.segments.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
    </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/library" 
              className="flex items-center space-x-2 text-white/80 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Library</span>
            </Link>
            
            <div className="flex items-center space-x-6">
              {[
                { icon: Brain, label: 'Neural Engine' },
                { icon: Database, label: 'Archive Search' },
                { icon: FileVideo, label: 'Video Processing' },
                { icon: Languages, label: 'Multi-Language' }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-white/80"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {!generationResult && (
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-3">
                  <Wand2 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">AI Video Generation</h1>
                  <p className="text-gray-500">Create custom video compilations with advanced AI</p>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Output Language
                </label>
                <div className="flex space-x-4">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLanguage(lang.code)}
                      className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                        selectedLanguage === lang.code
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-200'
                      }`}
                    >
                      <div className="text-2xl mb-2">{lang.icon}</div>
                      <div className="font-medium text-gray-900">{lang.name}</div>
                      <div className="text-sm text-gray-500">Voice: {lang.voiceName}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe Your Video
                  </label>
                  <textarea
                    className="w-full p-4 text-base text-gray-900 rounded-xl border-2 border-gray-200 
                             focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Enter your video concept or requirements..."
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Suggested Prompts</h3>
                  <div className="space-y-3">
                    {[
                      {
                        icon: Database,
                        text: "Create a documentary about Arctic research expeditions",
                        theme: "Research"
                      },
                      {
                        icon: History,
                        text: "Show the evolution of industrial manufacturing techniques",
                        theme: "Industry"
                      },
                      {
                        icon: Globe2,
                        text: "Document environmental changes in indigenous territories",
                        theme: "Environment"
                      },
                      {
                        icon: Camera,
                        text: "Compile footage of traditional cultural practices",
                        theme: "Culture"
                      }
                    ].map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setPrompt(suggestion.text)}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white 
                                 transition-all duration-200 group"
                      >
                        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center 
                                    rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 
                                    group-hover:from-blue-100 group-hover:to-purple-100">
                          <suggestion.icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-gray-700 text-sm">{suggestion.text}</p>
                          <span className="text-xs text-gray-500">{suggestion.theme}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                           rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 
                           disabled:opacity-50 disabled:cursor-not-allowed transition-all
                           flex items-center justify-center space-x-2"
                >
                  {isGenerating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Cog className="h-5 w-5" />
                      </motion.div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-5 w-5" />
                      <span>Generate Video</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Film className="h-5 w-5 mr-2 text-blue-500" />
                  Available Source Material
                </h2>
                <div className="space-y-4">
                  {Object.entries(VIDEO_METADATA).map(([key, video]) => (
                    <div key={key} className="bg-gray-50 rounded-xl overflow-hidden">
                      <div className="aspect-video bg-gray-100 relative">
                        <img
                          src={video.thumbnailSrc}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-white text-sm font-medium truncate">
                            {video.title}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-white/80 text-xs">
                              {video.duration}
                            </span>
                            <span className="text-white/60 text-xs">
                              {video.metadata.format}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="flex flex-wrap gap-2">
                          {video.metadata.tags.slice(0, 3).map(tag => (
                            <span 
                              key={tag}
                              className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          AI Confidence: {video.metadata.aiAnalysis.averageConfidence * 100}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {renderResults()}
      </div>

      <AnimatePresence>
        {renderProcessingOverlay()}
      </AnimatePresence>
    </div>
  );
};

export default VideoGenerationPage;

