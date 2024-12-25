import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const ImageUploader = ({ className }) => {
  return (
    <div
      className={`w-auto h-80 border-dashed border-2 rounded-3xl border-black  flex flex-col justify-center items-center ${className}`}
    >
      <FaCloudUploadAlt className="w-16 h-16" />
      <p className="font-poppins text-xl mt-2">Drop your file here</p>
      <p className="font-poppins text-xl">Or</p>
      <button className="bg-black text-white px-8 py-2 rounded-full font-poppins mt-6">Upload</button>
    </div>
  );
};

export default ImageUploader;
