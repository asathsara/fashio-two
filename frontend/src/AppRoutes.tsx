import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { publicRoutes, adminRoutes, DEFAULT_ADMIN_ROUTE } from "@/config/routes";
import { Suspense, lazy } from "react";
import { Spinner } from "./components/common/Spinner";
import { AsyncErrorBoundary, RouteErrorBoundary } from "@/error-boundaries";

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
  const location = useLocation();
  const resetKeys = [location.pathname];
  const sharedPageSpinner = <Spinner fullHeight label="Loading page..." />;

  return (
    <RouteErrorBoundary routeName="AppRoutes" resetKeys={resetKeys}>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route
            element={(
              <RouteErrorBoundary routeName="PublicLayout" resetKeys={resetKeys}>
                <AsyncErrorBoundary
                  label="Loading layout"
                  suspenseFallback={<PageLoader />}
                  resetKeys={resetKeys}
                  name="PublicLayoutAsync"
                >
                  <PublicLayout />
                </AsyncErrorBoundary>
              </RouteErrorBoundary>
            )}
          >
            {publicRoutes.map((route) => {
              if (route.requiredRole === "admin") return null;
              const label = route.label ?? route.path;
              const element = (
                <RouteErrorBoundary routeName={label} resetKeys={resetKeys}>
                  <ProtectedRoute
                    requireAuth={Boolean(route.protected)}
                    requireAdmin={false}
                  >
                    <AsyncErrorBoundary
                      label={`Loading ${label}`}
                      suspenseFallback={sharedPageSpinner}
                      resetKeys={resetKeys}
                      name={`${label}-async`}
                    >
                      {route.element}
                    </AsyncErrorBoundary>
                  </ProtectedRoute>
                </RouteErrorBoundary>
              );

              return <Route key={route.path} path={route.path} element={element} />;
            })}
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={(
              <RouteErrorBoundary routeName="AdminLayout" resetKeys={resetKeys}>
                <ProtectedRoute requireAdmin>
                  <AsyncErrorBoundary
                    label="Loading admin layout"
                    suspenseFallback={<PageLoader />}
                    resetKeys={resetKeys}
                    name="AdminLayoutAsync"
                  >
                    <AdminLayout />
                  </AsyncErrorBoundary>
                </ProtectedRoute>
              </RouteErrorBoundary>
            )}
          >
            <Route index element={<Navigate to={DEFAULT_ADMIN_ROUTE} replace />} />
            {adminRoutes.map((route) => {
              const label = route.label ?? route.path;
              return (
                <Route
                  key={route.path}
                  path={route.path.replace("/admin/", "")}
                  element={(
                    <RouteErrorBoundary routeName={label} resetKeys={resetKeys}>
                      <AsyncErrorBoundary
                        label={`Loading ${label}`}
                        suspenseFallback={sharedPageSpinner}
                        resetKeys={resetKeys}
                        name={`${label}-async`}
                      >
                        {route.element}
                      </AsyncErrorBoundary>
                    </RouteErrorBoundary>
                  )}
                />
              );
            })}
          </Route>

          {/* Fallback */}
          <Route
            path="*"
            element={(
              <RouteErrorBoundary routeName="NotFound" resetKeys={resetKeys}>
                <AsyncErrorBoundary
                  label="Loading fallback"
                  suspenseFallback={<PageLoader />}
                  resetKeys={resetKeys}
                  name="NotFoundAsync"
                >
                  <NotFoundPage />
                </AsyncErrorBoundary>
              </RouteErrorBoundary>
            )}
          />
        </Routes>
      </Suspense>
    </RouteErrorBoundary>
  );
};
