import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchItems, insertItem, deleteItem } from '../services/itemService';
import type { Item } from '@/types/item';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/errorHandler';

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
            toast.success('Item added successfully');
        },
        onError: (error: unknown) => {
            toast.error(getErrorMessage(error, 'Failed to add item'));
        },
    });
};

export const useDeleteItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
            toast.success('Item deleted successfully');
        },
        onError: (error: unknown) => {
            toast.error(getErrorMessage(error, 'Failed to delete item'));
        },
    });
};