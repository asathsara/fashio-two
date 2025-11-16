import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchImages, uploadImage, deleteImage } from '../services/imageService';
import type { Image } from '../types/image';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/errorHandler';

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
            toast.error(getErrorMessage(error, 'Failed to upload image'));
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
            toast.error(getErrorMessage(error, 'Failed to delete image'));
        },
    });
};