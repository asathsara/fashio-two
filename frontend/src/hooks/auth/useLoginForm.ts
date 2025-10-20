import { useState } from 'react';
import { useAuth } from '@/hooks/UseAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { login, loading, loginWithGoogle } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (!email || !password) throw new Error('Please fill in all fields');
      await login(email, password); // throws if 401
      navigate('/');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || 'Login failed';
        setError(message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong');
      }
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      loginWithGoogle();
    } catch {
      setError('Google login failed');
    }
  };

  return { email, setEmail, password, setPassword, error, loading, handleLogin, handleGoogleLogin };
};
