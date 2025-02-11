// videoMetadata.js
export const VIDEO_METADATA = {
    'River.mp4': {
      title: 'Native American River Traditions (1978)',
      description: 'Rare documentary footage capturing indigenous life along the Columbia River. Shot on 16mm film as part of the Cultural Heritage Preservation Project.',
      type: 'Cultural Documentary',
      duration: '15:30',
      thumbnailSrc: '/video_images/v1.jpg',
      metadata: {
        date: '1978-06-15',
        format: '16mm Film',
        tags: ['indigenous', 'cultural heritage', 'traditional practices', '1970s'],
        processedBy: {
          bedrock: true,
          rekognition: true,
          translate: true
        },
        aiAnalysis: {
          averageConfidence: 0.92,
          detectedObjects: [
            'River', 'Boat', 'People', 'Fish', 'Traditional Tools'
          ],
          preservation: 'Digitized from original 16mm film reels'
        }
      }
    },
  
    'Arctic_Ice.mp4': {
      title: 'Arctic Expedition Documentary (1983)',
      description: 'Groundbreaking footage from the International Arctic Research expedition, captured on Betacam. One of the earliest comprehensive studies of polar ice conditions.',
      type: 'Scientific Documentary',
      duration: '12:45',
      thumbnailSrc: '/video_images/arctic_ice.jpg',
      metadata: {
        date: '1983-03-15',
        format: 'Betacam',
        tags: ['arctic', 'scientific research', '1980s', 'climate studies'],
        processedBy: {
          bedrock: true,
          rekognition: true,
          translate: true
        },
        aiAnalysis: {
          averageConfidence: 0.95,
          detectedObjects: [
            'Ice', 'Snow', 'Research Equipment', 'Scientists', 'Research Station'
          ],
          preservation: 'Restored from original Betacam tapes'
        }
      }
    },
  
    'Factory.mp4': {
      title: 'American Industrial Revolution (1975)',
      description: 'Inside look at automotive manufacturing during the height of American industrial production. Shot on U-matic video for educational broadcast.',
      type: 'Industrial Documentary',
      duration: '18:20',
      thumbnailSrc: '/video_images/factory.jpg',
      metadata: {
        date: '1975-09-20',
        format: 'U-matic',
        tags: ['manufacturing', 'industry', '1970s', 'automotive'],
        processedBy: {
          bedrock: true,
          rekognition: true,
          translate: true
        },
        aiAnalysis: {
          averageConfidence: 0.98,
          detectedObjects: [
            'Assembly Line', 'Factory Workers', 'Machinery', 'Vehicles'
          ],
          preservation: 'Digitized from U-matic master tape'
        }
      }
    },
  
    'Polar_Bears.mp4': {
      title: 'Wildlife of the Arctic (1979)',
      description: 'Award-winning nature documentary featuring unprecedented polar bear footage. Originally broadcast as part of the "World of Nature" series.',
      type: 'Wildlife Documentary',
      duration: '20:15',
      thumbnailSrc: '/video_images/polar_bears.jpg',
      metadata: {
        date: '1979-11-30',
        format: '16mm Film',
        tags: ['wildlife', 'arctic', '1970s', 'nature documentary'],
        processedBy: {
          bedrock: true,
          rekognition: true,
          translate: true
        },
        aiAnalysis: {
          averageConfidence: 0.96,
          detectedObjects: [
            'Polar Bear', 'Arctic Landscape', 'Snow', 'Ice Floes'
          ],
          preservation: 'Restored from original 16mm film prints'
        }
      }
    }
  };
  