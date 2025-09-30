import { motion } from "framer-motion";
import React, { useRef, useState} from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const ImageUploader = ({ className, onUpload }) => {
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
      className={`w-auto h-80 border-dashed border-2 rounded-3xl border-black flex flex-col justify-center items-center ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      animate={{ scale: isDragging ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }} // Hide the input
      />
      <FaCloudUploadAlt className="w-16 h-16" />
      <p className="font-poppins text-xl mt-2">Drop your file here</p>
      <p className="font-poppins text-xl">Or</p>
      <button
        className="bg-black text-white px-8 py-2 rounded-full font-poppins mt-6"
        onClick={(e) => {
          
          handleClick();
        }}
      >
        Upload
      </button>
    </motion.div>
  );
};

export default ImageUploader;

