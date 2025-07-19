/**
 * Service for handling virtual try-on API calls
 */

export interface TryOnResponse {
  imageUrl: string;
}

/**
 * Calls the backend try-on API with portrait and clothing images
 * @param portraitFile - The full-body portrait image file
 * @param clothingFile - The clothing image file
 * @returns Promise resolving to the composite image URL
 */
export async function tryOnPortrait(
  portraitFile: File,
  clothingFile: File
): Promise<TryOnResponse> {
  // Validate file types
  if (!portraitFile.type.startsWith('image/')) {
    throw new Error('Portrait must be an image file');
  }
  
  if (!clothingFile.type.startsWith('image/')) {
    throw new Error('Clothing must be an image file');
  }

  // Create form data for multipart upload
  const formData = new FormData();
  formData.append('portrait', portraitFile);
  formData.append('clothing', clothingFile);

  try {
    const response = await fetch('/api/try-on', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Server error: ${response.status}`);
    }

    const result: TryOnResponse = await response.json();
    
    if (!result.imageUrl) {
      throw new Error('Invalid response: missing image URL');
    }

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred');
  }
}