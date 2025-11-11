import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPromos, insertPromo, deletePromo } from '../services/promoService';
import type { PromoWithItem } from '@/types/promo';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/errorHandler';

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
            toast.error(getErrorMessage(error, 'Failed to create promo'));
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
            toast.error(getErrorMessage(error, 'Failed to delete promo'));
        },
    });
};