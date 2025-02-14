// src/app/services/videoGenerationService.js
export async function generateVideo(prompt) {
  console.log('Service: Starting video generation');
  try {
    console.log('Service: Making API request');
    const response = await fetch('/api/video-generation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt })
    });

    console.log('Service: Received response', {
      status: response.status,
      ok: response.ok
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Service: Error data', errorData);
      throw new Error(errorData.error || 'Video generation failed');
    }
    
    const data = await response.json();
    console.log('Service: Successful response', data);
    return data;

  } catch (error) {
    console.error('Service: Error details:', {
      message: error.message,
      stack: error.stack
    });
    throw error;
  }
}