import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type User } from "./AuthContext";
import { authService } from "@/services/authService";


interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);
  // Fetch current user on mount
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = localStorage.getItem("fashio_auth_token");
        if (!token) {
          setLoading(false);
          return;
        }

        const userData = await authService.getCurrentUser();
        setUser(userData);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Session restore failed:", err);
        localStorage.removeItem("fashio_auth_token");
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  // Login
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { token, user } = await authService.login(email, password);
      localStorage.setItem("fashio_auth_token", token);
      setUser(user);
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const loginWithGoogle = async (credential?: string) => {
    setLoading(true);
    try {
      const data = await authService.loginWithGoogle(credential || '');
      setUser(data.user);
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      await authService.register(name, email, password);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Forgot password
  const forgotPassword = async (email: string) => {
    setLoading(true);
    try {
      await authService.forgotPassword(email);
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (token: string, newPassword: string) => {
    setLoading(true);
    try {
      await authService.resetPassword(token, newPassword);
    } finally {
      setLoading(false);
    }
  };

  // Verify email
  const verifyEmail = async (token: string) => {
    setLoading(true);
    try {
      await authService.verifyEmail(token);
    } finally {
      setLoading(false);
    }
  };

  // Resend verification email
  const resendVerificationEmail = async () => {
    setLoading(true);
    try {
      await authService.resendVerificationEmail();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        loginWithGoogle,
        register,
        logout,
        forgotPassword,
        resetPassword,
        verifyEmail,
        resendVerificationEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};