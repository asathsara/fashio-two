import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { itemSchema } from "@/schemas/itemSchema";
import { useInsertItem } from "@/hooks/useItems";
import { useCategories } from "@/hooks/useCategories";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldContent,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import CategorySelector from "@/components/admin/CategorySelector";
import SizeSelector from "@/components/admin/SizeSelector";
import ImageUploaderGroup from "@/components/admin/ImageUploaderGroup";
import { toast } from "sonner";

type ItemForm = z.infer<typeof itemSchema>;

const ItemInsertPage: React.FC = () => {
  const { data: categories = [] } = useCategories();
  const insertMutation = useInsertItem();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ItemForm>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      subCategory: "",
      price: 0,
      stock: 0,
      selectedSizes: [],
      images: [],
    },
  });

  const watchedSizes = watch("selectedSizes");
  const watchedImages = watch("images");

  const onSubmit = async (data: ItemForm) => {
    const formData = new FormData();
    data.images.forEach((file) => formData.append("images", file));
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("subCategory", data.subCategory);
    formData.append("price", data.price.toString());
    formData.append("stock", data.stock.toString());
    formData.append("selectedSizes", JSON.stringify(data.selectedSizes));

    insertMutation.mutate(formData);

    toast.success("Item added successfully!");
    reset();
  };

  const handleImageChange = (file: File | null) => {
    if (!file) return;
    setValue("images", [...(watchedImages || []), file]);
  };

  const handleSizeToggle = (size: string) => {
    const updated = (watchedSizes || []).includes(size)
      ? watchedSizes.filter((s) => s !== size)
      : [...(watchedSizes || []), size];
    setValue("selectedSizes", updated);
  };

  return (
    <>
      <h1 className="font-poppins text-3xl font-semibold">Item Insert</h1>

      <div className="flex flex-wrap mt-8">
        {/* Image Uploader */}
        <div className="flex-1 mr-4">
          <ImageUploaderGroup onImageChange={handleImageChange} />
        </div>

        <div className="flex-1 ml-0 md:ml-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Item Name</FieldLabel>

                  <Input id="name" {...field} placeholder="Enter item name" />

                  <FieldError>{fieldState.error?.message}</FieldError>
                </Field>
              )}
            />

            {/* Description */}
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <FieldContent>
                    <Textarea
                      id="description"
                      {...field}
                      placeholder="Enter item description"
                    />
                  </FieldContent>
                  <FieldError>{fieldState.error?.message}</FieldError>
                </Field>
              )}
            />

            {/* Category + SubCategory */}
            <div>
              <FieldLabel className="block mb-1">Category</FieldLabel>
              <CategorySelector
                categories={categories}
                category={watch("category")}
                subCategory={watch("subCategory")}
                onCategoryChange={(e) =>
                  setValue("category", e.target.value, { shouldValidate: true })
                }
                onSubCategoryChange={(e) =>
                  setValue("subCategory", e.target.value, {
                    shouldValidate: true,
                  })
                }
              />
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
              {errors.subCategory && (
                <p className="text-red-500 text-sm">
                  {errors.subCategory.message}
                </p>
              )}
            </div>

            {/* Stock */}
            <Controller
              name="stock"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="stock">Stock</FieldLabel>
                  <FieldContent>
                    <Input id="stock" {...field} type="number" />
                  </FieldContent>
                  <FieldError>{fieldState.error?.message}</FieldError>
                </Field>
              )}
            />

            {/* Price */}
            <Controller
              name="price"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="price">Price</FieldLabel>
                  <FieldContent>
                    <Input id="price" {...field} type="number" step="0.01" />
                  </FieldContent>
                  <FieldError>{fieldState.error?.message}</FieldError>
                </Field>
              )}
            />

            {/* Sizes */}
            <div>
              <FieldLabel className="block mb-1">Sizes</FieldLabel>
              <SizeSelector
                selectedSizes={watchedSizes}
                onSizeToggle={handleSizeToggle}
              />
              {errors.selectedSizes && (
                <p className="text-red-500 text-sm">
                  {errors.selectedSizes.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full mt-4" disabled={insertMutation.isPending}>
              {insertMutation.isPending ? "Submitting…" : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ItemInsertPage;
