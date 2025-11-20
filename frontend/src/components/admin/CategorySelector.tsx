import type { Category } from "../../types/category"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

type CategorySelectorProps = {
  categories: Category[]
  categoryId: string
  subCategory: string
  onCategoryChange: (value: string) => void
  onSubCategoryChange: (value: string) => void
}

const CategorySelector = ({
  categories,
  categoryId,
  subCategory,
  onCategoryChange,
  onSubCategoryChange,
}: CategorySelectorProps) => {

  const category = categories.find((cat) => cat._id === categoryId)

  console.log("CategorySelector category:", subCategory)
  return (
    <FieldGroup className="mt-4 space-y-4">
      {/* Category */}
      <Field>
        <FieldLabel>Category</FieldLabel>
        <Select
          value={categoryId}
          defaultValue={category?.name}
          onValueChange={(value) => onCategoryChange(value)}
        >
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat._id} value={cat._id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldDescription>
          Choose a category for your fashionable masterpiece
        </FieldDescription>
      </Field>

      {/* Sub Category */}
      <Field>
        <FieldLabel>Subcategory</FieldLabel>
        <Select
          value={subCategory}
          onValueChange={(value) => onSubCategoryChange(value)}
          disabled={!category}
        >
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select subcategory" />
          </SelectTrigger>
          <SelectContent>
            {category?.subCategories?.map((sub) => (
              <SelectItem key={sub._id} value={sub._id}>
                {sub.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldDescription>
          Select a subcategory — only available after choosing a category.
        </FieldDescription>
      </Field>
    </FieldGroup>
  )
}

export default CategorySelector