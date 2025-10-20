import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRegisterForm } from "@/hooks/auth/useRegisterForm";

export const RegisterForm = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    handleRegister,
  } = useRegisterForm();

  return (
    <form onSubmit={handleRegister} className="space-y-5">
      {error && (
        <Alert variant="destructive" className="text-sm">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
          Full Name
        </Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          className="h-11 text-base border-gray-300 focus:ring-2 focus:ring-gray-900"
          placeholder="John Doe"
        />
      </div>

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
          placeholder="Minimum 8 characters"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
          Confirm Password
        </Label>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
          className="h-11 text-base border-gray-300 focus:ring-2 focus:ring-gray-900"
          placeholder="Re-enter password"
        />
      </div>

      <Button
        type="submit"
        className="w-full h-11 text-base font-semibold bg-gray-900 hover:bg-gray-800 text-white mt-2"
        disabled={loading}
      >
        {loading ? "Creating account..." : "Create Account"}
      </Button>

      <p className="text-xs text-center text-gray-500 mt-4 leading-relaxed">
        By creating an account, you agree to our{" "}
        <span className="text-gray-700 font-medium">Terms of Service</span> and{" "}
        <span className="text-gray-700 font-medium">Privacy Policy</span>.
      </p>
    </form>
  );
};
