import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCategories, insertCategory, deleteCategory, insertSubCategory, deleteSubCategory } from '../services/categoryService';
import type { Category } from '@/types/category';

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
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
};

export const useInsertSubCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, name }: { id: string; name: string }) => insertSubCategory(id, name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
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
        },
    });
};