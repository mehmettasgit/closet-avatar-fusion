import React from 'react';
import { Header } from '@/components/Header';
import { PhotoUploader } from '@/components/PhotoUploader';
import { ClothingUploader } from '@/components/ClothingUploader';
import { TryOnButton } from '@/components/TryOnButton';
import { ResultCanvas } from '@/components/ResultCanvas';
import { ErrorBanner } from '@/components/ErrorBanner';
import { useTryOn } from '@/hooks/useTryOn';

const TryOn = () => {
  const {
    portraitFile,
    clothingFile,
    resultUrl,
    loading,
    error,
    setPortraitFile,
    setClothingFile,
    handleTryOn,
    clearError
  } = useTryOn();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Error Banner */}
        {error && (
          <ErrorBanner message={error} onClose={clearError} />
        )}

        {/* Upload Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <PhotoUploader
            file={portraitFile}
            onFileSelect={setPortraitFile}
            disabled={loading}
          />
          <ClothingUploader
            file={clothingFile}
            onFileSelect={setClothingFile}
            disabled={loading}
          />
        </div>

        {/* Try-On Button */}
        <div className="flex justify-center mb-8">
          <TryOnButton
            onTryOn={handleTryOn}
            disabled={!portraitFile || !clothingFile || loading}
            loading={loading}
          />
        </div>

        {/* Result Canvas */}
        {resultUrl && (
          <ResultCanvas imageUrl={resultUrl} />
        )}
      </main>
    </div>
  );
};

export default TryOn;