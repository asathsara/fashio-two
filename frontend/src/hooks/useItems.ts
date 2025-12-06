import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchItems, insertItem, updateItem, deleteItem, fetchItemById } from '../services/itemService';
import type { Item } from '@/types/item';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/errorHandler';

export const useItems = () => {
    return useQuery<Item[]>({
        queryKey: ['items'],
        queryFn: fetchItems,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useGetItem = (id: string, isEditMode: boolean) => {
    return useQuery<Item>({
        queryKey: ['item', id],
        queryFn: () => fetchItemById(id),
        enabled: isEditMode,
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

export const useUpdateItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
            updateItem(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
            toast.success('Item updated successfully');
        },
        onError: (error: unknown) => {
            toast.error(getErrorMessage(error, 'Failed to update item'));
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