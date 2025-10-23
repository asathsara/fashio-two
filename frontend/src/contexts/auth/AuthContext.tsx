
import type { User } from '@/types/auth';
import { createContext } from 'react';

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;        // derived: !!user
    loading: boolean;

    login: (email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;

    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, newPassword: string) => Promise<void>;
    verifyEmail: (token: string) => Promise<void>;
    resendVerificationEmail: () => Promise<void>;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

