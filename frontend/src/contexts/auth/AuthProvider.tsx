import { type ReactNode } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext";
import { useCurrentUser, useForgotPassword, useGoogleLogin, useLogin, useLogout, useRegister, useResendVerification, useResetPassword, useVerifyEmail } from "@/hooks/useAuthQueries.ts";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data: user, isLoading: loading } = useCurrentUser();
  const isAuthenticated = !!user;

  // Mutations
  const login = useLogin();
  const loginWithGoogle = useGoogleLogin();
  const logout = useLogout();
  const register = useRegister();
  const forgotPassword = useForgotPassword();
  const resetPassword = useResetPassword();
  const verifyEmail = useVerifyEmail();
  const resendVerificationEmail = useResendVerification();

  const value: AuthContextType = {
    user: user || null,
    isAuthenticated,
    loading,

    // Each of these wraps the mutateAsync call to match AuthContextType
    login: async (email, password) => login.mutateAsync({ email, password }),
    loginWithGoogle: async () =>
      loginWithGoogle.mutateAsync(),
    register: async (name, email, password) =>
      register.mutateAsync({ name, email, password }),
    logout: async () => logout.mutateAsync(),
    forgotPassword: async (email) => forgotPassword.mutateAsync(email),
    resetPassword: async (token, newPassword) =>
      resetPassword.mutateAsync({ token, newPassword }),
    verifyEmail: async (token) => verifyEmail.mutateAsync(token),
    resendVerificationEmail: async () => resendVerificationEmail.mutateAsync(),
  };

  return (
    <AuthContext.Provider
      value={value}>
      {children}
    </AuthContext.Provider>
  );
};
