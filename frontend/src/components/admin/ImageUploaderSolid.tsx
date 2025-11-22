import { motion } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { Badge } from "@/components/ui/badge";

type ImageUploaderSolidProps = {
  className?: string;
  onImageChange: (file: File | null) => void;
  initialImageUrl?: string | null;
  imageType?: 'existing' | 'new';
  onRemove?: () => void;
  disabled?: boolean;
}

const ImageUploaderSolid = ({
  className = "",
  onImageChange,
  initialImageUrl = null,
  imageType,
  onRemove,
  disabled = false,
}: ImageUploaderSolidProps) => {

  const [uploadedImage, setUploadedImage] = useState<string | null>(initialImageUrl);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setUploadedImage(initialImageUrl);
  }, [initialImageUrl]);

  const handleClick = () => {
    if (!disabled && !uploadedImage) {
      fileInputRef.current?.click();
    }
  };

  const handleFile = (file: File) => {
    if (disabled) return;
    const fileURL = URL.createObjectURL(file);
    setUploadedImage(fileURL);
    onImageChange(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    } else {
      setUploadedImage(null);
      onImageChange(null);
    }
  };

  return (
    <motion.div
      className={`w-auto h-80 rounded-xl min-w-28 flex bg-cardBackground flex-col ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} justify-center items-center relative overflow-hidden ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      animate={{ scale: isDragging && !disabled ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
      style={{
        backgroundImage: uploadedImage ? `url(${uploadedImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        disabled={disabled}
      />
      {!uploadedImage && (
        <>
          <FaCloudUploadAlt className="w-16 h-16 text-mediumGray" />
          <p className="font-poppins text-xl mt-2 text-mediumGray">Upload your</p>
          <p className="font-poppins text-xl mt-2 text-mediumGray">Image</p>
        </>
      )}
      {uploadedImage && (
        <>
          {imageType && (
            <Badge
              className="absolute top-2 left-2 z-10"
              variant={imageType === 'existing' ? 'default' : 'secondary'}
            >
              {imageType === 'existing' ? 'EXISTING' : 'NEW'}
            </Badge>
          )}
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 transition-all z-10"
            title="Remove image"
            type="button"
          >
            <MdClose className="w-5 h-5" />
          </button>
        </>
      )}
    </motion.div>
  );
};

export default ImageUploaderSolid;
