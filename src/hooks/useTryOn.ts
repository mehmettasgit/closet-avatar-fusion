import { useState, useCallback } from 'react';
import { tryOnPortrait } from '@/services/tryOnService';

/**
 * Custom hook for managing virtual try-on state and logic
 */
export const useTryOn = () => {
  const [portraitFile, setPortraitFile] = useState<File | null>(null);
  const [clothingFile, setClothingFile] = useState<File | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles the try-on process by calling the API
   */
  const handleTryOn = useCallback(async () => {
    if (!portraitFile || !clothingFile) {
      setError('Please upload both portrait and clothing images');
      return;
    }

    setLoading(true);
    setError(null);
    setResultUrl(null);

    try {
      const result = await tryOnPortrait(portraitFile, clothingFile);
      setResultUrl(result.imageUrl);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [portraitFile, clothingFile]);

  /**
   * Clears any error messages
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Updates the portrait file and clears any existing results/errors
   */
  const handleSetPortraitFile = useCallback((file: File) => {
    setPortraitFile(file);
    setError(null);
    setResultUrl(null);
  }, []);

  /**
   * Updates the clothing file and clears any existing results/errors
   */
  const handleSetClothingFile = useCallback((file: File) => {
    setClothingFile(file);
    setError(null);
    setResultUrl(null);
  }, []);

  return {
    // State
    portraitFile,
    clothingFile,
    resultUrl,
    loading,
    error,
    
    // Actions
    setPortraitFile: handleSetPortraitFile,
    setClothingFile: handleSetClothingFile,
    handleTryOn,
    clearError,
  };
};