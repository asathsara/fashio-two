import { useState } from 'react';
import { useAuth } from '@/hooks/UseAuth';
import { useNavigate } from 'react-router-dom';

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (!email || !password) throw new Error('Please fill in all fields');
      await login(email, password);
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed');
      }
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      window.location.href = 'http://localhost:5000/api/auth/google'
      
    } catch {
      setError('Google login failed');
    }
  };

  return { email, setEmail, password, setPassword, error, loading, handleLogin, handleGoogleLogin };
};
