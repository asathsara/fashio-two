import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";

type ImageUploaderSolidProps = {
  className?: string;
  onImageChange: (file: File | null) => void;
}

const ImageUploaderSolid = ({
  className = "",
  onImageChange,
}: ImageUploaderSolidProps) => {
  
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => fileInputRef.current?.click();

  const handleFile = (file: File) => {
    const fileURL = URL.createObjectURL(file);
    setUploadedImage(fileURL);
    onImageChange(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    onImageChange(null);
  };

  return (
    <motion.div
      className={`w-auto h-80 rounded-xl min-w-28 flex bg-cardBackground flex-col cursor-pointer justify-center items-center relative overflow-hidden ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={!uploadedImage ? handleClick : undefined}
      animate={{ scale: isDragging ? 1.1 : 1 }}
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
      />
      {!uploadedImage && (
        <>
          <FaCloudUploadAlt className="w-16 h-16 text-mediumGray" />
          <p className="font-poppins text-xl mt-2 text-mediumGray">Upload your</p>
          <p className="font-poppins text-xl mt-2 text-mediumGray">Image</p>
        </>
      )}
      {uploadedImage && (
        <button
          onClick={handleRemoveImage}
          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center"
          title="Remove image"
        >
          <MdClose className="w-5 h-5" />
        </button>
      )}
    </motion.div>
  );
};

export default ImageUploaderSolid;
