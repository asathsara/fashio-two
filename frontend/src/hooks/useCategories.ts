import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCategories, insertCategory, deleteCategory, insertSubCategory, deleteSubCategory } from '../services/categoryService';
import type { Category } from '@/types/category';
import { toast } from 'sonner';
import axios from 'axios';

export const useCategories = () => {
    return useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: fetchCategories,
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
            let errorMessage = 'Failed to create category';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
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
            let errorMessage = 'Failed to delete category';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
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
            let errorMessage = 'Failed to create subcategory';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
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
            let errorMessage = 'Failed to delete subcategory';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
        },
    });
};