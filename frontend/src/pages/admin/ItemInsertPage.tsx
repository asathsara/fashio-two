"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { itemSchema } from "@/schemas/itemSchema"
import { useInsertItem } from "@/hooks/useItems"
import { useCategories } from "@/hooks/useCategories"

import { toast } from "sonner"
import {
  Field,
  FieldSet,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldLegend,
  FieldDescription,
  FieldSeparator,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import CategorySelector from "@/components/admin/CategorySelector"
import SizeSelector from "@/components/admin/SizeSelector"
import ImageUploaderGroup from "@/components/admin/ImageUploaderGroup"

type ItemForm = z.infer<typeof itemSchema>

const ItemInsertPage: React.FC = () => {
  const { data: categories = [] } = useCategories()
  const insertMutation = useInsertItem()

  const {
    register,
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
  })

  const watchedSizes: string[] = watch("selectedSizes")
  const watchedImages = watch("images")

  // Handlers
  const onSubmit = async (data: ItemForm) => {
    const formData = new FormData()
    data.images.forEach((file) => formData.append("images", file))
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("category", data.category)
    formData.append("subCategory", data.subCategory)
    formData.append("price", data.price.toString())
    formData.append("stock", data.stock.toString())
    formData.append("selectedSizes", JSON.stringify(data.selectedSizes))

    insertMutation.mutate(formData)
    toast.success("Item added successfully!")
    reset()
  }

  const handleImageChange = (_key: unknown, file: File | null) => {
    if (!file) return
    setValue("images", [...(watchedImages || []), file])
  }

  const handleSizeToggle = (size: string) => {
    const updated = (watchedSizes || []).includes(size)
      ? watchedSizes.filter((s) => s !== size)
      : [...(watchedSizes || []), size]
    setValue("selectedSizes", updated)
  }

  // 🧠 UI
  return (
    <div className="max-w-5xl">
      <h1 className="font-poppins text-3xl font-semibold">Item Insert</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div className="flex flex-col gap-6">
          <FieldGroup>
            {/* Image Upload */}
            <FieldSet>
              <FieldLegend>Images</FieldLegend>
              <FieldDescription>
                Upload high-quality product images (PNG, JPG).
              </FieldDescription>
              <ImageUploaderGroup onImageChange={handleImageChange} />
              {errors.images && (
                <FieldError>{errors.images.message}</FieldError>
              )}
            </FieldSet>


            {/* Basic Details */}
            <FieldSet>
              <FieldLegend>Item Details</FieldLegend>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Item Name</FieldLabel>
                  <Input id="name" placeholder="Enter item name" {...register("name")} />
                  <FieldError>{errors.name?.message}</FieldError>
                </Field>

                <Field>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    id="description"
                    placeholder="Enter item description"
                    {...register("description")}
                  />
                  <FieldError>{errors.description?.message}</FieldError>
                </Field>

                <Field>
                  <FieldLabel>Category</FieldLabel>
                  <CategorySelector
                    categories={categories}
                    category={watch("category") ? categories.find((cat) => cat._id === watch("category")) || null : null}
                    subCategory={watch("subCategory") || null}
                    onCategoryChange={(value) => setValue("category", value, { shouldValidate: true })}
                    onSubCategoryChange={(value) => setValue("subCategory", value, { shouldValidate: true })}
                  />

                  {errors.category && <FieldError>{errors.category.message}</FieldError>}
                  {errors.subCategory && (
                    <FieldError>{errors.subCategory.message}</FieldError>
                  )}
                </Field>
              </FieldGroup>
            </FieldSet>

            <FieldSeparator />

            {/* Stock & Price */}
            <FieldSet>
              <FieldLegend>Inventory</FieldLegend>
              <FieldGroup className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="stock">Stock</FieldLabel>
                  <Input id="stock" type="number" {...register("stock", { valueAsNumber: true })} />
                  <FieldError>{errors.stock?.message}</FieldError>
                </Field>

                <Field>
                  <FieldLabel htmlFor="price">Price</FieldLabel>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    {...register("price", { valueAsNumber: true })}
                  />
                  <FieldError>{errors.price?.message}</FieldError>
                </Field>
              </FieldGroup>
            </FieldSet>

            <FieldSeparator />

            {/* Sizes */}
            <FieldSet>
              <FieldLegend>Sizes</FieldLegend>
              <SizeSelector selectedSizes={watchedSizes} onSizeToggle={handleSizeToggle} />
              {errors.selectedSizes && (
                <FieldError>{errors.selectedSizes.message}</FieldError>
              )}
            </FieldSet>

            {/* Submit */}
            <Field orientation="horizontal" className="mt-6">
              <Button type="submit" disabled={insertMutation.isPending} className="w-full">
                {insertMutation.isPending ? "Submitting…" : "Submit"}
              </Button>
            </Field>

          </FieldGroup>
        </div>
      </form>
    </div>
  )
}

export default ItemInsertPage
