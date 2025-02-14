// src/data/compilations.js
export const DEMO_COMPILATIONS = {
    ARCTIC_RESEARCH: {
      id: 'arctic-research',
      title: 'Arctic Research & Wildlife',
      finalVideo: '/compilations/arctic-research.mp4',
      matchPatterns: ['arctic', 'research', 'wildlife', 'polar', 'climate', 'ice'],
      requiredClips: ['Arctic_Ice.mp4', 'Polar_Bears.mp4'],
      description: 'A comprehensive look at Arctic research and wildlife studies, combining scientific expeditions with natural history.',
      editingNotes: [
        'Opening with research footage establishes scientific context',
        'Transitioning to wildlife footage shows environmental impact',
        'Combined narrative tells complete Arctic story'
      ],
      voiceoverScript: "In the vast Arctic wilderness, scientists and wildlife intersect in a delicate dance of discovery..."
    },
    INDUSTRIAL_HERITAGE: {
      id: 'industrial-heritage',
      title: 'Industrial Progress & Heritage',
      finalVideo: '/compilations/industrial-heritage.mp4',
      matchPatterns: ['industrial', 'factory', 'manufacturing', 'heritage', 'progress'],
      requiredClips: ['Factory.mp4', 'River.mp4'],
      description: 'A powerful contrast between America\'s industrial might and traditional cultural practices.',
      editingNotes: [
        'Factory footage shows technological advancement',
        'River traditions provide cultural perspective',
        'Parallel narratives highlight societal changes'
      ],
      voiceoverScript: "As America's industrial might grew, traditional practices continued along ancient waterways..."
    },
    ENVIRONMENTAL_CHANGE: {
      id: 'environmental-change',
      title: 'Environmental Change Through Time',
      finalVideo: '/compilations/environmental-change.mp4',
      matchPatterns: ['environment', 'change', 'impact', 'conservation', 'nature'],
      requiredClips: ['Arctic_Ice.mp4', 'River.mp4'],
      description: 'Examining environmental changes through the lens of both scientific data and cultural observation.',
      editingNotes: [
        'Arctic footage provides scientific evidence',
        'River footage shows human perspective',
        'Combined narrative emphasizes long-term changes'
      ],
      voiceoverScript: "Through both scientific measurement and generational wisdom, we witness our changing world..."
    }
  };