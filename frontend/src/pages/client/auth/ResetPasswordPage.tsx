import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authService } from "@/services/authService";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { KeyRound, CheckCircle2, XCircle } from "lucide-react";

const resetPasswordSchema = z.object({
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password is too long"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [tokenValid, setTokenValid] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setTokenValid(false);
      setError("Invalid or missing reset token.");
    }
  }, [searchParams]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    setLoading(true);
    setError("");

    try {
      const token = searchParams.get("token");
      if (!token) throw new Error("Missing token");

      await authService.resetPassword(token, data.password);
      setSuccess(true);

      // Redirect to login after 2 seconds
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to reset password. Please try again.");
      } else {
        setError("Failed to reset password. The link may have expired.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!tokenValid) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0">
            <CardContent className="pt-12 pb-8">
              <div className="flex justify-center mb-6">
                <XCircle className="w-20 h-20 text-red-500" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 text-center mb-3">
                Invalid Token
              </h1>
              <p className="text-center text-red-700 mb-8">
                {error}
              </p>
              <Button
                onClick={() => navigate("/login")}
                className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-base font-semibold"
              >
                Back to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0">
            <CardContent className="pt-12 pb-8">
              <div className="flex justify-center mb-6">
                <CheckCircle2 className="w-20 h-20 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 text-center mb-3">
                Password Reset Successful!
              </h1>
              <p className="text-center text-green-700 mb-8">
                Your password has been reset successfully. Redirecting to login...
              </p>
              <div className="text-center">
                <Button
                  onClick={() => navigate("/login")}
                  className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-base font-semibold"
                >
                  Go to Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardContent className="pt-8 pb-8">
            {/* Icon and Header */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <KeyRound className="w-8 h-8 text-gray-700" />
              </div>
            </div>

            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Reset Your Password
              </h1>
              <p className="text-gray-600">
                Enter your new password below
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* New Password */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                  New Password
                </Label>
                <Input
                  {...register("password")}
                  type="password"
                  className="h-11 text-base border-gray-300 focus:ring-2 focus:ring-gray-900"
                  placeholder="Enter new password"
                  disabled={loading}
                />
                {errors.password && (
                  <p className="text-xs text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                  Confirm Password
                </Label>
                <Input
                  {...register("confirmPassword")}
                  type="password"
                  className="h-11 text-base border-gray-300 focus:ring-2 focus:ring-gray-900"
                  placeholder="Confirm new password"
                  disabled={loading}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Password Requirements */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">Password Requirements:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• At least 6 characters long</li>
                  <li>• Both passwords must match</li>
                </ul>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 text-base font-semibold bg-gray-900 hover:bg-gray-800 mt-6"
              >
                {loading ? "Resetting Password..." : "Reset Password"}
              </Button>

              {/* Back to Login */}
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Back to Login
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-gray-900 font-semibold hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
