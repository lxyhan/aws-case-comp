// src/app/api/video-generation/route.js
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { VIDEO_METADATA } from '@/data/videoMetadata';
import { DEMO_COMPILATIONS } from '@/data/compilations';

const bedrockClient = new BedrockRuntimeClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
  }
});

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    
    // Simplified prompt for Claude
    const userPrompt = `Analyze this video creation request and suggest the most relevant approach.
    Request: "${prompt}"
    
    Consider these themes and footage:
    ${JSON.stringify(Object.values(DEMO_COMPILATIONS).map(comp => ({
      theme: comp.title,
      description: comp.description,
      keywords: comp.matchPatterns
    })), null, 2)}
    
    Provide your response in JSON format:
    {
      "analysis": "Your creative direction and reasoning",
      "recommendedTheme": "ARCTIC_RESEARCH, INDUSTRIAL_HERITAGE, or ENVIRONMENTAL_CHANGE",
      "relevantClipTypes": ["List of types of footage that would work well"],
      "confidence": 0.95,
      "reasoning": ["List of reasons why this theme matches"]
    }`;

    const bedrockResponse = await bedrockClient.send(new InvokeModelCommand({
      modelId: "us.anthropic.claude-3-5-sonnet-20241022-v2:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1024,
        temperature: 0.7,
        messages: [{ role: "user", content: [{ type: "text", text: userPrompt }] }]
      })
    }));

    // Parse Claude's response
    const responseBody = JSON.parse(new TextDecoder().decode(bedrockResponse.body));
    const analysis = JSON.parse(responseBody.content[0].text);
    
    // Get the recommended compilation
    const compilation = DEMO_COMPILATIONS[analysis.recommendedTheme] || DEMO_COMPILATIONS.ARCTIC_RESEARCH;
    
    // Get clip metadata for the compilation
    const relevantClips = compilation.requiredClips.map(filename => ({
      ...VIDEO_METADATA[filename],
      relevanceScore: analysis.confidence,
      reason: analysis.reasoning[0] // Use first reason as clip reason
    }));

    return Response.json({
      relevantClips,
      description: analysis.analysis,
      editingNotes: compilation.editingNotes,
      voiceoverScript: compilation.voiceoverScript,
      finalVideo: {
        id: compilation.id,
        finalVideo: compilation.finalVideo,
        isExactMatch: true
      },
      metadata: {
        processingTime: '3.2 seconds',
        model: "claude-3-sonnet",
        confidence: analysis.confidence
      }
    });

  } catch (error) {
    console.error('Error in video generation:', error);
    return Response.json(
      { error: 'Failed to process video generation request' }, 
      { status: 500 }
    );
  }
}