// videoMetadata.js
export const VIDEO_METADATA = {
  
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
        },
        translations: {
          en: {
            language: 'English',
            transcription: [
              { time: '0:00', text: 'The vast Arctic landscape stretches before us...' },
              { time: '0:15', text: 'Our research team arrived during the spring thaw...' },
              { time: '0:30', text: 'These ice core samples reveal remarkable data...' }
            ]
          },
          fr: {
            language: 'Français',
            transcription: [
              { time: '0:00', text: 'Le vaste paysage arctique s\'étend devant nous...' },
              { time: '0:15', text: 'Notre équipe de recherche est arrivée pendant le dégel printanier...' },
              { time: '0:30', text: 'Ces échantillons de carottes de glace révèlent des données remarquables...' }
            ]
          },
          kr: {
            language: '한국어',
            transcription: [
              { time: '0:00', text: '광활한 북극 풍경이 우리 앞에 펼쳐져 있습니다...' },
              { time: '0:15', text: '우리 연구팀은 봄철 해빙기에 도착했습니다...' },
              { time: '0:30', text: '이 얼음 코어 샘플은 놀라운 데이터를 보여줍니다...' }
            ]
          }
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
  