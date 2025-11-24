import type { Item } from "@/types/item";

export const buildImageSrc = (path: string) =>
  `${import.meta.env.VITE_API_ITEM_IMAGES_URL}${path}`;


export const getImageUrl = (item: Item, selectedImageIndex: number = 0) => {
  const hasImage = 
    item.images &&
    item.images.length > selectedImageIndex;

  return hasImage
    ? `${item._id}/image/${selectedImageIndex}`
    : "placeholder-image.jpg";
};
