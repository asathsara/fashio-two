import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const ImageUploaderSolid = ({ className, onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click(); // Trigger the file input click
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUpload(file); // Call the onUpload function with the selected file
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
      onUpload(file); // Call the onUpload function with the selected file
      handleClick();
    }
  };

  return (
    <motion.div
      className={`w-auto h-80 rounded-3xl min-w-28 flex bg-cardBackground flex-col cursor-pointer justify-center items-center ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={(e) => {
        handleClick();
      }}
      animate={{ scale: isDragging ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }} // Hide the input
      />
      <FaCloudUploadAlt className="w-16 h-16 text-mediumGray" />
      <p className="font-poppins text-xl mt-2 text-mediumGray">Upload your</p>
      <p className="font-poppins text-xl mt-2 text-mediumGray">Image</p>
    </motion.div>
  );
};

export default ImageUploaderSolid;
