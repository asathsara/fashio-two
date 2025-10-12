// pages/client/ForgotPasswordPage.tsx
import { useState } from "react";
import { authService } from "@/services/authService";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      await authService.forgotPassword(email);
      setMessage("✅ Password reset link sent to your email.");
    } catch {
      setMessage("❌ Failed to send email.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <input
        type="email"
        className="border p-2 rounded w-64"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send Reset Link
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPasswordPage;

