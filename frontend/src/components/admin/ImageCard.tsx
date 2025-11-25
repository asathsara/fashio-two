import type { Image } from "../../types/image";
import { Button } from "../ui/button";
import { SmartImage } from "../common/SmartImage"; 

type ImageCardProps = {
  image: Image;
  onDelete: (id: string) => void;
};

const ImageCard = ({ image, onDelete }: ImageCardProps) => {
  return (
    <div className="shadow-md m-4 md:h-96 md:w-96 sm:w-72 sm:h-64 min-w-72 min-h-64 p-4 rounded-xl flex flex-col">
      <div className="flex flex-6 overflow-hidden relative rounded-xl">
        <SmartImage
          src={import.meta.env.VITE_API_UPLOAD_IMAGES_URL + image._id}
          alt={image.filename}
          className="w-full h-full"
          rounded="rounded-xl"
        />
      </div>

      <div className="flex flex-1 mt-4">
        <Button onClick={() => onDelete(image._id)} className="w-full">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ImageCard;
