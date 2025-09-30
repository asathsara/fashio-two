import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const ImageUploaderSolid = ({ className, onImageChange, resetTrigger }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setUploadedImage(null)
  }, [resetTrigger])
  

  const handleClick = () => {
    fileInputRef.current?.click(); // Trigger file input click
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setUploadedImage(fileURL); // Store the image locally
      onImageChange(file); // Inform parent of the change
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setUploadedImage(fileURL); // Store the image locally
      onImageChange(file); // Inform parent of the change
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null); // Clear the image
    onImageChange(null); // Inform parent of the removal
  };

  return (
    <motion.div
      className={`w-auto h-80 rounded-xl min-w-28 flex bg-cardBackground flex-col cursor-pointer justify-center items-center relative overflow-hidden ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={!uploadedImage ? handleClick : undefined} // Disable click when image is uploaded
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
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }} // Hide the input
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
