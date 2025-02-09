import React, { useState, useEffect } from 'react';
import { Brain, Sparkles, Film, Wand2, PlayCircle, Clock, Settings, Check } from 'lucide-react';

const GenerationStates = ({ isGenerating, prompt }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  const steps = [
    { icon: Brain, label: "Analyzing prompt", sublabel: "Understanding context and requirements" },
    { icon: Film, label: "Searching archives", sublabel: "Finding relevant footage" },
    { icon: Settings, label: "Processing content", sublabel: "Applying AI transformations" },
    { icon: Wand2, label: "Generating video", sublabel: "Composing final output" }
  ];

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
      }, 2000);

      // Show result after all steps
      setTimeout(() => {
        setShowResult(true);
        clearInterval(interval);
      }, 8000);

      return () => clearInterval(interval);
    } else {
      setCurrentStep(0);
      setShowResult(false);
    }
  }, [isGenerating]);

  if (!isGenerating && !showResult) return null;

  if (showResult) {
    return (
      <div className="mt-8 space-y-6">
        {/* Video Player */}
        <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <video 
              className="w-full h-full object-cover"
              autoPlay 
              loop 
              muted
              src="/demo-video.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          
          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-indigo-400 transition-colors">
                <PlayCircle className="h-8 w-8" />
              </button>
              <div className="text-white text-sm">00:00 / 02:30</div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-indigo-400" />
              <span className="text-white text-sm">Generated in 8s</span>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="flex items-center text-sm font-medium text-gray-900 mb-3">
            <Sparkles className="h-4 w-4 text-indigo-600 mr-2" />
            AI Generation Insights
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="bg-white rounded-lg p-3 flex-1 text-sm text-gray-600">
                Used 12 archive clips to compose the video
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-white rounded-lg p-3 flex-1 text-sm text-gray-600">
                Applied intelligent transitions based on content context
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-white rounded-lg p-3 flex-1 text-sm text-gray-600">
                Enhanced audio clarity and balanced levels
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="relative">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isComplete = index < currentStep;

            return (
              <div 
                key={index}
                className={`relative ${
                  isActive ? 'scale-105 transform transition-all' : ''
                }`}
              >
                <div className={`
                  p-4 rounded-lg border-2 transition-all
                  ${isActive ? 'border-indigo-500 bg-indigo-50' : 
                    isComplete ? 'border-green-500 bg-green-50' : 
                    'border-gray-200 bg-white'}
                `}>
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`h-5 w-5 ${
                      isActive ? 'text-indigo-600' : 
                      isComplete ? 'text-green-600' : 
                      'text-gray-400'
                    }`} />
                    {isComplete && (
                      <Check className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className={`text-sm font-medium ${
                      isActive ? 'text-indigo-900' : 
                      isComplete ? 'text-green-900' : 
                      'text-gray-900'
                    }`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-gray-500">
                      {step.sublabel}
                    </p>
                  </div>
                </div>

                {/* Animation dots for active step */}
                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GenerationStates;