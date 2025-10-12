import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLoginForm } from '@/hooks/auth/useLoginForm';

interface LoginFormProps {
    onForgotPassword: () => void;
}

export const LoginForm = ({ onForgotPassword }: LoginFormProps) => {
    const { email, setEmail, password, setPassword, error, loading, handleLogin, handleGoogleLogin } = useLoginForm();

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
            </div>

            <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <Button type="button" variant="outline" className="w-full" onClick={handleGoogleLogin}>
                Sign in with Google
            </Button>
            <button
                type="button"
                onClick={onForgotPassword}
                className="text-sm text-blue-600 hover:underline mt-2"
            >
                Forgot Password?
            </button>
        </form>
    );
};
