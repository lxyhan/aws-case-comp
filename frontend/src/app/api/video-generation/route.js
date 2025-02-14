// app/api/video-generation/route.js
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { VIDEO_METADATA } from '@/data/videoMetadata';

const bedrockClient = new BedrockRuntimeClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
  }
});

const DEMO_COMPILATIONS = {
  ARCTIC: {
    id: 'arctic-compilation',
    finalVideo: '/compilations/arctic-research.mp4',
    requiredClips: ['Arctic_Ice.mp4', 'Polar_Bears.mp4'],
    description: 'A comprehensive look at Arctic research and wildlife studies',
    editingNotes: [
      'Opening with research footage establishes scientific context',
      'Transitioning to wildlife footage shows environmental impact',
      'Combined narrative tells complete Arctic story'
    ],
    voiceoverScript: "In the vast Arctic wilderness, scientists and wildlife intersect..."
  },
  INDUSTRIAL: {
    id: 'industrial-compilation',
    finalVideo: '/compilations/industrial-heritage.mp4',
    requiredClips: ['Factory.mp4', 'River.mp4'],
    description: 'Contrasting industrial progress with traditional practices',
    editingNotes: [
      'Factory footage shows technological advancement',
      'River traditions provide cultural perspective',
      'Parallel narratives highlight societal changes'
    ],
    voiceoverScript: "As America's industrial might grew, traditional practices continued..."
  }
};

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    
    const userPrompt = `You are a video editor. Given this request and available footage, suggest how to create a compelling video.

    Request: "${prompt}"
    
    Available Archive Footage:
    ${JSON.stringify(VIDEO_METADATA, null, 2)}
    
    Provide your response in JSON format:
    {
      "analysis": "Your creative direction and reasoning",
      "selectedClips": [
        {
          "filename": "video_filename.mp4",
          "relevanceScore": 0.95,
          "editingNotes": "How this clip should be used"
        }
      ],
      "voiceoverScript": "Suggested narration script",
      "technicalNotes": ["Editing and technical considerations"],
      "thematicApproach": "Overall creative approach"
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

    // Find matching compilation
    const selectedFilenames = analysis.selectedClips.map(clip => clip.filename);
    const matchingCompilation = Object.entries(DEMO_COMPILATIONS).find(([_, comp]) => 
      comp.requiredClips.every(clip => selectedFilenames.includes(clip))
    );

    // Use matching compilation or default
    const finalVideoData = matchingCompilation 
      ? {
          ...DEMO_COMPILATIONS[matchingCompilation[0]],
          isExactMatch: true
        }
      : {
          ...DEMO_COMPILATIONS.ARCTIC,
          isExactMatch: false
        };

    // Return complete response
    return Response.json({
      relevantClips: analysis.selectedClips.map(clip => ({
        ...VIDEO_METADATA[clip.filename],
        relevanceScore: clip.relevanceScore,
        editingNotes: clip.editingNotes
      })),
      description: analysis.analysis,
      editingNotes: analysis.technicalNotes,
      voiceoverScript: analysis.voiceoverScript,
      finalVideo: {
        id: finalVideoData.id,
        finalVideo: finalVideoData.finalVideo,
        isExactMatch: finalVideoData.isExactMatch
      },
      metadata: {
        processingTime: '3.2 seconds',
        model: "claude-3-sonnet",
        thematicApproach: analysis.thematicApproach,
        confidence: Math.max(...analysis.selectedClips.map(clip => clip.relevanceScore))
      }
    });

  } catch (error) {
    console.error('Error in video generation:', error);
    return Response.json(
      { error: 'Failed to process video generation request', details: error.message }, 
      { status: 500 }
    );
  }
}