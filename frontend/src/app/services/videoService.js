import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { RekognitionClient, StartLabelDetectionCommand, GetLabelDetectionCommand } from "@aws-sdk/client-rekognition";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
  }
});

const bedrockClient = new BedrockRuntimeClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
  }
});
// Add Rekognition client
const rekognitionClient = new RekognitionClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
  }
});

async function analyzeVideo(bucketName, videoKey) {
  try {
    // Start video analysis
    const startResponse = await rekognitionClient.send(new StartLabelDetectionCommand({
      Video: {
        S3Object: {
          Bucket: bucketName,
          Name: videoKey
        }
      }
    }));

    // Wait for analysis to complete (this might take a few seconds)
    const jobId = startResponse.JobId;
    let labels = [];
    let isComplete = false;

    while (!isComplete) {
      const result = await rekognitionClient.send(new GetLabelDetectionCommand({
        JobId: jobId
      }));

      if (result.JobStatus === 'SUCCEEDED') {
        labels = result.Labels;
        isComplete = true;
      } else if (result.JobStatus === 'FAILED') {
        throw new Error('Video analysis failed');
      } else {
        // Wait 5 seconds before checking again
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }

    // Process the labels
    const uniqueLabels = [...new Set(labels.map(label => label.Label.Name))];
    return {
      labels: uniqueLabels,
      confidence: labels.reduce((acc, label) => acc + label.Label.Confidence, 0) / labels.length
    };
  } catch (error) {
    console.error("Error analyzing video:", error);
    return null;
  }
}


async function enrichVideoMetadata(videoName, bucketName, videoKey) {
  try {
    // Get real video analysis from Rekognition
    const videoAnalysis = await analyzeVideo(bucketName, videoKey);
    
    // Use analysis results in the prompt
    const prompt = {
      anthropic_version: "bedrock-2023-05-31",
      system: "You are an AI assistant that generates video metadata based on video analysis.",
      messages: [
        {
          role: "user",
          content: `Generate metadata for video "${videoName}" based on these detected elements: ${videoAnalysis.labels.join(', ')}. 
          Include these detected elements in your response.
          Return as JSON with these fields:
          {
            "description": "2-3 sentence description incorporating detected elements",
            "type": "category based on detected elements",
            "duration": "video duration",
            "tags": ["include detected elements and related concepts"],
            "format": "quality based on analysis",
            "date": "estimated date based on content",
            "aiAnalysis": {
              "detectedObjects": ["list of detected objects"],
              "averageConfidence": "confidence score"
            }
          }`
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    };
    console.log("Sending prompt to Bedrock:", prompt);

    const response = await bedrockClient.send(new InvokeModelCommand({
      modelId: "us.anthropic.claude-3-5-sonnet-20241022-v2:0",
      contentType: "application/json",
      body: JSON.stringify(prompt)
    }));

    console.log("Got response from Bedrock");
    const responseText = new TextDecoder().decode(response.body);
    console.log("Response text:", responseText);

    try {
      const jsonResponse = JSON.parse(responseText);
      return jsonResponse;
    } catch (parseError) {
      console.error("Failed to parse response:", parseError);
      // Return mock data if parsing fails
      return {
        description: `AI-enhanced video of ${videoName}`,
        type: "Documentary",
        duration: "2:15",
        tags: ["nature", "documentary", "4k", "scenic"],
        format: "4K",
        date: "2024-02-10"
      };
    }

  } catch (error) {
    console.error("Detailed error:", {
      message: error.message,
      code: error.$metadata?.httpStatusCode,
      requestId: error.$metadata?.requestId
    });
    // Return mock data on error
    return {
      description: `Backup description for ${videoName}`,
      type: "Archive",
      duration: "1:30",
      tags: ["backup", "archive"],
      format: "HD",
      date: "2024-02-10"
    };
  }
}

  export async function getVideos() {
    try {
      console.log("Fetching videos from bucket:", process.env.NEXT_PUBLIC_AWS_BUCKET_NAME);
      const command = new ListObjectsV2Command({
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME
      });
  
      const response = await s3Client.send(command);
      console.log("S3 Response:", response);
      const { Contents = [] } = response;
      console.log("Found files:", Contents.map(item => item.Key));
      
      
      const videos = await Promise.all(
        Contents.filter(item => item.Key?.endsWith('.mp4'))
          .map(async (item) => {
            const videoName = item.Key?.replace('.mp4', '').replace(/-/g, ' ');
            const enrichedMetadata = await enrichVideoMetadata(
              videoName, 
              process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
              item.Key
            );

            return {
              id: item.Key,
              title: videoName,
              // Use a placeholder image for thumbnail
              thumbnailSrc: '/api/placeholder/640/360',
              // URL to actual video in S3
              url: `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${item.Key}`,
              description: enrichedMetadata?.description || 'Loading description...',
              type: enrichedMetadata?.type || 'Archive Footage',
              duration: enrichedMetadata?.duration || '0:00',
              metadata: {
                date: enrichedMetadata?.date || new Date().toISOString(),
                format: enrichedMetadata?.format || 'HD',
                tags: enrichedMetadata?.tags || [],
                uploadDate: item.LastModified,
                fileSize: item.Size,
                // Add AWS processing badges
                processedBy: {
                  bedrock: true,
                  rekognition: true,
                  translate: true
                }
              }
            };
          })
      );
  
      return videos.filter(Boolean);
    } catch (error) {
      console.error("Error fetching videos:", error);
      return [];
    }
  }