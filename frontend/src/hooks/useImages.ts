import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchImages, uploadImage, deleteImage } from '../services/imageService';
import type { Image } from '../types/image';

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
        },
    });
};

export const useDeleteImage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteImage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['images'] });
        },
    });
};