import type { Item } from "../../types/item";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import { SmartImage } from "@/components/common/SmartImage";
import { buildImageSrc, getImageUrl } from "@/utils/image";
import { usePromoData } from "@/hooks/usePromoData";
import { Badge } from "@/components/ui/badge";

type ItemCardProps = {
  item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const navigate = useNavigate();
  const { getItemPricing } = usePromoData();

  const pricing = getItemPricing(item);

  const handleClick = () => {
    navigate(`/items/${item._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`rounded-md border-1 border-x-gray-100 md:w-64 mr-10 mt-10 w-56 cursor-pointer hover:shadow-lg transition-shadow relative`}
    >
      {pricing.hasPromo && pricing.discountPercentage && (
        <Badge className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white">
          -{pricing.discountPercentage}%
        </Badge>
      )}
      <SmartImage
        src={buildImageSrc(getImageUrl(item, 0))}
        alt={item.name}
        className="md:h-72 h-64 w-full"
        rounded="rounded-t-md"
        showOverlay
      />
      <div className="flex flex-col w-full items-center font-poppins">
        <p className="text-lg text-dark-gray mt-8">{item.name}</p>
        <div className="flex items-center gap-2 mt-2 mb-6">
          {pricing.hasPromo ? (
            <>
              <h2 className="text-md font-bold text-red-500">
                {`Rs. ${(Math.round(pricing.appliedPrice * 100) / 100).toFixed(2)}`}
              </h2>
              <span className="text-sm text-gray-500 line-through">
                {`Rs. ${(Math.round(pricing.originalPrice * 100) / 100).toFixed(2)}`}
              </span>
            </>
          ) : (
            <h2 className="text-md font-bold">
              {`Rs. ${(Math.round(item.price * 100) / 100).toFixed(2)}`}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ItemCard);
