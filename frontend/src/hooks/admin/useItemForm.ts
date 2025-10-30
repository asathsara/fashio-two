import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { itemSchema } from "@/schemas/itemSchema"
import { useInsertItem } from "@/hooks/useItems"
import { toast } from "sonner"

type ItemForm = z.infer<typeof itemSchema>

export function useItemForm() {
    const insertMutation = useInsertItem()

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
        data.images.forEach((file) => formData.append("images", file))
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("category", data.category)
        formData.append("subCategory", data.subCategory)
        formData.append("price", data.price.toString())
        formData.append("stock", data.stock.toString())
        formData.append("selectedSizes", JSON.stringify(data.selectedSizes))

        console.log("Form Data to be submitted:", {
            name: data.name,
            description: data.description,
            category: data.category,
            subCategory: data.subCategory,
            price: data.price,
            stock: data.stock,
            selectedSizes: data.selectedSizes,
            images: data.images,
        })
        //insertMutation.mutate(formData)
        toast.success("Item added successfully!")
        reset()
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
    }
}
