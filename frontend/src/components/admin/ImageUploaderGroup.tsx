import ImageUploaderSolid from "./ImageUploaderSolid";

type ImageUploaderGroupProps = {
  onImageChange: (key: "uploader1" | "uploader2" | "uploader3" | "uploader4", file: File | null) => void;
  existingImageUrls?: (string | null)[];
};

const UPLOAD_KEYS = ["uploader1", "uploader2", "uploader3", "uploader4"] as const;


const ImageUploaderGroup = ({ onImageChange, existingImageUrls = [] }: ImageUploaderGroupProps) => {

  return (
    <div className="flex flex-col mr-4">
      {/* First ImageUploader */}
      <ImageUploaderSolid
        onImageChange={(file) => onImageChange("uploader1", file)}
        initialImageUrl={existingImageUrls[0] || null}
      />

      {/* Row of Three ImageUploader */}
      <div className="flex flex-row mt-4">
        {UPLOAD_KEYS.slice(1).map((key, index) => (
          <div key={key} className={`flex-1 ${index > 0 ? "ml-4" : ""}`}>
            <ImageUploaderSolid
              onImageChange={(file) => onImageChange(key, file)}
              initialImageUrl={existingImageUrls[index + 1] || null}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploaderGroup;
