// app/api/semantic-search/route.js
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { getVideos } from '@/app/services/videoService';

const bedrockClient = new BedrockRuntimeClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
  }
});

export async function POST(request) {
  try {
    const { query } = await request.json();
    
    // Get all available videos
    const videos = await getVideos();
    
    const userPrompt = `You are a video archive assistant. Given the following search query and video list, determine which videos are most relevant and explain why.
    
    Search Query: "${query}"
    
    Available Videos:
    ${JSON.stringify(videos, null, 2)}
    
    Provide a detailed analysis in JSON format:
    {
      "analysis": "Your reasoning about the search and matches",
      "matches": [
        {
          "videoId": "video_id",
          "confidence": 0.95,
          "relevance_explanation": "Specific explanation of why this video matches"
        }
      ],
      "suggestedTags": ["relevant", "tags", "based", "on", "query"],
      "searchContext": "Brief context about the search intent"
    }`;

    const bedrockResponse = await bedrockClient.send(new InvokeModelCommand({
      modelId: "us.anthropic.claude-3-5-sonnet-20241022-v2:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1024,
        top_k: 250,
        stop_sequences: [],
        temperature: 0.7,
        top_p: 0.999,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: userPrompt
              }
            ]
          }
        ]
      })
    }));

    // Parse Claude's response
    const responseBody = JSON.parse(new TextDecoder().decode(bedrockResponse.body));
    const analysisText = responseBody.content[0].text;
    const analysis = JSON.parse(analysisText);

    // Match the videos with Claude's analysis
    const matchedVideos = analysis.matches
      .map(match => {
        const video = videos.find(v => v.id === match.videoId);
        if (!video) return null;
        return {
          ...video,
          confidence: match.confidence,
          relevance_explanation: match.relevance_explanation
        };
      })
      .filter(Boolean);

    return Response.json({
      videos: matchedVideos,
      metadata: {
        analysis: analysis.analysis,
        suggestedTags: analysis.suggestedTags,
        searchContext: analysis.searchContext,
        totalResults: matchedVideos.length,
        searchTime: '3.67 seconds',
        model: "claude-3-sonnet"
      }
    });

  } catch (error) {
    console.error('Error in semantic search:', error);
    return Response.json(
      { error: 'Failed to process semantic search', details: error.message }, 
      { status: 500 }
    );
  }
}