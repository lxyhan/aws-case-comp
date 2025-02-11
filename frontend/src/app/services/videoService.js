import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { VIDEO_METADATA } from '../../data/videoMetadata';

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
  }
});


export async function getVideos() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME
    });

    const response = await s3Client.send(command);
    const { Contents = [] } = response;
    
    return Contents.filter(item => item.Key?.endsWith('.mp4'))
      .map(item => {
        // Get the pre-written metadata or create default
        const mockData = VIDEO_METADATA[item.Key] || {
          title: item.Key.replace('.mp4', '').replace(/-/g, ' '),
          description: 'Video description',
          type: 'Documentary',
          duration: '10:00',
          thumbnailSrc: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=640&h=360&fit=crop', // Generic video placeholder
          metadata: {
            date: new Date().toISOString(),
            format: 'HD',
            tags: ['documentary'],
            processedBy: {
              bedrock: true,
              rekognition: true,
              translate: true
            },
            aiAnalysis: {
              averageConfidence: 0.85,
              detectedObjects: []
            }
          }
        };

        return {
          id: item.Key,
          title: mockData.title,
          description: mockData.description,
          type: mockData.type,
          duration: mockData.duration,
          url: `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${item.Key}`,
          thumbnailSrc: mockData.thumbnailSrc,
          metadata: mockData.metadata
        };
      });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}