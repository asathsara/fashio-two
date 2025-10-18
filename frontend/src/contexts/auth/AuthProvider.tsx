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

  // Update authentication state whenever user changes
  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  // Restore session on mount - ONLY ONCE
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
        setIsAuthenticated(true);
      } catch (err: unknown) {
        const status = (err as { response?: { status?: number } })?.response?.status;

        // Ignore 401 - expected for unauthenticated users
        if (status !== 401) {
          console.error("Session restore failed:", err);
        }

        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);


  // Login with email/password
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { user } = await authService.login(email, password); // backend sets cookie
      setUser(user);
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  // Login with Google
  const loginWithGoogle = async (credential?: string) => {
    setLoading(true);
    try {
      const { user } = await authService.loginWithGoogle(credential || "");
      setUser(user);
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout(); // backend clears cookie
      setUser(null);
      setIsAuthenticated(false);
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
