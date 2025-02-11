// components/VideoIngestionCard.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader, Sparkles, Brain, Film, Database } from 'lucide-react';

const VideoIngestionCard = ({ videoName, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  const stages = [
    {
      title: "Digitizing Film",
      icon: Film,
      color: "text-blue-500",
      description: "Converting analog footage...",
      duration: 2000
    },
    {
      title: "AI Analysis",
      icon: Brain,
      color: "text-purple-500",
      description: "Processing with Rekognition...",
      duration: 2000
    },
    {
      title: "Metadata Generation",
      icon: Database,
      color: "text-indigo-500",
      description: "Creating semantic index...",
      duration: 2000
    },
    {
      title: "Archive Integration",
      icon: Sparkles,
      color: "text-green-500",
      description: "Adding to digital archive...",
      duration: 2000
    }
  ];

  useEffect(() => {
    const totalDuration = 8000; // 8 seconds
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete?.();
          return 100;
        }
        return prev + (100 / (totalDuration / 80)); // Adjust increment for smooth 8-second animation
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setStage(Math.min(Math.floor((progress / 100) * stages.length), stages.length - 1));
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 h-full"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{videoName}</h3>
            <p className="text-sm text-gray-500">Historical Archive Ingestion</p>
          </div>
          <motion.div
            animate={{
              scale: progress === 100 ? [1, 1.2, 1] : 1,
              rotate: progress === 100 ? [0, 360] : 0
            }}
            transition={{ duration: 0.5 }}
          >
            {progress === 100 ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <Loader className="w-6 h-6 text-indigo-500 animate-spin" />
            )}
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{Math.round(progress)}% Complete</span>
            <span>{progress === 100 ? "Done" : "Processing..."}</span>
          </div>
        </div>

        {/* Stages */}
        <div className="space-y-3">
          {stages.map((s, index) => {
            const isActive = index === stage;
            const isComplete = index < stage;
            const Icon = s.icon;

            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isActive || isComplete ? 1 : 0.5,
                  x: 0,
                  scale: isActive ? 1.02 : 1
                }}
                className={`flex items-center space-x-3 p-2 rounded-lg ${
                  isActive ? 'bg-gray-50' : ''
                }`}
              >
                <motion.div
                  animate={{
                    rotate: isActive ? [0, 360] : 0,
                    scale: isActive ? [1, 1.1, 1] : 1
                  }}
                  transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                  className={`${s.color} ${isComplete ? 'opacity-50' : ''}`}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${
                      isActive ? 'text-gray-900' : 'text-gray-600'
                    }`}>
                      {s.title}
                    </span>
                    {isComplete && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </motion.div>
                    )}
                  </div>
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-gray-500 mt-1"
                    >
                      {s.description}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default VideoIngestionCard;