import { useState } from "react"
import { toast } from "sonner"
import aiService from "@/services/aiService"

interface AIDescriptionFormData {
    name: string
    price: number
    category: string
    subCategory: string
    description?: string
}

interface ValidationError {
    field: string
    message: string
}

interface UseAIDescriptionProps {
    watch: <T extends keyof AIDescriptionFormData>(
        name: T
    ) => AIDescriptionFormData[T]

    setValue: <T extends keyof AIDescriptionFormData>(
        name: T,
        value: AIDescriptionFormData[T],
        options?: { shouldValidate: boolean }
    ) => void

    newImages: File[]
}


interface UseAIDescriptionReturn {
    isGenerating: boolean
    generateDescription: () => Promise<void>
}

const validateFormData = (data: Partial<AIDescriptionFormData>): ValidationError | null => {
    if (!data.name || !data.name.trim()) {
        return { field: "name", message: "Please enter a product name first" }
    }
    if (!data.price || data.price <= 0) {
        return { field: "price", message: "Please enter a valid price first" }
    }
    if (!data.category) {
        return { field: "category", message: "Please select a category first" }
    }
    if (!data.subCategory) {
        return { field: "subCategory", message: "Please select a subcategory first" }
    }
    return null
}

const getFormData = (
    watch: (name: keyof AIDescriptionFormData) => AIDescriptionFormData[keyof AIDescriptionFormData]
): Partial<AIDescriptionFormData> => {
    return {
        name: watch("name") as string,
        price: watch("price") as number,
        category: watch("category") as string,
        subCategory: watch("subCategory") as string,
    }
}

const getFirstImage = (images: File[]): File | undefined => {
    return images.length > 0 ? images[0] : undefined
}

export const useAIDescription = ({
    watch,
    setValue,
    newImages,
}: UseAIDescriptionProps): UseAIDescriptionReturn => {
    const [isGenerating, setIsGenerating] = useState(false)

    const generateDescription = async () => {
        try {
            // Get and validate form data
            const formData = getFormData(watch)
            const validationError = validateFormData(formData)

            if (validationError) {
                toast.error(validationError.message)
                return
            }

            // Get the first image if available
            const firstImage = getFirstImage(newImages)

            // Start generation
            setIsGenerating(true)
            toast.loading("Generating description with AI...")

            const description = await aiService.generateDescription({
                title: formData.name!,
                price: formData.price!,
                categoryId: formData.category!,
                subCategoryId: formData.subCategory!,
                image: firstImage,
            })

            // Update form with generated description
            setValue("description", description, { shouldValidate: true })

            toast.dismiss()
            toast.success("Description generated successfully!")
        } catch (error) {
            toast.dismiss()
            console.error("Failed to generate description:", error)
            toast.error("Failed to generate description. Please try again.")
        } finally {
            setIsGenerating(false)
        }
    }

    return {
        isGenerating,
        generateDescription,
    }
}
