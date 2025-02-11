// app/api/videos/route.js
import { NextResponse } from 'next/server';
import { getVideos } from '@/app/services/videoService';

const TRIGGER_VIDEO = 'Arctic_Ice.mp4';

export async function GET() {
  try {
    const allVideos = await getVideos();
    
    // Separate the trigger video from the rest
    const triggerVideo = allVideos.find(video => video.id === TRIGGER_VIDEO);
    const otherVideos = allVideos.filter(video => video.id !== TRIGGER_VIDEO);
    
    return NextResponse.json({ 
      videos: otherVideos,
      processingVideo: triggerVideo ? {
        id: 'Arctic_Ice.mp4',
        title: "Arctic Ice Footage",
        description: "Dramatic footage of Arctic ice sheets showing the impact of climate change. Time-lapse sequences reveal seasonal changes and the increasing rate of ice melt in the polar regions.",
        type: "Environmental Documentary",
        duration: "12:45",
        thumbnailSrc: triggerVideo.thumbnailSrc || "/video_images/arctic_ice.jpg",
        url: triggerVideo.url,
        metadata: {
          date: '2024-01-15',
          format: '4K',
          tags: [
            'arctic',
            'climate change',
            'ice sheets',
            'global warming',
            'environment',
            'time-lapse'
          ],
          processedBy: {
            bedrock: true,
            rekognition: true,
            translate: true
          },
          aiAnalysis: {
            averageConfidence: 0.95,
            detectedObjects: [
              'Ice',
              'Snow',
              'Water',
              'Sky',
              'Glacier',
              'Ocean',
              'Icebergs'
            ],
            climateData: {
              temperatureChange: '+2.1°C',
              iceReduction: '15% annually'
            },
            locations: ['Svalbard', 'Arctic Circle'],
            conditions: ['Polar Day', 'Extreme Cold'],
            equipment: ['Aerial Drone', 'Time-lapse Camera'],
            significance: 'Critical climate change documentation'
          },
          technical: {
            resolution: '4096x2160',
            frameRate: '60fps',
            codec: 'H.265/HEVC',
            bitrate: '85 Mbps'
          },
          conservation: {
            status: 'Urgent',
            relevance: 'High',
            scientificValue: 'Significant'
          }
        }
      } : null
    });
  } catch (error) {
    console.error('Error in video API:', error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}