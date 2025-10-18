import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth';

interface ProtectedRouteProps {
    requiredRole?: 'admin' | 'user';
}

const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
    const { isAuthenticated, loading, user } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    console.log(isAuthenticated)
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;