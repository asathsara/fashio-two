import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { itemSchema } from "@/schemas/itemSchema"
import { useInsertItem, useUpdateItem } from "@/hooks/useItems"
import { useEffect } from "react"
import type { Item } from "@/types/item"

type ItemForm = z.infer<typeof itemSchema>

interface UseItemFormProps {
    item?: Item | null
    isEditMode?: boolean
}

// Create a dynamic schema that makes images optional in edit mode
const createItemSchema = (isEditMode: boolean) => {
    return z.object({
        name: z.string().min(1, "Name is required"),
        price: z.number({ required_error: "Price is required" }).min(1, "Price must be at least 1"),
        stock: z.number({ required_error: "Stock is required" }).min(1, "Stock must be at least 1"),
        category: z.string().min(1, "Category is required"),
        subCategoryId: z.string().min(1, "Subcategory is required"),
        selectedSizes: z.array(z.string()).min(1, "Select at least one size"),
        description: z.string().min(1, "Description required"),
        images: isEditMode
            ? z.array(z.instanceof(File)).optional()
            : z.array(z.instanceof(File)).min(1, "At least one image is required")
    });
};

export function useItemForm({ item, isEditMode = false }: UseItemFormProps = {}) {
    const insertMutation = useInsertItem()
    const updateMutation = useUpdateItem()

    const form = useForm<ItemForm>({
        resolver: zodResolver(createItemSchema(isEditMode)),
        defaultValues: {
            name: "",
            description: "",
            category: "",
            subCategoryId: "",
            price: undefined,
            stock: undefined,
            selectedSizes: [],
            images: [],
        },
    })

    const { handleSubmit, setValue, watch, reset, formState: { errors } } = form

    // Populate form when in edit mode
    useEffect(() => {
        if (isEditMode && item) {
            setValue("name", item.name)
            setValue("description", item.description || "")
            setValue("category", item.category._id || item.category)
            setValue("subCategoryId", item.subCategoryId)
            setValue("price", item.price)
            setValue("stock", item.stock)
            setValue("selectedSizes", item.sizes || [])
            // Images are not pre-populated in edit mode (user can upload new ones)
        }
    }, [isEditMode, item, setValue])

    const watchedSizes = watch("selectedSizes")
    const watchedImages = watch("images")

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

    const onSubmit = handleSubmit(async (data) => {
        const formData = new FormData()

        // Only append images if they exist (for update, images are optional)
        if (data.images && data.images.length > 0) {
            data.images.forEach((file) => formData.append("images", file))
        }

        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("category", data.category)
        formData.append("subCategoryId", data.subCategoryId)
        formData.append("price", data.price.toString())
        formData.append("stock", data.stock.toString())
        formData.append("sizes", JSON.stringify(data.selectedSizes))

        if (isEditMode && item?._id) {
            updateMutation.mutate({ id: item._id, formData })
        } else {
            insertMutation.mutate(formData)
        }

        if (!isEditMode) {
            reset()
        }
    })

    return {
        ...form,
        errors,
        watchedSizes,
        watchedImages,
        handleImageChange,
        handleSizeToggle,
        onSubmit,
        insertMutation,
        updateMutation,
        isEditMode,
    }
}
