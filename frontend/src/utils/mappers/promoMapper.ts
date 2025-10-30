import type { PromoFormData } from "@/schemas/promoSchema";
import type { Promo,  } from "@/types/promo";

// Map form data to Promo type expected by the backend
export const mapFormToPromo = (data: PromoFormData): Omit<Promo, "_id"> => ({
  item: data.item,
  startDate: data.startDate.toISOString().split("T")[0],
  startTime: data.startDate.toISOString().split("T")[1].slice(0, 5),
  endDate: data.endDate.toISOString().split("T")[0],
  endTime: data.endDate.toISOString().split("T")[1].slice(0, 5),
  discount: data.discount.toString(),
});
