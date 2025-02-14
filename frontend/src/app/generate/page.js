'use client'
import React, { useState } from 'react';
import { Brain, ArrowLeft, Wand2, Film, Sparkles, History, Check, Search, Code, Cog, Database, ChevronLeft, Clock, Tag, Box } from 'lucide-react';
import Link from 'next/link';
import { VIDEO_METADATA } from '@/data/videoMetadata';

const VideoGenerationPage = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState(null);
  const [generationPhase, setGenerationPhase] = useState(0);
  
  const phases = [
    { 
      icon: Search, 
      text: "Analyzing semantic parameters",
      subtext: "Parsing natural language intent and identifying key themes...",
      duration: 1500 
    },
    { 
      icon: Database, 
      text: "Scanning archival database",
      subtext: "Querying temporal-spatial indices across historical footage...",
      duration: 2000 
    },
    { 
      icon: Brain, 
      text: "Neural content analysis",
      subtext: "Processing multi-modal features through semantic networks...",
      duration: 2500 
    },
    { 
      icon: Code, 
      text: "Metadata correlation",
      subtext: "Aligning chronological and thematic metadata structures...",
      duration: 2000 
    },
    { 
      icon: Cog, 
      text: "Generating composition",
      subtext: "Synthesizing narrative structure and temporal flow...",
      duration: 2000 
    }
  ];

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
        body: JSON.stringify({ prompt })
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

  const renderAnalysisPhase = () => {
    if (generationPhase === -1) return null;
    
    const CurrentIcon = phases[generationPhase]?.icon || Film;
    const analysisMetrics = [
      { label: "Confidence", value: Math.floor(Math.random() * 30 + 70) + "%" },
      { label: "Frames Analyzed", value: Math.floor(Math.random() * 5000 + 5000) },
      { label: "Processing Speed", value: Math.floor(Math.random() * 50 + 150) + " fps" },
      { label: "Memory Usage", value: Math.floor(Math.random() * 4 + 6) + " GB" }
    ];
    
    return (
      <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100" style={{ zIndex: 10 }}>
        <div className="h-full flex flex-col">
          {/* Analysis Header */}
          <div className="border-b border-gray-100 p-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-lg font-medium text-gray-700">AI Processing</span>
            </div>
            <button 
              onClick={() => setIsGenerating(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>

          {/* Main Analysis Content */}
          <div className="flex-1 p-6 flex">
            {/* Left Column - Main Visualization */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-8">
              <div className="relative">
                <div className="absolute inset-0 animate-ping duration-1000">
                  <CurrentIcon className="h-24 w-24 text-blue-200" />
                </div>
                <div className="absolute inset-0 animate-pulse duration-1000">
                  <CurrentIcon className="h-24 w-24 text-blue-400" />
                </div>
                <div className="absolute inset-0 animate-spin-slow duration-1000">
                  <div className="h-24 w-24 rounded-full border-4 border-blue-500/20 border-t-blue-500" />
                </div>
                <CurrentIcon className="h-24 w-24 text-blue-600 relative animate-float duration-1000" />
              </div>
              
              <div className="text-center space-y-3">
                <div className="text-2xl font-bold text-gray-900 animate-fade-in">
                  {phases[generationPhase]?.text}
                </div>
                <div className="text-gray-500 text-base animate-pulse max-w-lg">
                  {phases[generationPhase]?.subtext}
                </div>
                <div className="text-sm text-gray-400 max-w-xl">
                  {generationPhase === 0 && "Analyzing input parameters and identifying key themes, subjects, and temporal requirements for the compilation..."}
                  {generationPhase === 1 && "Searching through extensive archive of historical footage, identifying relevant clips and examining metadata..."}
                  {generationPhase === 2 && "Deep analysis of visual content, semantic meaning, and narrative connections across selected footage..."}
                  {generationPhase === 3 && "Correlating metadata across time periods, locations, and themes to ensure coherent storytelling..."}
                  {generationPhase === 4 && "Finalizing video composition, optimizing transitions, and ensuring narrative flow..."}
                </div>
              </div>

              <div className="flex justify-center space-x-4 mb-4">
                {phases.map((phase, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div 
                      className={`h-3 w-3 rounded-full transition-all duration-500 transform ${
                        index === generationPhase ? 'scale-110 bg-blue-500 animate-pulse shadow-md shadow-blue-500/50' : 
                        index < generationPhase ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                    <phase.icon 
                      className={`h-5 w-5 transition-all duration-500 transform ${
                        index === generationPhase ? 'text-blue-500 scale-110' :
                        index < generationPhase ? 'text-green-500' : 'text-gray-300'
                      }`}
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 w-full max-w-2xl mt-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Neural Processing</h4>
                  <div className="space-y-1 text-xs text-gray-500">
                    <div>• Analyzing frame sequences</div>
                    <div>• Processing temporal patterns</div>
                    <div>• Evaluating scene transitions</div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Content Analysis</h4>
                  <div className="space-y-1 text-xs text-gray-500">
                    <div>• Identifying key subjects</div>
                    <div>• Mapping narrative flow</div>
                    <div>• Optimizing pacing</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Analysis Metrics */}
            <div className="w-56 border-l border-gray-100 pl-6 space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Analysis Metrics</h3>
              
              {analysisMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-sm text-gray-500">{metric.label}</div>
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full animate-pulse"
                      style={{ width: `${Math.random() * 40 + 60}%` }}
                    />
                  </div>
                </div>
              ))}

              <div className="pt-6 border-t border-gray-100">
                <div className="text-sm font-medium text-gray-500 mb-4">Processing Log</div>
                <div className="space-y-2 text-xs font-mono">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="text-gray-500 animate-fade-in" style={{ animationDelay: `${i * 0.2}s` }}>
                      [{new Date().toLocaleTimeString()}] Processing frame {Math.floor(Math.random() * 1000)}...
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMainContent = () => {
    if (generationResult) {
      return (
        <div className="space-y-8 animate-fade-up">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.02] duration-300">
            <div className="aspect-video bg-black">
              <video
                src={generationResult.finalVideo.finalVideo}
                controls
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-8 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Generated Compilation</h2>
              <p className="text-gray-600 leading-relaxed">{generationResult.description}</p>
              <div className="mt-6 flex items-center space-x-6 text-sm">
                <span className="flex items-center px-4 py-2 bg-gray-50 rounded-full">
                  <Clock className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="font-medium">{generationResult.metadata.processingTime}</span>
                </span>
                <span className="flex items-center px-4 py-2 bg-gray-50 rounded-full">
                  <Brain className="h-5 w-5 mr-2 text-purple-500" />
                  <span className="font-medium">{generationResult.metadata.model}</span>
                </span>
                <span className="flex items-center px-4 py-2 bg-gray-50 rounded-full">
                  <Tag className="h-5 w-5 mr-2 text-green-500" />
                  <span className="font-medium">{(generationResult.metadata.confidence * 100).toFixed(0)}%</span>
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-[1.02] duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Sparkles className="h-6 w-6 mr-2 text-blue-500" />
                Editing Strategy
              </h3>
              <div className="space-y-4">
                {generationResult.editingNotes?.map((note, index) => (
                  <div key={index} className="flex items-start space-x-3 text-gray-600 bg-gray-50 p-4 rounded-lg">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-[1.02] duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Code className="h-6 w-6 mr-2 text-purple-500" />
                Generated Script
              </h3>
              <div className="bg-gray-50 rounded-xl p-6">
                <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                  {generationResult.voiceoverScript}
                </pre>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-up">
        <div className="flex items-center mb-10">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-4 shadow-lg">
            <Wand2 className="h-10 w-10 text-white" />
          </div>
          <div className="ml-6">
            <h1 className="text-3xl font-bold text-gray-900">AI Video Generation</h1>
            <p className="text-gray-500 mt-1">Create stunning compilations with advanced AI analysis</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              What would you like to create?
            </label>
            <textarea
              className="w-full p-6 text-gray-700 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-lg"
              placeholder="Describe your vision for the perfect video..."
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl"
          >
            {isGenerating ? 'Processing...' : 'Generate Video'}
          </button>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Example prompts</h3>
            <div className="space-y-3">
              {[
                "Create a documentary about Arctic research and wildlife conservation",
                "Show how industrial development changed traditional ways of life",
                "Document environmental changes in the Arctic and traditional lands"
              ].map((example, i) => (
                <button
                  key={i}
                  onClick={() => setPrompt(example)}
                  className="block w-full text-left text-gray-700 hover:bg-white p-4 rounded-lg transition-all duration-300 hover:shadow-md"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSourceClips = () => {
    const clips = generationResult?.relevantClips || [];
    const allClips = [...clips, ...Object.values(VIDEO_METADATA)];
    const uniqueClips = Array.from(new Set(allClips.map(clip => clip.title)))
      .map(title => allClips.find(clip => clip.title === title));

    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 animate-fade-left">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Film className="h-6 w-6 mr-2 text-blue-500" />
          Archive Footage
        </h2>
        <div className="space-y-4">
          {uniqueClips.map((clip) => (
            <div 
              key={clip.title}
              className={`group bg-gray-50 rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02] ${
                clips.some(c => c.title === clip.title) ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/20' : ''
              }`}
            >
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                <img
                  src={clip.thumbnailSrc}
                  alt={clip.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900">{clip.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{clip.duration}</p>
                {clips.some(c => c.title === clip.title) && (
                  <span className="mt-2 inline-flex items-center text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                    <Check className="h-4 w-4 mr-1" />
                    Selected
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto py-4 px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link 
                href="/library" 
                className="flex items-center space-x-2 bg-white/10 rounded-lg px-4 py-2 hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Library</span>
              </Link>
              <div className="flex items-center space-x-8">
                <span className="flex items-center text-sm bg-white/10 px-4 py-2 rounded-lg">
                  <Brain className="h-5 w-5 mr-2" />
                  Neural Engine
                </span>
                <span className="flex items-center text-sm bg-white/10 px-4 py-2 rounded-lg">
                  <Database className="h-5 w-5 mr-2" />
                  Archive Analysis
                </span>
                <span className="flex items-center text-sm bg-white/10 px-4 py-2 rounded-lg">
                  <Sparkles className="h-5 w-5 mr-2" />
                  AI Synthesis
                </span>
                <span className="flex items-center text-sm bg-white/10 px-4 py-2 rounded-lg">
                  <Box className="h-5 w-5 mr-2" />
                  {Object.keys(VIDEO_METADATA).length} Source Videos
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="col-span-3 relative">
            {renderMainContent()}
            {isGenerating && renderAnalysisPhase()}
          </div>

          {/* Sidebar */}
          <div className="col-span-1">
            {renderSourceClips()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGenerationPage;