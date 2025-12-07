import { useQuery, useMutation, useQueryClient, type Query } from '@tanstack/react-query';
import { fetchPromos, insertPromo, deletePromo, updatePromo, updatePromoStatus } from '../services/promoService';
import type { Promo, PromoWithItem } from '@/types/promo';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/errorHandler';

// Helper predicate to invalidate all promo-affected queries
const isPromoRelatedQuery = (query: Query) => {
    const key = query.queryKey[0] as string;
    return ['promos', 'cart', 'items', 'item'].includes(key);
};

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
        onSuccess: async () => {
            await queryClient.invalidateQueries({ predicate: isPromoRelatedQuery });
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
        onSuccess: async () => {
            await queryClient.invalidateQueries({ predicate: isPromoRelatedQuery });
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
        onSuccess: async () => {
            await queryClient.invalidateQueries({ predicate: isPromoRelatedQuery });
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
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({ predicate: isPromoRelatedQuery });
            toast.success(variables.isPaused ? 'Promotion paused' : 'Promotion activated');
        },
        onError: (error: unknown) => {
            toast.error(getErrorMessage(error, 'Failed to update promotion status'));
        },
    });
};