import type { CartItem as CartItemType } from '@/types/cart';

export const getImageUrl = (item: CartItemType) => {
  const hasImage = 
    item.item.images &&
    item.item.images.length > item.selectedImageIndex;

  return hasImage
    ? `${item.item._id}/image/${item.selectedImageIndex}`
    : "placeholder-image.jpg";
};
