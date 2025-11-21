import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import CategorySelector from "@/components/admin/CategorySelector"
import SizeSelector from "@/components/admin/SizeSelector"
import ImageUploaderGroup from "@/components/admin/ImageUploaderGroup"
import { useItemForm } from "@/hooks/admin/useItemForm"
import { useParams, useNavigate } from "react-router-dom"
import { Spinner } from "@/components/common/Spinner"
import { useEffect } from "react"
import { useGetItem } from "@/hooks/useItems"

const ItemInsertPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)


  // Fetch item data if in edit mode
  const { data: item, isLoading } = useGetItem(id || "", isEditMode)

  const {
    register,
    errors,
    watchedSizes,
    handleImageChange,
    handleSizeToggle,
    onSubmit,
    setValue,
    watch,
    categories,
    insertMutation,
    updateMutation,
  } = useItemForm({ item, isEditMode })

  const mutation = isEditMode ? updateMutation : insertMutation

  // Navigate back after successful update
  useEffect(() => {
    if (isEditMode && updateMutation.isSuccess) {
      navigate('/admin/items/list')
    }
  }, [isEditMode, updateMutation.isSuccess, navigate])

  if (isEditMode && isLoading) {
    return <Spinner fullHeight />
  }



  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-semibold">
        {isEditMode ? "Edit Item" : "Add New Item"}
      </h1>
      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Images</FieldLegend>
            <FieldDescription>
              {isEditMode
                ? "Upload new images to replace existing ones (optional)."
                : "Upload product images."}
            </FieldDescription>

            <ImageUploaderGroup
              onImageChange={handleImageChange}
              existingImageUrls={
                isEditMode && item && item.images
                  ? item.images.map((_, index) =>
                    `${import.meta.env.VITE_API_BASE_URL}/items/${item._id}/image/${index}`
                  )
                  : []
              }
            />
            {!isEditMode && errors.images && <FieldError>{errors.images.message}</FieldError>}
          </FieldSet>

          <FieldSet>
            <FieldLegend>Item Details</FieldLegend>
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input {...register("name")} />
              <FieldError>{errors.name?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel>Description</FieldLabel>
              <Textarea {...register("description")} />
              <FieldError>{errors.description?.message}</FieldError>
            </Field>

            <CategorySelector
              categories={categories}
              categoryId={watch("categoryId")}
              subCategoryId={watch("subCategoryId")}
              onCategoryChange={(val) =>
                setValue("categoryId", val, { shouldValidate: true })
              }
              onSubCategoryChange={(val) =>
                setValue("subCategoryId", val, { shouldValidate: true })}
            />
            {errors.categoryId && <FieldError>{errors.categoryId.message}</FieldError>}
            {errors.subCategoryId && <FieldError>{errors.subCategoryId.message}</FieldError>}

          </FieldSet>

          <FieldSeparator />

          <FieldSet>
            <FieldLegend>Inventory</FieldLegend>
            <FieldGroup className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Stock</FieldLabel>
                <Input type="number" {...register("stock", { valueAsNumber: true })} />
                <FieldError>{errors.stock?.message}</FieldError>
              </Field>
              <Field>
                <FieldLabel>Price</FieldLabel>
                <Input type="number" {...register("price", { valueAsNumber: true })} />
                <FieldError>{errors.price?.message}</FieldError>
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldLegend>Sizes</FieldLegend>
            <SizeSelector selectedSizes={watchedSizes} onSizeToggle={handleSizeToggle} />
            {errors.selectedSizes && <FieldError>{errors.selectedSizes.message}</FieldError>}
          </FieldSet>

          <Button type="submit" disabled={mutation.isPending} className="w-full">
            {mutation.isPending
              ? (isEditMode ? "Updating…" : "Submitting…")
              : (isEditMode ? "Update Item" : "Add Item")}
          </Button>
        </FieldGroup>
      </form>
    </div>
  )
}

export default ItemInsertPage
