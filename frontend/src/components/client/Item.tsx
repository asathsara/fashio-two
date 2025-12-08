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
    navigate(`/items/${item.slug || item._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="rounded-md border border-gray-100 w-44 sm:w-56 md:w-64 flex-shrink-0 cursor-pointer hover:shadow-lg transition-shadow relative mr-3 sm:mr-4 mt-6"
    >
      {pricing.hasPromo && pricing.discountPercentage && (
        <Badge className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm">
          -{pricing.discountPercentage}%
        </Badge>
      )}
      <SmartImage
        src={buildImageSrc(getImageUrl(item, 0))}
        alt={item.name}
        className="h-48 sm:h-64 md:h-72 w-full"
        rounded="rounded-t-md"
        showOverlay
      />
      <div className="flex flex-col w-full items-center font-poppins px-2 py-2">
        <p className="text-sm sm:text-lg text-dark-gray mt-4 sm:mt-6 text-center">{item.name}</p>
        <div className="flex items-center gap-1 sm:gap-2 mt-1 sm:mt-2 mb-4">
          {pricing.hasPromo ? (
            <>
              <h2 className="text-sm sm:text-md font-bold text-red-500">
                {`Rs. ${(Math.round(pricing.appliedPrice * 100) / 100).toFixed(2)}`}
              </h2>
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                {`Rs. ${(Math.round(pricing.originalPrice * 100) / 100).toFixed(2)}`}
              </span>
            </>
          ) : (
            <h2 className="text-sm sm:text-md font-bold">
              {`Rs. ${(Math.round(item.price * 100) / 100).toFixed(2)}`}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ItemCard);
