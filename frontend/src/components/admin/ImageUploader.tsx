import { motion } from "framer-motion";
import { useRef, useState} from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from "../ui/button";

type ImageUploaderProps = {
  onUpload: (file: File) => void;
};

const ImageUploader = ({ onUpload }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click(); // Trigger the file input click
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file); // Call the onUpload function with the selected file
    }
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
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
      className={`w-auto h-80 border-dashed border-2 rounded-3xl border-black flex flex-col justify-center items-center my-8`}
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
      <p className="text-xl mt-2">Drop your file here</p>
      <p className="text-xl">Or</p>
      <Button className="px-6 mt-2"
        onClick={() => {
          handleClick();
        }}
      >
        Upload
      </Button>
    </motion.div>
  );
};

export default ImageUploader;

