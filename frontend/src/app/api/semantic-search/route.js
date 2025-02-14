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
    // Log request
    console.log('Received search request');
    
    // Parse request body with error handling
    let query;
    try {
      const body = await request.json();
      query = body.query;
      console.log('Search query:', query);
    } catch (error) {
      console.error('Failed to parse request body:', error);
      return Response.json(
        { error: 'Invalid request body', details: error.message },
        { status: 400 }
      );
    }

    if (!query) {
      return Response.json(
        { error: 'Missing query parameter' },
        { status: 400 }
      );
    }

    // Get videos with error handling
    let videos;
    try {
      videos = await getVideos();
      console.log(`Retrieved ${videos.length} videos`);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
      return Response.json(
        { error: 'Failed to fetch videos', details: error.message },
        { status: 500 }
      );
    }

    const userPrompt = `You are a video archive assistant. Given the following search query and video list, determine which videos are most relevant and explain why.
    
    Search Query: "${query}"
    
    Available Videos:
    ${JSON.stringify(videos, null, 2)}
    
    Please return your analysis in the following JSON format, ensuring the response is strictly valid JSON:
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
    }
    
    Important: Ensure your response is only the JSON object, with no additional text before or after.`;

    console.log('Sending request to Bedrock');
    
    // Send request to Bedrock with error handling
    let bedrockResponse;
    try {
      bedrockResponse = await bedrockClient.send(new InvokeModelCommand({
        modelId: "us.anthropic.claude-3-5-sonnet-20241022-v2:0",
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
          anthropic_version: "bedrock-2023-05-31",
          max_tokens: 1024,
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
      console.log('Received response from Bedrock');
    } catch (error) {
      console.error('Bedrock API error:', error);
      // Log additional error details if available
      if (error.message) console.error('Error message:', error.message);
      if (error.$metadata) console.error('Error metadata:', error.$metadata);
      return Response.json(
        { error: 'Bedrock API error', details: error.message },
        { status: 500 }
      );
    }

    // Parse Claude's response with error handling
    let responseBody, analysisText, analysis;
    try {
      responseBody = JSON.parse(new TextDecoder().decode(bedrockResponse.body));
      console.log('Parsed response body');
      
      analysisText = responseBody.content[0].text.trim();
      console.log('Raw analysis text:', analysisText);
      
      // Handle potential markdown code blocks
      const jsonStr = analysisText.replace(/```json\n?|\n?```/g, '').trim();
      
      analysis = JSON.parse(jsonStr);
      console.log('Successfully parsed analysis JSON');
    } catch (error) {
      console.error('Failed to parse Claude response:', error);
      console.error('Raw response:', bedrockResponse.body);
      return Response.json(
        { error: 'Failed to parse model response', details: error.message },
        { status: 500 }
      );
    }

    // Validate response structure
    if (!analysis.matches || !Array.isArray(analysis.matches)) {
      console.error('Invalid response structure:', analysis);
      return Response.json(
        { error: 'Invalid response structure from model' },
        { status: 500 }
      );
    }

    // Match videos
    const matchedVideos = analysis.matches
      .map(match => {
        const video = videos.find(v => v.id === match.videoId);
        if (!video) {
          console.warn(`No matching video found for ID: ${match.videoId}`);
          return null;
        }
        return {
          ...video,
          confidence: match.confidence,
          relevance_explanation: match.relevance_explanation
        };
      })
      .filter(Boolean);

    console.log(`Found ${matchedVideos.length} matching videos`);

    return Response.json({
      videos: matchedVideos,
      metadata: {
        analysis: analysis.analysis,
        suggestedTags: analysis.suggestedTags,
        searchContext: analysis.searchContext,
        totalResults: matchedVideos.length,
        searchTime: 5.67,
        model: "claude-3"
      }
    });

  } catch (error) {
    console.error('Unhandled error in semantic search:', error);
    // Log the full error stack
    if (error.stack) console.error('Error stack:', error.stack);
    return Response.json(
      { 
        error: 'Failed to process semantic search', 
        details: error.message,
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    );
  }
}