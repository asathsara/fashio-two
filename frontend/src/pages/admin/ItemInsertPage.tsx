import { useCategories } from "@/hooks/useCategories"
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

const ItemInsertPage = () => {
  const { data: categories = [] } = useCategories()
  const {
    register,
    errors,
    watchedSizes,
    handleImageChange,
    handleSizeToggle,
    onSubmit,
    setValue,
    watch,
    insertMutation,
  } = useItemForm()

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-semibold">Item Insert</h1>
      <form onSubmit={onSubmit} className="mt-8 space-y-6 min-h-144">
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Images</FieldLegend>
            <FieldDescription>Upload product images.</FieldDescription>
            <ImageUploaderGroup onImageChange={handleImageChange} />
            {errors.images && <FieldError>{errors.images.message}</FieldError>}
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
              category={watch("category") ? categories.find((c) => c._id === watch("category")) || null : null}
              subCategory={watch("subCategory") || null}
              onCategoryChange={(val) => setValue("category", val, { shouldValidate: true })}
              onSubCategoryChange={(val) => setValue("subCategory", val, { shouldValidate: true })}
            />
          </FieldSet>

          <FieldSeparator />

          <FieldSet>
            <FieldLegend>Inventory</FieldLegend>
            <FieldGroup className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Stock</FieldLabel>
                <Input type="number" {...register("stock", { valueAsNumber: true })} />
              </Field>
              <Field>
                <FieldLabel>Price</FieldLabel>
                <Input type="number" {...register("price", { valueAsNumber: true })} />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldLegend>Sizes</FieldLegend>
            <SizeSelector selectedSizes={watchedSizes} onSizeToggle={handleSizeToggle} />
          </FieldSet>

          <Button type="submit" disabled={insertMutation.isPending} className="w-full">
            {insertMutation.isPending ? "Submitting…" : "Submit"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  )
}

export default ItemInsertPage
