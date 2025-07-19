import React, { useRef } from 'react';
import { Upload, Shirt } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClothingUploaderProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export const ClothingUploader: React.FC<ClothingUploaderProps> = ({
  file,
  onFileSelect,
  disabled = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      onFileSelect(droppedFile);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <label htmlFor="clothing-upload" className="block text-sm font-medium text-foreground">
        Upload clothing image
      </label>
      
      <div
        className={cn(
          "relative rounded-2xl shadow-lg p-4 border-2 border-dashed transition-colors cursor-pointer",
          "hover:border-primary/50 hover:bg-accent/50",
          disabled && "opacity-50 cursor-not-allowed",
          file ? "border-primary bg-accent/30" : "border-border bg-card"
        )}
        onClick={!disabled ? handleClick : undefined}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload clothing image"
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            handleClick();
          }
        }}
      >
        <input
          ref={fileInputRef}
          id="clothing-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
          aria-label="Clothing image file input"
        />
        
        {file ? (
          <div className="text-center">
            <img
              src={URL.createObjectURL(file)}
              alt="Clothing preview"
              className="mx-auto max-h-48 rounded-lg object-cover"
            />
            <p className="mt-2 text-sm text-muted-foreground">{file.name}</p>
          </div>
        ) : (
          <div className="text-center py-8">
            <Shirt className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <div className="flex items-center justify-center gap-2 mb-2">
              <Upload className="h-4 w-4" />
              <span className="text-sm font-medium">Upload clothing image</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Drag and drop or click to select
            </p>
          </div>
        )}
      </div>
    </div>
  );
};