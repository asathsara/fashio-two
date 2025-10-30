import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLoginForm } from "@/hooks/auth/useLoginForm";
import { GoogleSignInButton } from "./GoogleSigninButton";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        error,
        loading,
        handleLogin,
        handleGoogleLogin,
    } = useLoginForm();

    const navigate = useNavigate();

    return (
        <form onSubmit={handleLogin} className="space-y-5">
            {error && (
                <Alert variant="destructive" className="text-sm">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <div className="space-y-2">
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Email Address
                </Label>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="h-11 text-base border-gray-300 focus:ring-2 focus:ring-gray-900"
                    placeholder="you@example.com"
                />
            </div>

            <div className="space-y-2">
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Password
                </Label>

                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="h-11 text-base border-gray-300 focus:ring-2 focus:ring-gray-900"
                    placeholder="Enter your password"
                />
                <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-xs text-gray-600 hover:text-gray-900 transition-colors font-medium cursor-pointer"
                >
                    Forgot Password?
                </button>
            </div>

            <Button
                type="submit"
                className="w-full h-11 text-base font-semibold bg-gray-900 hover:bg-gray-800 text-white"
                disabled={loading}
            >
                {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-3 text-gray-500 font-medium">Or</span>
                </div>
            </div>

            <GoogleSignInButton onClick={handleGoogleLogin} />
        </form>
    );
};

export default LoginForm;


