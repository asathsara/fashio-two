// src/hooks/useAuth.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/authService';
import type { User } from '@/types/auth';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/errorHandler';

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
      toast.error(getErrorMessage(error, 'Login failed'));
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
      toast.error(getErrorMessage(error, 'Registration failed'));
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
      toast.error(getErrorMessage(error, 'Logout failed'));
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
      toast.error(getErrorMessage(error, 'Failed to send reset email'));
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
      toast.error(getErrorMessage(error, 'Failed to reset password'));
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
      toast.error(getErrorMessage(error, 'Email verification failed'));
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
      toast.error(getErrorMessage(error, 'Failed to send verification email'));
    },
  });
};
