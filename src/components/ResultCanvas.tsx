import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResultCanvasProps {
  imageUrl: string;
}

export const ResultCanvas: React.FC<ResultCanvasProps> = ({ imageUrl }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `try-on-result-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-center text-foreground">
        Your Try-On Result
      </h2>
      
      <div className="bg-card rounded-2xl shadow-lg p-4 max-w-2xl mx-auto">
        <img
          src={imageUrl}
          alt="Virtual try-on result"
          className="w-full h-auto rounded-lg"
          style={{ maxHeight: '70vh', objectFit: 'contain' }}
        />
        
        <div className="mt-4 flex justify-center">
          <Button
            onClick={handleDownload}
            variant="outline"
            className="px-6 py-2 rounded-full font-semibold"
            aria-label="Download try-on result"
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};