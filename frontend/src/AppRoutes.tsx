import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, adminRoutes, DEFAULT_ADMIN_ROUTE } from "@/config/routes";
import { Suspense, lazy } from "react";
import { Spinner } from "./components/common/Spinner";

// Lazy load components for better code splitting
const ProtectedRoute = lazy(() => import("@/components/auth/ProtectedRoute").then(module => ({ default: module.ProtectedRoute })));
const PublicLayout = lazy(() => import("@/layouts/PublicLayout"));
const AdminLayout = lazy(() => import("@/layouts/AdminLayout"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

// Enhanced loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Spinner size="lg" fullHeight label="Loading..." />
  </div>
);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          {publicRoutes.map((route) => {
            if (route.requiredRole === "admin") return null; // skip admin
            const Element = (
              <Suspense fallback={<Spinner />}>
                <ProtectedRoute
                  requireAuth={!!route.protected}
                  requireAdmin={false}
                >
                  {route.element}
                </ProtectedRoute>
              </Suspense>
            );
            return <Route key={route.path} path={route.path} element={Element} />;
          })}
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={(
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute requireAdmin>
                <AdminLayout />
              </ProtectedRoute>
            </Suspense>
          )}
        >
          <Route index element={<Navigate to={DEFAULT_ADMIN_ROUTE} replace />} />
          {adminRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path.replace("/admin/", "")}
              element={<Suspense fallback={<Spinner />}>{route.element}</Suspense>}
            />
          ))}
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense>} />
      </Routes>
    </Suspense>
  );
};
