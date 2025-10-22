import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPromos, insertPromo, deletePromo } from '../services/promoService';

export const usePromos = () => {
    return useQuery({
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
        },
    });
};

export const useDeletePromo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePromo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['promos'] });
        },
    });
};