// src/app/api/video-generation/route.js
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { VIDEO_METADATA } from '@/data/videoMetadata';
import { DEMO_COMPILATIONS } from '@/data/compilations';
import { writeFile } from 'fs/promises';
import path from 'path';

const bedrockClient = new BedrockRuntimeClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
  }
});

const pollyClient = new PollyClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
  }
});

// In your route.js
async function generateVoiceover(compilationId) {
    // Randomly select between version 1 or 2 of the voiceover
    // const version = Math.random() < 0.5 ? '1' : '2';
    return `/voiceovers/${compilationId}.mp3`;
}
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
    
    // Generate voiceover
    const voiceoverPath = await generateVoiceover(compilation.id);
    
    // Get clip metadata for the compilation
    const relevantClips = compilation.requiredClips.map(clip => {
      const filename = typeof clip === 'string' ? clip : clip.filename;
      return {
        ...VIDEO_METADATA[filename],
        relevanceScore: analysis.confidence,
        reason: analysis.reasoning[0]
      };
    });

    return Response.json({
      relevantClips,
      description: analysis.analysis,
      editingNotes: compilation.editingNotes,
      voiceoverScript: compilation.voiceoverScript,
      finalVideo: {
        id: compilation.id,
        title: compilation.title,
        finalVideo: compilation.finalVideo,
        voiceover: voiceoverPath,
        duration: compilation.duration,
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