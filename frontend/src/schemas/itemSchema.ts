import { z } from "zod";

export const itemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z
    .number("Price is required")
    .min(1, "Price must be at least 1"),
  stock: z
    .number("Stock is required")
    .min(1, "Stock must be at least 1"),
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().min(1, "Subcategory is required"),
  selectedSizes: z.array(z.string()).min(1, "Select at least one size"),
  description: z.string().min(1, "Description required"),
  images: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required")
});
