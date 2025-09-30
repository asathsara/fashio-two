import React from "react";
import ImageUploaderSolid from "./ImageUploaderSolid";

const ImageUploaderGroup = ({ resetTrigger, onImageChange }) => {
  return (
    <div className="flex flex-col flex-1 mr-4">
      {/* First ImageUploader */}
      <ImageUploaderSolid
        resetTrigger={resetTrigger}
        onImageChange={(file) => onImageChange("uploader1", file)}
      />
      {/* Row of Three ImageUploaders */}
      <div className="flex flex-row mt-4">
        {["uploader2", "uploader3", "uploader4"].map((key, index) => (
          <div key={key} className={`flex-1 ${index > 0 ? "ml-4" : ""}`}>
            <ImageUploaderSolid
              resetTrigger={resetTrigger}
              onImageChange={(file) => onImageChange(key, file)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploaderGroup;
