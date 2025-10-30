import { z } from 'zod';

export const promoSchema = z.object({
  item: z.string().nonempty("Please select an item"), // Item ID as string
  startDate: z.date(),
  endDate: z.date(),
  discount: z
    .number()
    .min(1, "Minimum 1%")
    .max(100, "Maximum 100%"),
}).refine((data) => data.endDate > data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"],
});

export type PromoFormData = z.infer<typeof promoSchema>;