import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MediaUploader = ({ onImageUpload, uploadedImages = [] }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const imageFiles = files?.filter(file => file?.type?.startsWith('image/'));
    
    imageFiles?.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = {
          id: Date.now() + Math.random(),
          url: e?.target?.result,
          alt: `Uploaded image ${file?.name}`,
          name: file?.name,
          size: file?.size
        };
        onImageUpload(newImage);
      };
      reader?.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (imageId) => {
    onImageUpload(uploadedImages?.filter(img => img?.id !== imageId));
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024)?.toFixed(1) + ' KB';
    return (bytes / (1024 * 1024))?.toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-caption font-medium text-foreground">
        Media Upload
      </label>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-editorial ${
          isDragging
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="Upload" size={24} color="var(--color-primary)" />
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-caption text-foreground">
              Drag and drop images here
            </p>
            <p className="text-xs font-caption text-muted-foreground">
              or click to browse (PNG, JPG, GIF up to 10MB)
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef?.current?.click()}
            type="button"
          >
            Choose Files
          </Button>
        </div>
      </div>
      {uploadedImages?.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-caption font-medium text-foreground">
            Uploaded Images ({uploadedImages?.length})
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {uploadedImages?.map((image) => (
              <div
                key={image?.id}
                className="relative group bg-muted rounded-lg overflow-hidden border border-border"
              >
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={image?.url}
                    alt={image?.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-3 space-y-1">
                  <p className="text-sm font-caption text-foreground truncate">
                    {image?.name}
                  </p>
                  <p className="text-xs font-caption text-muted-foreground">
                    {formatFileSize(image?.size)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveImage(image?.id)}
                  className="absolute top-2 right-2 p-1.5 bg-error text-error-foreground rounded-md opacity-0 group-hover:opacity-100 transition-editorial"
                  aria-label="Remove image"
                >
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaUploader;