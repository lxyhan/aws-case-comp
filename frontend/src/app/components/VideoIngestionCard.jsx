// components/VideoIngestionCard.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Loader } from 'lucide-react';

const VideoIngestionCard = ({ videoName, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  const stages = [
    "Uploading...",
    "Processing with Rekognition...",
    "Generating metadata...",
    "Complete"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete?.();
          return 100;
        }
        return prev + 1;
      });

      setStage(Math.floor((progress / 100) * (stages.length - 1)));
    }, 80);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">{videoName}</h3>
          {progress === 100 ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <Loader className="w-5 h-5 text-indigo-500 animate-spin" />
          )}
        </div>

        <div className="space-y-2">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-indigo-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-xs text-gray-500">
            {stages[stage]}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoIngestionCard;