import type { Item } from "../../types/item";
import { useNavigate } from "react-router-dom";
import { SmartImage } from "@/components/common/SmartImage";
import { buildImageSrc, getImageUrl } from "@/utils/image";

type ItemCardProps = {
  item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/items/${item._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`rounded-md border-1 border-x-gray-100 md:w-64 mr-10 mt-10 w-56 cursor-pointer hover:shadow-lg transition-shadow`}
    >
      <SmartImage
        src={buildImageSrc(getImageUrl(item, 0))}
        alt={item.name}
        className="md:h-72 h-64 w-full"
        rounded="rounded-t-md"
        showOverlay
      />
      <div className="flex flex-col w-full items-center font-poppins">
        <p className="text-lg text-dark-gray mt-8">{item.name}</p>
        <h2 className="text-md font-bold mt-2 mb-6">{`Rs. ${(Math.round(item.price * 100) / 100).toFixed(2)}`}</h2>
      </div>
    </div>
  );
};

export default ItemCard;
