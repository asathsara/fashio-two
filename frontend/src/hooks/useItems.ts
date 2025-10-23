import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchItems, insertItem, deleteItem } from '../services/itemService';
import type { Item } from '@/types/item';

export const useItems = () => {
    return useQuery<Item[]>({
        queryKey: ['items'],
        queryFn: fetchItems,
    });
};

export const useInsertItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: insertItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
        },
    });
};

export const useDeleteItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
        },
    });
};