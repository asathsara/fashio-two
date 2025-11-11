// src/hooks/useAuth.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/authService';
import type { User } from '@/types/auth';
import { toast } from 'sonner';
import axios from 'axios';

// Fetch current user session
export const useCurrentUser = () => {
  return useQuery<User>({
    queryKey: ['currentUser'],
    queryFn: authService.getCurrentUser,
    retry: false, // don't retry if 401
  });
};

// Login
export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      toast.success('Logged in successfully');
    },
    onError: (error: unknown) => {
      let errorMessage = 'Login failed';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    },
  });
};

// Login with Google
export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: async () => {
      window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
    },
  });
};

// Register
export const useRegister = () => {
  return useMutation({
    mutationFn: ({ name, email, password }: { name: string; email: string; password: string }) =>
      authService.register(name, email, password),
    onSuccess: () => {
      toast.success('Registration successful! Please check your email to verify your account.');
    },
    onError: (error: unknown) => {
      let errorMessage = 'Registration failed';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    },
  });
};

// Logout
export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.clear(); // clear all cached data
      toast.success('Logged out successfully');
    },
    onError: (error: unknown) => {
      let errorMessage = 'Logout failed';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    },
  });
};

// Forgot Password
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
    onSuccess: () => {
      toast.success('Password reset email sent! Please check your inbox.');
    },
    onError: (error: unknown) => {
      let errorMessage = 'Failed to send reset email';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    },
  });
};

// Reset Password
export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ token, newPassword }: { token: string; newPassword: string }) =>
      authService.resetPassword(token, newPassword),
    onSuccess: () => {
      toast.success('Password reset successfully! You can now log in with your new password.');
    },
    onError: (error: unknown) => {
      let errorMessage = 'Failed to reset password';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    },
  });
};

// Verify Email
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (token: string) => authService.verifyEmail(token),
    onSuccess: () => {
      toast.success('Email verified successfully!');
    },
    onError: (error: unknown) => {
      let errorMessage = 'Email verification failed';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    },
  });
};

// Resend Verification Email
export const useResendVerification = () => {
  return useMutation({
    mutationFn: authService.resendVerificationEmail,
    onSuccess: () => {
      toast.success('Verification email sent! Please check your inbox.');
    },
    onError: (error: unknown) => {
      let errorMessage = 'Failed to send verification email';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    },
  });
};
