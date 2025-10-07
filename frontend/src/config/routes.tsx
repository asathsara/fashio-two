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
import LoginPage from "../pages/client/LoginPage";
import ProfilePage from "../pages/client/ProfilePage";

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
        path: "/login",
        label: "Login",
        element: <LoginPage />,
        showInNav: true
    },
    {
        path: "/profile",
        label: "Profile",
        element: <ProfilePage />,
        showInNav: false,
        protected: true
    }
];

// Admin routes (protected)
export const adminRoutes: AppRoute[] = [
    {
        path: "/admin/image-slider",
        label: "Image Slider",
        element: <ImageSliderManagerPage />,
        showInNav: true,
        protected: true,
        requiredRole: 'admin'
    },
    {
        path: "/admin/items/insert",
        label: "Items Insert",
        element: <ItemInsertPage />,
        showInNav: true,
        protected: true,
        requiredRole: 'admin'
    },
    {
        path: "/admin/items/list",
        label: "Items List",
        element: <ItemListPage />,
        showInNav: true,
        protected: true,
        requiredRole: 'admin'
    },
    {
        path: "/admin/categories",
        label: "Categories",
        element: <CategoriesInsertPage />,
        showInNav: true,
        protected: true,
        requiredRole: 'admin'
    },
    {
        path: "/admin/promo",
        label: "Promo",
        element: <PromoAddPage />,
        showInNav: true,
        protected: true,
        requiredRole: 'admin'
    }
];

// All routes combined
export const allRoutes = [...publicRoutes, ...adminRoutes];

// Navigation routes (filtered for nav display)
export const publicNavRoutes = publicRoutes.filter(r => r.showInNav === true);
export const adminNavRoutes = adminRoutes.filter(r => r.showInNav === true);

// Default routes
export const DEFAULT_PUBLIC_ROUTE = "/";
export const DEFAULT_ADMIN_ROUTE = "/admin/image-slider";