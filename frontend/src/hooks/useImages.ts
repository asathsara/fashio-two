import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchImages, uploadImage, deleteImage } from '../services/imageService';
import type { Image } from '../types/image';
import { toast } from 'sonner';
import axios from 'axios';

export const useImages = () => {
    return useQuery<Image[]>({
        queryKey: ['images'],
        queryFn: fetchImages,
    });
};

export const useUploadImage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: uploadImage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['images'] });
            toast.success('Image uploaded successfully');
        },
        onError: (error: unknown) => {
            let errorMessage = 'Failed to upload image';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
        },
    });
};

export const useDeleteImage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteImage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['images'] });
            toast.success('Image deleted successfully');
        },
        onError: (error: unknown) => {
            let errorMessage = 'Failed to delete image';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
        },
    });
};