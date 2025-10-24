import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { publicRoutes, adminRoutes, DEFAULT_ADMIN_ROUTE } from "@/config/routes";
import PublicLayout from "@/layouts/PublicLayout";
import AdminLayout from "@/layouts/AdminLayout";
import NotFoundPage from "@/pages/NotFoundPage";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        {publicRoutes.map((route) => {
          if (route.requiredRole === "admin") return null; // skip admin here
          const Element = (
            <ProtectedRoute
              requireAuth={!!route.protected}
              requireAdmin={false}
            >
              {route.element}
            </ProtectedRoute>
          );
          return <Route key={route.path} path={route.path} element={Element} />;
        })}
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={DEFAULT_ADMIN_ROUTE} replace />} />
        {adminRoutes.map((route) => (
          <Route key={route.path} path={route.path.replace("/admin/", "")} element={route.element} />
        ))}
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
