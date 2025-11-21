import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {  z } from "zod"
import { itemSchema } from "@/schemas/itemSchema"
import { useInsertItem, useUpdateItem } from "@/hooks/useItems"
import { useEffect } from "react"
import type { Item } from "@/types/item"


type ItemForm = z.infer<typeof itemSchema>

interface UseItemFormProps {
    item?: Item | null
    isEditMode?: boolean
}


export function useItemForm({ item, isEditMode = false }: UseItemFormProps = {}) {
    const insertMutation = useInsertItem()
    const updateMutation = useUpdateItem()



    const form = useForm<ItemForm>({
        resolver: zodResolver(itemSchema),
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
        setTimeout(() => {
            if (isEditMode && item) {
                setValue("name", item.name)
                setValue("description", item.description || "")
                setValue("category", item.category._id)
                setValue("subCategory", item.category.subCategory?._id || "")
                setValue("price", item.price)
                setValue("stock", item.stock)
            }
        }, 500);
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
        formData.append("subCategory", data.subCategory)
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
