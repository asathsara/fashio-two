import api from './api';
import { AUTH_ENDPOINTS } from './endpoints';

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    emailVerified: boolean;
    avatar?: string;
    createdAt: string;
    lastLogin?: string;
}

export const userService = {
    // Get all users (admin only)
    getAllUsers: async (): Promise<AdminUser[]> => {
        const response = await api.get(AUTH_ENDPOINTS.ADMIN_USERS);
        return response.data;
    },

    // Update user role (admin only)
    updateUserRole: async (userId: string, role: 'user' | 'admin'): Promise<void> => {
        await api.put(AUTH_ENDPOINTS.ADMIN_UPDATE_USER_ROLE(userId), { role });
    },

    // Delete user (admin only)
    deleteUser: async (userId: string): Promise<void> => {
        await api.delete(AUTH_ENDPOINTS.ADMIN_DELETE_USER(userId));
    },
};

export default userService;
