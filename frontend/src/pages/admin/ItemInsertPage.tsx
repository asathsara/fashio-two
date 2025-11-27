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
import { useItemForm } from "@/hooks/admin/useItemForm"
import { useAIDescription } from "@/hooks/admin/useAIDescription"
import { useParams, useNavigate } from "react-router-dom"
import { Spinner } from "@/components/common/Spinner"
import { useEffect, useState, lazy, Suspense } from "react"
import { useGetItem } from "@/hooks/useItems"
import { ComponentLoadingFallback } from "@/components/common/LazyLoadingFallback"
import AIGenerateButton from "@/components/admin/AIGenerateButton"

// Lazy load heavy admin components
const CategorySelector = lazy(() => import("@/components/admin/CategorySelector"));
const SizeSelector = lazy(() => import("@/components/admin/SizeSelector"));
const ImageUploaderGroup = lazy(() => import("@/components/admin/ImageUploaderGroup"));

const ItemInsertPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)
  const [formKey, setFormKey] = useState(0)

  // Fetch item data if in edit mode
  const { data: item, isLoading } = useGetItem(id || "", isEditMode)

  const {
    register,
    errors,
    watchedSizes,
    existingImages,
    newImages,
    totalImages,
    hasMinimumImages,
    handleImageChange,
    handleRemoveExistingImage,
    handleRemoveNewImage,
    handleSizeToggle,
    onSubmit,
    setValue,
    watch,
    categories,
    insertMutation,
    updateMutation,
  } = useItemForm({ item, isEditMode })

  const mutation = isEditMode ? updateMutation : insertMutation

  // AI Description Generation
  const { isGenerating, generateDescription } = useAIDescription({
    watch,
    setValue: (name, value, options) => setValue(name as never, value as never, options),
    newImages,
  })

  // Navigate back after successful update
  useEffect(() => {
    if (isEditMode && updateMutation.isSuccess) {
      navigate('/admin/items/list')
    }
  }, [isEditMode, updateMutation.isSuccess, navigate])

  // Reset form and images after successful insert
  useEffect(() => {
    if (!isEditMode && insertMutation.isSuccess) {
      setFormKey(prev => prev + 1)
    }
  }, [insertMutation.isSuccess, isEditMode])

  if (isEditMode && isLoading) {
    return <Spinner fullHeight />
  }

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-semibold">
        {isEditMode ? "Edit Item" : "Add New Item"}
      </h1>
      <p className="text-gray-600">{isEditMode ? "Modify the details of your item below." : "Fill out the form below to add a new item to your inventory."}</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Images</FieldLegend>
            <FieldDescription>
              {isEditMode
                ? "Manage your product images. You can remove existing images or upload new ones."
                : "Upload product images (at least 1 required)."}
            </FieldDescription>

            {isEditMode && (
              <div className="mb-2 text-sm">
                <span className="font-medium">
                  Total: {totalImages} image{totalImages !== 1 ? 's' : ''}
                </span>
                {!hasMinimumImages && (
                  <span className="text-red-500 ml-2">
                    (At least 1 image required)
                  </span>
                )}
              </div>
            )}

            <Suspense fallback={<ComponentLoadingFallback />}>
              <ImageUploaderGroup
                key={formKey}
                existingImages={existingImages}
                newImages={newImages}
                onImageChange={handleImageChange}
                onRemoveExisting={handleRemoveExistingImage}
                onRemoveNew={handleRemoveNewImage}
              />
            </Suspense>

            {!isEditMode && errors.images && <FieldError>{errors.images.message}</FieldError>}
            {isEditMode && !hasMinimumImages && (
              <FieldError>At least one image is required</FieldError>
            )}
          </FieldSet>

          <FieldSet>
            <FieldLegend>Item Details</FieldLegend>
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input {...register("name")} />
              <FieldError>{errors.name?.message}</FieldError>
            </Field>

            <Field>
              <div className="flex items-center justify-between mb-2">
                <FieldLabel>Description</FieldLabel>
                <AIGenerateButton
                  onClick={generateDescription}
                  isGenerating={isGenerating}
                  isDisabled={mutation.isPending}
                />
              </div>
              <Textarea {...register("description")} rows={5} />
              <FieldError>{errors.description?.message}</FieldError>
            </Field>

            <Suspense fallback={<ComponentLoadingFallback />}>
              <CategorySelector
                categories={categories}
                categoryId={watch("category")}
                subCategoryId={watch("subCategory")}
                onCategoryChange={(val) =>
                  setValue("category", val, { shouldValidate: true })
                }
                onSubCategoryChange={(val) =>
                  setValue("subCategory", val, { shouldValidate: true })}
              />
            </Suspense>
            {errors.category && <FieldError>{errors.category.message}</FieldError>}
            {errors.subCategory && <FieldError>{errors.subCategory.message}</FieldError>}

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
            <Suspense fallback={<ComponentLoadingFallback />}>
              <SizeSelector selectedSizes={watchedSizes} onSizeToggle={handleSizeToggle} />
            </Suspense>
            {errors.selectedSizes && <FieldError>{errors.selectedSizes.message}</FieldError>}
          </FieldSet>

          <Button
            type="submit"
            disabled={mutation.isPending || (isEditMode && !hasMinimumImages)}
            className="w-full"
          >
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
