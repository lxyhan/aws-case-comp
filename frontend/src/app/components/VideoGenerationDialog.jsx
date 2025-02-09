import React, { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Brain, Wand2 } from 'lucide-react';

const VideoGenerationDialog = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  
  const handleGenerate = () => {
    // Add demo generation logic here
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="mx-auto max-w-xl w-full rounded-xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-indigo-100 rounded-lg p-2">
                  <Brain className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Generate Video</h3>
                  <p className="text-sm text-gray-500">AI-powered video creation</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <XMarkIcon className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            
            <div className="space-y-4">
              <textarea
                className="w-full p-3 text-gray-700 rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                placeholder="Describe the video you want to create..."
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />

              <button
                onClick={handleGenerate}
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Generate Video
              </button>

              {/* Example prompts */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Example prompts:</p>
                <div className="space-y-2">
                  {[
                    "Create a 2-minute documentary about the evolution of computers",
                    "Make an educational video about space exploration milestones",
                    "Generate a highlight reel of Olympic opening ceremonies"
                  ].map((example, i) => (
                    <button
                      key={i}
                      onClick={() => setPrompt(example)}
                      className="block w-full text-left text-sm text-gray-700 hover:bg-gray-100 p-2 rounded"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default VideoGenerationDialog;