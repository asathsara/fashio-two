import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService, type AdminUser } from '@/services/userService';
import { toast } from 'sonner';

const USERS_QUERY_KEY = ['admin', 'users'];

// Get all users
export const useUsers = () => {
    return useQuery<AdminUser[]>({
        queryKey: USERS_QUERY_KEY,
        queryFn: userService.getAllUsers,
    });
};

// Update user role
export const useUpdateUserRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userId, role }: { userId: string; role: 'user' | 'admin' }) =>
            userService.updateUserRole(userId, role),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
            toast.success('User role updated successfully');
        },
        onError: () => {
            toast.error('Failed to update user role');
        },
    });
};

// Delete user
export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userId: string) => userService.deleteUser(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
            toast.success('User deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete user');
        },
    });
};
