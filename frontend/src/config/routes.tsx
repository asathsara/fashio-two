import type { ReactElement } from "react";

// Admin Pages
import ImageSliderManagerPage from "../pages/admin/ImageSliderManagerPage";
import ItemInsertPage from "../pages/admin/ItemInsertPage";
import ItemListPage from "../pages/admin/ItemListPage";
import CategoriesInsertPage from "../pages/admin/CategoriesInsertPage";
import PromoAddPage from "../pages/admin/PromoAddPge";

// Client Pages
import HomePage from "../pages/client/HomePage";
import PromoPage from "../pages/client/PromoPage";
import HelpPage from "../pages/client/HelpPage";
import ProfilePage from "../pages/client/ProfilePage";
import VerifyEmailPage from "@/pages/client/auth/VerifyEmailPage";
import ResetPasswordPage from "@/pages/client/auth/ResetPasswordPage";

export type AppRoute = {
    path: string;
    label: string;
    element: ReactElement;
    showInNav?: boolean;
    protected?: boolean;
    requiredRole?: 'admin' | 'user';
};

// Public routes (client-facing)
export const publicRoutes: AppRoute[] = [
    {
        path: "/",
        label: "Home",
        element: <HomePage />,
        showInNav: false
    },
    {
        path: "/promo",
        label: "Promo",
        element: <PromoPage />,
        showInNav: true
    },
    {
        path: "/help",
        label: "Help",
        element: <HelpPage />,
        showInNav: true
    },
    {
        path: "/profile",
        label: "Profile",
        element: <ProfilePage />,
        showInNav: false,
        protected: true
    },
    {
    path: "/verify-email",
    label: "Verify Email",
    element: <VerifyEmailPage />,
    showInNav: false,
  },
  {
    path: "/reset-password",
    label: "Reset Password",
    element: <ResetPasswordPage />,
    showInNav: false,
  }
];

// Admin routes (protected)
export const adminRoutes: AppRoute[] = [
    {
        path: "/admin/image-slider",
        label: "Image Slider",
        element: <ImageSliderManagerPage />,
        protected: true,
        requiredRole: 'admin'
    },
    {
        path: "/admin/items/insert",
        label: "Items Insert",
        element: <ItemInsertPage />,
        protected: true,
        requiredRole: 'admin'
    },
    {
        path: "/admin/items/list",
        label: "Items List",
        element: <ItemListPage />,
        protected: true,
        requiredRole: 'admin'
    },
    {
        path: "/admin/categories",
        label: "Categories",
        element: <CategoriesInsertPage />,
        protected: true,
        requiredRole: 'admin'
    },
    {
        path: "/admin/promo",
        label: "Promo",
        element: <PromoAddPage />,
        protected: true,
        requiredRole: 'admin'
    }
];

// Navigation routes (filtered for nav display)
export const publicNavRoutes = publicRoutes.filter(r => r.showInNav === true);
export const adminNavRoutes = adminRoutes

