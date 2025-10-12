import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRegisterForm } from '@/hooks/auth/useRegisterForm';

export const RegisterForm = () => {
  const { name, setName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, error, loading, handleRegister } = useRegisterForm();

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label>Full Name</Label>
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={loading} />
      </div>

      <div className="space-y-2">
        <Label>Email</Label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
      </div>

      <div className="space-y-2">
        <Label>Password</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
      </div>

      <div className="space-y-2">
        <Label>Confirm Password</Label>
        <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={loading} />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>
  );
};
