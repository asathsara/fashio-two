import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPromos, insertPromo, deletePromo } from '../services/promoService';
import type { PromoWithItem } from '@/types/promo';
import { toast } from 'sonner';
import axios from 'axios';

export const usePromos = () => {
    return useQuery<PromoWithItem[]>({
        queryKey: ['promos'],
        queryFn: fetchPromos,
    });
};

export const useInsertPromo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: insertPromo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['promos'] });
            toast.success('Promo created successfully');
        },
        onError: (error: unknown) => {
            let errorMessage = 'Failed to create promo';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
        },
    });
};

export const useDeletePromo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePromo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['promos'] });
            toast.success('Promo deleted successfully');
        },
        onError: (error: unknown) => {
            let errorMessage = 'Failed to delete promo';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
        },
    });
};