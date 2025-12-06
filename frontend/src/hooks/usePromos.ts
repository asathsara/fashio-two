import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPromos, insertPromo, deletePromo, updatePromo, updatePromoStatus } from '../services/promoService';
import type { Promo, PromoWithItem } from '@/types/promo';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/errorHandler';

export const usePromos = () => {
    return useQuery<PromoWithItem[]>({
        queryKey: ['promos'],
        queryFn: fetchPromos,
        staleTime: 1000 * 60 * 5, // 5 minutes
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

export const useUpdatePromo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, promo }: { id: string; promo: Omit<Promo, "_id"> }) => updatePromo(id, promo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['promos'] });
            toast.success('Promo updated successfully');
        },
        onError: (error: unknown) => {
            toast.error(getErrorMessage(error, 'Failed to update promo'));
        },
    });
};

type TogglePromoStatusVariables = { id: string; isPaused: boolean };

export const useTogglePromoStatus = () => {
    const queryClient = useQueryClient();

    return useMutation<Promo, unknown, TogglePromoStatusVariables>({
        mutationFn: ({ id, isPaused }) => updatePromoStatus(id, isPaused),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['promos'] });
            toast.success(variables.isPaused ? 'Promotion paused' : 'Promotion activated');
        },
        onError: (error: unknown) => {
            toast.error(getErrorMessage(error, 'Failed to update promotion status'));
        },
    });
};