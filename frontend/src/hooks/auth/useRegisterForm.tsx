import { useState } from 'react';
import { useAuth } from '@/hooks/UseAuth';

export const useRegisterForm = () => {
  const { register, loading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (!name || !email || !password) throw new Error('Please fill in all fields');
      if (password !== confirmPassword) throw new Error('Passwords do not match');
      if (password.length < 6) throw new Error('Password must be at least 6 characters');

      await register(name, email, password);
      alert('Registration successful! Check your email to verify your account.');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Registration failed');
      }
    }
  };

  return { name, setName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, error, loading, handleRegister };
};
