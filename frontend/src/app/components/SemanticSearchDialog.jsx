import React, { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Brain, Search, Sparkles } from 'lucide-react';

const SemanticSearchDialog = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);
    // Add demo search logic here
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
                  <Sparkles className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Semantic Search</h3>
                  <p className="text-sm text-gray-500">RAG-powered archive search</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-12 py-3 rounded-lg text-gray-700 border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="What would you like to find?"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>

              {/* Demo suggestions */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Try searching for:</p>
                <div className="space-y-2">
                  {[
                    "Show me coverage of the moon landing",
                    "Find interviews about early computer technology",
                    "Historical footage of Olympic ceremonies"
                  ].map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => handleSearch(suggestion)}
                      className="block w-full text-left text-sm text-gray-700 hover:bg-gray-100 p-2 rounded"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results will be added here */}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default SemanticSearchDialog;