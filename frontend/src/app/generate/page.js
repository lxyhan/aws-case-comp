'use client'
import React, { useState, useEffect } from 'react';
import { Brain, ArrowLeft, Wand2, Film, Sparkles, History, Check } from 'lucide-react';
import Link from 'next/link';
import videoLibrary from '../../data/videos';
import GenerationStates from '../components/GenerationStates';
import { findRelevantVideos, generateVideoAnalysis } from '../services/videoGenerationService';

const VideoGenerationPage = () => {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedVideos, setSelectedVideos] = useState([]);
    const [videoAnalysis, setVideoAnalysis] = useState(null);
    const [activeTab, setActiveTab] = useState('sources'); // 'sources' or 'analysis'
    
    const handleGenerate = async () => {
      if (!prompt.trim()) return;
      
      setIsGenerating(true);
      
      try {
        // Find relevant videos
        const relevantVideos = await findRelevantVideos(prompt, videoLibrary.videos);
        setSelectedVideos(relevantVideos);
  
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 8000));
  
        // Generate analysis
        const analysis = await generateVideoAnalysis(prompt, relevantVideos);
        setVideoAnalysis(analysis);
      } catch (error) {
        console.error('Generation error:', error);
      } finally {
        setIsGenerating(false);
      }
    };
  
    // Render the right panel content based on active tab
    const renderRightPanel = () => {
      return (
        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
          {/* Tab Navigation */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('sources')}
              className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'sources' 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Source Material
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'analysis' 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              AI Analysis
            </button>
          </div>
  
          {activeTab === 'sources' ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Source Clips</h2>
                {isGenerating && (
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                    Analyzing
                  </span>
                )}
              </div>
              
              <div className="space-y-4">
                {selectedVideos.map((video, index) => (
                  <div 
                    key={video.id}
                    className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
                      isGenerating ? 'opacity-100 transform translate-y-0' : ''
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="relative aspect-video">
                      <img
                        src={video.thumbnailSrc}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      {isGenerating && (
                        <div className="absolute inset-0 bg-indigo-500/10 flex items-center justify-center">
                          <div className="bg-white/90 rounded-lg px-2 py-1 text-xs font-medium text-indigo-600">
                            Processing clip...
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-gray-50">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{video.title}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-500">{video.duration}</p>
                        {video.relevanceScore && (
                          <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                            {(video.relevanceScore * 100).toFixed(0)}% match
                          </span>
                        )}
                      </div>
                      {isGenerating && (
                        <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-600 transition-all duration-1000"
                            style={{ 
                              width: `${Math.random() * 100}%`,
                              transitionDelay: `${index * 200}ms`
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
  
                {selectedVideos.length === 0 && (
                  <div className="text-center py-8">
                    <Film className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Source clips will appear here during generation
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="space-y-6">
                {videoAnalysis ? (
                  <>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
                      <p className="text-sm text-gray-600">{videoAnalysis.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">AI Insights</h3>
                      <div className="space-y-2">
                        {videoAnalysis.aiInsights.map((insight, index) => (
                          <div 
                            key={index}
                            className="flex items-center space-x-2 text-sm text-gray-600"
                          >
                            <Check className="h-4 w-4 text-green-500" />
                            <span>{insight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
  
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Generated Transcript</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                          {videoAnalysis.transcript}
                        </pre>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Sparkles className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Generate a video to see AI analysis
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      );
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
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Link */}
        <Link 
          href="/library"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Archive
        </Link>

        <div className="grid grid-cols-3 gap-6">
          {/* Main Generation Form */}
          <div className="col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Header */}
              <div className="flex items-center mb-8">
                <div className="bg-indigo-100 rounded-lg p-3">
                  <Wand2 className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-semibold text-gray-900">AI Video Generation</h1>
                  <p className="text-gray-500">Create custom videos from our archive using AI</p>
                </div>
              </div>

              {/* Main Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What would you like to create?
                  </label>
                  <textarea
                    className="w-full p-4 text-gray-700 rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Describe the video you want to generate..."
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? 'Generating...' : 'Generate Video'}
                </button>

                <GenerationStates 
                  isGenerating={isGenerating} 
                  prompt={prompt}
                />

                {/* Example prompts */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Example prompts</h3>
                  <div className="space-y-2">
                    {[
                      "Create a 2-minute documentary about the evolution of computers",
                      "Make an educational video about space exploration milestones",
                      "Generate a highlight reel of Olympic opening ceremonies"
                    ].map((example, i) => (
                      <button
                        key={i}
                        onClick={() => setPrompt(example)}
                        className="block w-full text-left text-sm text-gray-700 hover:bg-gray-100 p-3 rounded transition-colors"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1">
                {renderRightPanel()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoGenerationPage;