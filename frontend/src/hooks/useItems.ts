import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchItems, insertItem, deleteItem } from '../services/itemService';
import type { Item } from '@/types/item';
import { toast } from 'sonner';
import axios from 'axios';

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
            let errorMessage = 'Failed to add item';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
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
            let errorMessage = 'Failed to delete item';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
        },
    });
};