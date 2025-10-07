import ImageUploaderSolid from "./ImageUploaderSolid";

type ImageUploaderGroupProps = {
  resetTrigger?: unknown;
  onImageChange: (key: "uploader1" | "uploader2" | "uploader3" | "uploader4", file: File | null) => void;
};

const UPLOAD_KEYS = ["uploader1", "uploader2", "uploader3", "uploader4"] as const;


const ImageUploaderGroup: React.FC<ImageUploaderGroupProps> = ({ resetTrigger, onImageChange }) => {
  return (
    <div className="flex flex-col flex-1 mr-4">
      {/* First ImageUploader */}
      <ImageUploaderSolid
        resetTrigger={resetTrigger}
        onImageChange={(file) => onImageChange("uploader1", file)}
      />

      {/* Row of Three ImageUploader */}
      <div className="flex flex-row mt-4">
        {UPLOAD_KEYS.slice(1).map((key, index) => (
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
