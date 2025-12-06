import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCategories, insertCategory, deleteCategory, insertSubCategory, deleteSubCategory } from '../services/categoryService';
import type { Category } from '@/types/category';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/errorHandler';

export const useCategories = () => {
    return useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useInsertCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (name: string) => insertCategory(name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Category created successfully');
        },
        onError: (error: unknown) => {
            toast.error(getErrorMessage(error, 'Failed to create category'));
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Category deleted successfully');
        },
        onError: (error: unknown) => {
            toast.error(getErrorMessage(error, 'Failed to delete category'));
        },
    });
};

export const useInsertSubCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, name }: { id: string; name: string }) => insertSubCategory(id, name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Subcategory created successfully');
        },
        onError: (error: unknown) => {
            toast.error(getErrorMessage(error, 'Failed to create subcategory'));
        },
    });
};

export const useDeleteSubCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ categoryId, subItemName }: { categoryId: string; subItemName: string }) =>
            deleteSubCategory(categoryId, subItemName),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Subcategory deleted successfully');
        },
        onError: (error: unknown) => {
            toast.error(getErrorMessage(error, 'Failed to delete subcategory'));
        },
    });
};