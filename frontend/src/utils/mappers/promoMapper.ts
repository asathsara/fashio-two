import type { PromoFormData } from "@/schemas/promoSchema";
import type { Promo, PromoWithItem } from "@/types/promo";

// Map form data to Promo type expected by the backend
export const mapFormToPromo = (data: PromoFormData): Omit<Promo, "_id"> => ({
  item: data.item,
  startDate: data.startDate.toISOString().split("T")[0],
  startTime: data.startDate.toISOString().split("T")[1].slice(0, 5),
  endDate: data.endDate.toISOString().split("T")[0],
  endTime: data.endDate.toISOString().split("T")[1].slice(0, 5),
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
