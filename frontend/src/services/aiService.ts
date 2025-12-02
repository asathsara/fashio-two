import api from './api';
import API_ENDPOINTS from './endpoints';

export interface GenerateDescriptionRequest {
    title: string;
    price: number;
    categoryId: string;
    subCategoryId: string;
    image?: File;
}

export interface GenerateDescriptionResponse {
    success: boolean;
    description: string;
}

class AIService {
   
    async generateDescription(data: GenerateDescriptionRequest): Promise<string> {
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('price', data.price.toString());
        formData.append('categoryId', data.categoryId);
        formData.append('subCategoryId', data.subCategoryId);

        // Add only the first image if provided
        if (data.image) {
            formData.append('image', data.image);
        }

        const response = await api.post<GenerateDescriptionResponse>(
            API_ENDPOINTS.AI_GENERATE_DESCRIPTION,
            formData,
        );

        return response.data.description;
    }
}

export default new AIService();
