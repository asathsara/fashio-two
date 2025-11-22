import { useState, useRef, useEffect } from "react";

export const useImageUpload = (
  initialImageUrl: string | null,
  disabled: boolean,
  onImageChange: (file: File | null) => void
) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(initialImageUrl);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setUploadedImage(initialImageUrl);
  }, [initialImageUrl]);

  const handleFile = (file: File) => {
    if (disabled) return;
    const fileURL = URL.createObjectURL(file);
    setUploadedImage(fileURL);
    onImageChange(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const triggerFileSelect = () => {
    if (!disabled && !uploadedImage) fileInputRef.current?.click();
  };

  const removeImage = () => {
    setUploadedImage(null);
    onImageChange(null);
  };

  return {
    uploadedImage,
    isDragging,
    fileInputRef,
    handleFileChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    triggerFileSelect,
    removeImage,
  };
};
