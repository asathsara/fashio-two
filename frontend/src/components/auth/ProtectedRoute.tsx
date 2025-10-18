// src/config/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/UseAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireAuth?: boolean; 
}

export const ProtectedRoute = ({
  children,
  requireAdmin = false,
  requireAuth = true,
}: ProtectedRouteProps) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If route requires auth but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If admin route but user is not admin
  if (requireAdmin && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // If route is public-only (login/register) but user already logged in
  if (!requireAuth && isAuthenticated) {
    const target = user?.role === "admin" ? "/admin" : "/";
    return <Navigate to={target} replace />;
  }

  return <>{children}</>;
};
