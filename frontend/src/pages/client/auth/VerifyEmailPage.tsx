import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authService } from "@/services/authService";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2, Mail } from "lucide-react";

type VerificationStatus = 'loading' | 'success' | 'error' | 'invalid';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<VerificationStatus>('loading');
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus('invalid');
      setMessage("Invalid or missing verification token.");
      return;
    }

    // Verify email with token
    authService.verifyEmail(token)
      .then(() => {

        setStatus('success');
        setMessage("Your email has been verified successfully!");
      })
      .catch((error) => {

        setStatus('error');
        const errorMessage = error?.response?.data?.message || "Verification failed or token expired.";
        setMessage(errorMessage);
      });
  }, [searchParams]);

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-20 h-20 text-gray-400 animate-spin" />;
      case 'success':
        return <CheckCircle2 className="w-20 h-20 text-green-500" />;
      case 'error':
      case 'invalid':
        return <XCircle className="w-20 h-20 text-red-500" />;
      default:
        return <Mail className="w-20 h-20 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'text-green-700';
      case 'error':
      case 'invalid':
        return 'text-red-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardContent className="pt-12 pb-8">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              {getStatusIcon()}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-3">
              {status === 'loading' && 'Verifying Email'}
              {status === 'success' && 'Email Verified!'}
              {status === 'error' && 'Verification Failed'}
              {status === 'invalid' && 'Invalid Token'}
            </h1>

            {/* Message */}
            <p className={`text-center mb-8 ${getStatusColor()}`}>
              {message}
            </p>

            {/* Actions */}
            <div className="space-y-3">
              {status === 'success' && (
                <>
                  <Button
                    onClick={() => navigate('/login')}
                    className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-base font-semibold"
                  >
                    Go to Login
                  </Button>
                  <Button
                    onClick={() => navigate('/')}
                    variant="outline"
                    className="w-full h-11 text-base font-medium"
                  >
                    Go to Home
                  </Button>
                </>
              )}

              {(status === 'error' || status === 'invalid') && (
                <>
                  <Button
                    onClick={() => navigate('/login')}
                    className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-base font-semibold"
                  >
                    Back to Login
                  </Button>
                  <Button
                    onClick={() => window.location.href = 'mailto:support@fashio.com'}
                    variant="outline"
                    className="w-full h-11 text-base font-medium"
                  >
                    Contact Support
                  </Button>
                </>
              )}

              {status === 'loading' && (
                <div className="text-center text-sm text-gray-500">
                  Please wait while we verify your email...
                </div>
              )}
            </div>

            {/* Additional Info */}
            {status === 'success' && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 text-center">
                  You can now sign in and start shopping with your verified account.
                </p>
              </div>
            )}

            {status === 'error' && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800 text-center">
                  The verification link may have expired. Please request a new verification email.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Need help?{' '}
            <button
              onClick={() => navigate('/help')}
              className="text-gray-900 font-semibold hover:underline cursor-pointer"
            >
              Visit our Help Center
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
