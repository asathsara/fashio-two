import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authService } from "@/services/authService";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      const token = searchParams.get("token");
      if (!token) throw new Error("Missing token");
      await authService.resetPassword(token, password);
      setMessage("✅ Password reset successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setMessage("❌ Failed to reset password.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <input
        type="password"
        className="border p-2 rounded w-64"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleReset}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Reset Password
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPasswordPage;
