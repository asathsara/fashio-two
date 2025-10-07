import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/auth/AuthProvider';
import ProtectedRoute from './config/ProtectedRoute';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import { publicRoutes, adminRoutes, DEFAULT_ADMIN_ROUTE } from './config/routes';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes with PublicLayout */}
                    <Route element={<PublicLayout />}>
                        {publicRoutes.map((route) => {
                            if (route.protected) {
                                return (
                                    <Route key={route.path} element={<ProtectedRoute />}>
                                        <Route path={route.path} element={route.element} />
                                    </Route>
                                );
                            }
                            return (
                                <Route 
                                    key={route.path} 
                                    path={route.path} 
                                    element={route.element} 
                                />
                            );
                        })}
                    </Route>

                    {/* Admin Routes with AdminLayout and Protection */}
                    <Route element={<ProtectedRoute requiredRole="admin" />}>
                        <Route path="/admin" element={<AdminLayout />}>
                            {/* Redirect /admin to default admin route */}
                            <Route index element={<Navigate to={DEFAULT_ADMIN_ROUTE} replace />} />
                            
                            {adminRoutes.map((route) => (
                                <Route 
                                    key={route.path} 
                                    path={route.path} 
                                    element={route.element} 
                                />
                            ))}
                        </Route>
                    </Route>

                    {/* 404 Route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;