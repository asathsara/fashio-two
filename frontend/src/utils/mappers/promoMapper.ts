import type { PromoFormData } from "@/schemas/promoSchema";
import type { Promo, PromoWithItem } from "@/types/promo";

const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatLocalTime = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Map form data to Promo type expected by the backend
export const mapFormToPromo = (data: PromoFormData): Omit<Promo, "_id"> => ({
  item: data.item,
  startDate: formatLocalDate(data.startDate),
  startTime: formatLocalTime(data.startDate),
  endDate: formatLocalDate(data.endDate),
  endTime: formatLocalTime(data.endDate),
  discount: data.discount.toString(),
});

export const mapPromoToFormValues = (promo: PromoWithItem): PromoFormData => {
  if (!promo.item?._id) {
    throw new Error('Cannot edit a promo without an associated item');
  }

  return {
    item: promo.item._id,
    startDate: new Date(`${promo.startDate}T${promo.startTime}`),
    endDate: new Date(`${promo.endDate}T${promo.endTime}`),
    discount: Number(promo.discount),
  };
};
