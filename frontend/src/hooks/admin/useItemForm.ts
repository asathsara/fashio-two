import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { itemSchema } from "@/schemas/itemSchema"
import { useInsertItem, useUpdateItem } from "@/hooks/useItems"
import { useEffect, useState } from "react"
import type { Item } from "@/types/item"
import { useCategories } from "../useCategories"


type ItemForm = z.infer<typeof itemSchema>

interface UseItemFormProps {
    item?: Item | null
    isEditMode?: boolean
}

interface ExistingImage {
    index: number
    url: string
}

export function useItemForm({ item, isEditMode = false }: UseItemFormProps = {}) {
    const insertMutation = useInsertItem()
    const updateMutation = useUpdateItem()

    const { data: categories = [] } = useCategories()

    // State for tracking images
    const [existingImages, setExistingImages] = useState<ExistingImage[]>([])
    const [newImages, setNewImages] = useState<File[]>([])
    const [remainingExistingImages, setRemainingExistingImages] = useState<number[]>([])

    // Create schema for edit mode that makes images optional
    const editSchema = itemSchema.omit({ images: true }).extend({
        images: z.array(z.instanceof(File)).optional(),
    })

    type EditItemForm = z.infer<typeof editSchema>
    type FormData = ItemForm | EditItemForm

    const form = useForm<FormData>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(isEditMode ? editSchema : itemSchema) as any,
        defaultValues: {
            name: "",
            description: "",
            category: "",
            subCategory: "",
            price: undefined,
            stock: undefined,
            selectedSizes: [],
            images: [],
        },
    })

    const { handleSubmit, setValue, watch, reset, formState: { errors } } = form

    // Populate form when in edit mode
    useEffect(() => {
        if (item && isEditMode) {
            reset({
                name: item.name,
                description: item.description,
                category: item.category._id,
                subCategory: item.category.subCategory?._id || "",
                price: item.price,
                stock: item.stock,
                selectedSizes: item.sizes,
                images: [],
            })

            // Initialize existing images
            if (item.images && item.images.length > 0) {
                const existingImgs = item.images.map((_, index) => ({
                    index,
                    url: `${import.meta.env.VITE_API_BASE_URL}/items/${item._id}/image/${index}`
                }))
                setExistingImages(existingImgs)
                setRemainingExistingImages(existingImgs.map(img => img.index))
            }

            // Clear new images
            setNewImages([])
        } else {
            // Clear for insert mode
            setExistingImages([])
            setNewImages([])
            setRemainingExistingImages([])
        }
    }, [item, isEditMode, reset]);

    const watchedSizes = watch("selectedSizes")
    const watchedImages = watch("images")

    const handleImageChange = (file: File | null) => {
        if (!file) return
        setNewImages(prev => [...prev, file])
    }

    const handleRemoveExistingImage = (index: number) => {
        setRemainingExistingImages(prev => prev.filter(i => i !== index))
    }

    const handleRemoveNewImage = (index: number) => {
        setNewImages(prev => prev.filter((_, i) => i !== index))
    }

    const handleSizeToggle = (size: string) => {
        const updated = (watchedSizes || []).includes(size)
            ? watchedSizes.filter((s) => s !== size)
            : [...(watchedSizes || []), size]
        setValue("selectedSizes", updated)
    }

    // Calculate total images and filter displayed existing images
    const totalImages = remainingExistingImages.length + newImages.length
    const hasMinimumImages = totalImages >= 1
    const displayedExistingImages = existingImages.filter(img =>
        remainingExistingImages.includes(img.index)
    )

    const onSubmit = handleSubmit(async (data) => {
        // Validate images
        if (isEditMode && !hasMinimumImages) {
            return
        }

        const formData = new FormData()

        // Append new images
        if (newImages.length > 0) {
            newImages.forEach((file) => formData.append("images", file))
        }

        // For edit mode, include remainingImages
        if (isEditMode) {
            formData.append("remainingImages", JSON.stringify(remainingExistingImages))
        }

        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("category", data.category)
        formData.append("subCategory", data.subCategory)
        formData.append("price", data.price.toString())
        formData.append("stock", data.stock.toString())
        formData.append("sizes", JSON.stringify(data.selectedSizes))

        if (isEditMode && item?._id) {
            updateMutation.mutate({ id: item._id, formData })
        } else {
            insertMutation.mutate(formData, {
                onSuccess: () => {
                    reset();
                    setNewImages([])
                }
            })
        }
    })

    return {
        ...form,
        errors,
        watchedSizes,
        watchedImages,
        existingImages: displayedExistingImages,
        newImages,
        remainingExistingImages,
        totalImages,
        hasMinimumImages,
        handleImageChange,
        handleRemoveExistingImage,
        handleRemoveNewImage,
        handleSizeToggle,
        onSubmit,
        insertMutation,
        updateMutation,
        isEditMode,
        categories,
    }
}
