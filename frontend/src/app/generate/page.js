'use client'
import React, { useState } from 'react';
import { Brain, ArrowLeft, Wand2, Film, Sparkles, History } from 'lucide-react';
import Link from 'next/link';
import GenerationStates from '../components/GenerationStates';

const VideoGenerationPage = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Demo generation will take 8 seconds
    setTimeout(() => {
      setIsGenerating(false);
    }, 8000);
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
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Link */}
        <Link 
          href="/library"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Archive
        </Link>

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
                className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                            transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
      </main>
    </div>
  );
};

export default VideoGenerationPage;