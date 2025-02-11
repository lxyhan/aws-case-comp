// videoMetadata.js

export const VIDEO_METADATA = {
    'River.mp4': {
      title: 'Indigenous River Life',
      description: 'An immersive journey following indigenous tribe members as they navigate daily life along a remote river in the rainforest. The footage captures traditional activities including canoeing, fishing with spears, and cooking.',
      type: 'Cultural Documentary',
      duration: '15:30',
      thumbnailSrc: '/video_images/v1.jpg',
      metadata: {
        date: '2024-01-20',
        format: 'HD',
        tags: ['indigenous', 'river', 'traditional fishing', 'culture', 'daily life'],
        processedBy: {
          bedrock: true,
          rekognition: true,
          translate: true
        },
        aiAnalysis: {
          averageConfidence: 0.92,
          detectedObjects: [
            'River', 'Boat', 'People', 'Fish', 'Trees', 'Water', 'Traditional Tools'
          ]
        }
      }
    },
  
    'Arctic_Ice.mp4': {
      title: 'Arctic Ice: A Vanishing World',
      description: 'Dramatic footage of Arctic ice sheets showing the impact of climate change. Time-lapse sequences reveal seasonal changes and the increasing rate of ice melt in the polar regions.',
      type: 'Environmental Documentary',
      duration: '12:45',
      thumbnailSrc: '/video_images/arctic_ice.jpg',
      metadata: {
        date: '2024-01-15',
        format: '4K',
        tags: ['arctic', 'climate change', 'ice sheets', 'global warming', 'environment'],
        processedBy: {
          bedrock: true,
          rekognition: true,
          translate: true
        },
        aiAnalysis: {
          averageConfidence: 0.95,
          detectedObjects: [
            'Ice', 'Snow', 'Water', 'Sky', 'Glacier', 'Ocean', 'Icebergs'
          ],
          climateData: {
            temperatureChange: '+2.1°C',
            iceReduction: '15% annually'
          }
        }
      }
    },
  
    'Factory.mp4': {
      title: 'Modern Manufacturing: The Digital Revolution',
      description: 'An inside look at a state-of-the-art manufacturing facility showcasing automation, robotics, and AI-driven production processes. Highlights the intersection of traditional manufacturing and cutting-edge technology.',
      type: 'Industrial Technology',
      duration: '18:20',
      thumbnailSrc: '/video_images/factory.jpg',
      metadata: {
        date: '2024-01-18',
        format: 'HD',
        tags: ['manufacturing', 'automation', 'industry 4.0', 'robotics', 'AI', 'technology'],
        processedBy: {
          bedrock: true,
          rekognition: true,
          translate: true
        },
        aiAnalysis: {
          averageConfidence: 0.98,
          detectedObjects: [
            'Robots', 'Assembly Line', 'Machinery', 'Workers', 'Control Panels', 
            'Computer Screens', 'Manufacturing Equipment'
          ],
          industrialMetrics: {
            automationLevel: 'High',
            productionEfficiency: '94%'
          }
        }
      }
    },
  
    'Polar_Bears.mp4': {
      title: 'Polar Bears: Sentinels of Climate Change',
      description: 'Intimate footage of polar bears in their natural habitat, highlighting their hunting patterns, family dynamics, and the challenges they face due to shrinking ice coverage. Includes rare scenes of cubs learning survival skills.',
      type: 'Wildlife Documentary',
      duration: '20:15',
      thumbnailSrc: '/video_images/polar_bears.jpg',
      metadata: {
        date: '2024-01-22',
        format: '4K',
        tags: ['polar bears', 'arctic wildlife', 'climate change', 'conservation', 'endangered species'],
        processedBy: {
          bedrock: true,
          rekognition: true,
          translate: true
        },
        aiAnalysis: {
          averageConfidence: 0.96,
          detectedObjects: [
            'Polar Bear', 'Snow', 'Ice', 'Arctic Fox', 'Seals', 'Ocean', 'Cubs'
          ],
          wildlifeData: {
            behaviorType: 'Hunting/Nurturing',
            habitatStatus: 'Threatened',
            populationTrend: 'Declining'
          }
        }
      }
    }
  };