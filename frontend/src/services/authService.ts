import api from './api';
import type { Address } from '@/types/auth';

export const authService = {
    login: async (email: string, password: string) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },

    register: async (name: string, email: string, password: string) => {
        const response = await api.post('/auth/register', { name, email, password });
        return response.data;
    },

    loginWithGoogle: async () => {
        const response = await api.get('/auth/google');
        return response.data;
    },

    logout: async () => {
        const response = await api.post('/auth/logout ');
        return response.data;
    },

    forgotPassword: async (email: string) => {
        const response = await api.post('/auth/forgot-password', { email });
        return response.data;
    },

    resetPassword: async (token: string, newPassword: string) => {
        const response = await api.post('/auth/reset-password', { token, newPassword });
        return response.data;
    },

    verifyEmail: async (token: string) => {
        const response = await api.post('/auth/verify-email', { token });
        return response.data;
    },

    resendVerificationEmail: async () => {
        const response = await api.post('/auth/resend-verification');
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },

    updateProfile: async (profileData: { name?: string; email?: string; address?: Address }) => {
        const response = await api.put('/auth/profile', profileData);
        return response.data;
    },

    changePassword: async (currentPassword: string, newPassword: string) => {
        const response = await api.put('/auth/change-password', {
            currentPassword,
            newPassword
        });
        return response.data;
    },
};