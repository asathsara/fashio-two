import type { Image } from "../../types/image";
import { Button } from "../ui/button";

type ImageCardProps = {
  image: Image,
  onDelete : (id: string) => void
}
const ImageCard = ({ image, onDelete }: ImageCardProps) => {
  return (
    <div
      className={`shadow-md m-4 md:h-96 md:w-96 sm:w-72 sm:h-64 min-w-72 min-h-64 p-4 rounded-xl flex flex-col`}
    >
      <div className="flex flex-6 overflow-hidden">
        <img
          src={import.meta.env.VITE_API_UPLOAD_IMAGES_URL + image._id} // Use the base URL from env file for dynamic API URLs
          alt={image.filename}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <div className="flex flex-1 mt-4">
        <Button
          onClick={() => onDelete(image._id)}
          className="w-full"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ImageCard;