import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { authService } from "@/services/authService";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      authService.verifyEmail(token)
        .then(() => setMessage("✅ Email verified successfully! You can now log in."))
        .catch(() => setMessage("❌ Verification failed or token expired."));
    } else {
      setMessage("Invalid or missing token.");
    }
  }, [searchParams]);

  return (
    <div className="flex justify-center items-center h-screen text-lg">{message}</div>
  );
};

export default VerifyEmailPage;
