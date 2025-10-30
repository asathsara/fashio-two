import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/UseAuth";
import { Spinner } from "../common/Spinner";

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
    return <Spinner/>
  }

  // If route requires auth but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If admin route but user is not admin
  if (requireAdmin && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
