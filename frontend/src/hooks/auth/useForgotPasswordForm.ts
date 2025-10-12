import { useState } from 'react';
import { useAuth } from '@/hooks/UseAuth';

export const useForgotPasswordForm = () => {
  const { forgotPassword, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (!email) throw new Error('Please enter your email');
      await forgotPassword(email);
      setSuccess('Password reset link sent! Check your email.');
      setEmail('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to send reset email');
      }
    }
  };

  return { email, setEmail, error, success, loading, handleForgotPassword };
};
