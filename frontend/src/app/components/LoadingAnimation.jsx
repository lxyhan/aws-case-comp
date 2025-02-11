// components/LoadingAnimation.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Search, Database } from 'lucide-react';

const LoadingAnimation = ({ message = "Loading content..." }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="text-indigo-600"
              >
                <Brain className="w-8 h-8" />
              </motion.div>
            </div>
            
            <div className="space-y-2">
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-indigo-600 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <p className="text-sm text-center text-gray-600">{message}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingAnimation;