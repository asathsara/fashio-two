import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Layouts
import AdminLayout from "@/layouts/AdminLayout";
import PublicLayout from "@/layouts/PublicLayout";

// Client Pages
import HomePage from "@/pages/client/HomePage";
import LoginPage from "@/pages/client/LoginPage";
import ProfilePage from "@/pages/client/ProfilePage";
import PromoPage from "@/pages/client/PromoPage";
import HelpPage from "@/pages/client/HelpPage";

// Admin Pages
import ItemListPage from "@/pages/admin/ItemListPage";
import ItemInsertPage from "@/pages/admin/ItemInsertPage";
import CategoriesInsertPage from "@/pages/admin/CategoriesInsertPage";
import ImageSliderManagerPage from "@/pages/admin/ImageSliderManagerPage";
import PromoAddPage from "@/pages/admin/PromoAddPge";

export const DEFAULT_ADMIN_ROUTE = "/admin/image-slider";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/promo" element={<PromoPage />} />
        <Route path="/help" element={<HelpPage />} />

        {/* Login - only visible if logged out */}
        <Route
          path="/login"
          element={
            <ProtectedRoute requireAuth={false}>
              <LoginPage />
            </ProtectedRoute>
          }
        />

        {/* Authenticated client route */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
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
        <Route path="items" element={<ItemListPage />} />
        <Route path="items/new" element={<ItemInsertPage />} />
        <Route path="categories" element={<CategoriesInsertPage />} />
        <Route path="slider" element={<ImageSliderManagerPage />} />
        <Route path="promos" element={<PromoAddPage />} />
      </Route>

      {/* 404 Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
