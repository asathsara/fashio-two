import type { NavItem } from "@/types/nav";
import { lazy } from "react";


// Client Pages - Lazy loaded for code splitting

const HomePage = lazy(() => import("@/pages/client/HomePage"));
const PromoPage = lazy(() => import("@/pages/client/PromoPage"));
const HelpPage = lazy(() => import("@/pages/client/HelpPage"));
const ProfilePage = lazy(() => import("@/pages/client/ProfilePage"));
const ItemDetailPage = lazy(() => import("@/pages/client/ItemDetailPage"));
const CartPage = lazy(() => import("@/pages/client/CartPage"));
const CheckoutPage = lazy(() => import("@/pages/client/CheckoutPage"));
const LoginPage = lazy(() => import("@/pages/client/LoginPage"));

// Auth Pages
const VerifyEmailPage = lazy(() => import("@/pages/client/auth/VerifyEmailPage"));
const ResetPasswordPage = lazy(() => import("@/pages/client/auth/ResetPasswordPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/client/auth/ForgotPasswordPage"));
// Admin Pages - Lazy loaded for code splitting

const OrderDashboardPage = lazy(() => import("@/pages/admin/OrderDashboardPage"));
const ImageSliderManagerPage = lazy(() => import("@/pages/admin/ImageSliderManagerPage"));
const ItemInsertPage = lazy(() => import("@/pages/admin/ItemInsertPage"));
const ItemListPage = lazy(() => import("@/pages/admin/ItemListPage"));
const CategoriesInsertPage = lazy(() => import("@/pages/admin/CategoriesInsertPage"));
const PromoAddPage = lazy(() => import("@/pages/admin/PromoAddPge"));



export const publicRoutes: NavItem[] = [
    {
        path: "/",
        label: "Home",
        element: <HomePage />,
    },
    {
        path: "/promo",
        label: "Promo",
        element: <PromoPage />,
        showInNav: true,
    },
    {
        path: "/items/:slug",
        label: "Item Details",
        element: <ItemDetailPage />,
    },
    {
        path: "/help",
        label: "Help",
        element: <HelpPage />,
        showInNav: true,
    },
    {
        path: "/profile",
        label: "Profile",
        element: <ProfilePage />,
        protected: true,
    },
    {
        path: "/cart",
        label: "Cart",
        element: <CartPage />,
        protected: true,
    },
    {
        path: "/checkout",
        label: "Checkout",
        element: <CheckoutPage />,
        protected: true,
    },
    {
        path: "/login",
        label: "Login",
        element: <LoginPage />,
    },
    {
        path: "/verify-email",
        label: "Verify Email",
        element: <VerifyEmailPage />,
    },
    {
        path: "/reset-password",
        label: "Reset Password",
        element: <ResetPasswordPage />,
    },
    {
        path: "forgot-password",
        label: "Forgot Password",
        element: <ForgotPasswordPage />,
    }
];

export const adminRoutes: NavItem[] = [
    {
        path: "/admin/orders",
        label: "Dashboard",
        element: <OrderDashboardPage />,
        protected: true,
        requiredRole: "admin",
    },
    {
        path: "/admin/image-slider",
        label: "Image Slider",
        element: <ImageSliderManagerPage />,
        protected: true,
        requiredRole: "admin",
    },
    {
        path: "/admin/items/insert",
        label: "Items Insert",
        element: <ItemInsertPage />,
        protected: true,
        requiredRole: "admin",
    },
    {
        path: "/admin/items/insert/:id",
        element: <ItemInsertPage />,
        protected: true,
        requiredRole: "admin",
    },
    {
        path: "/admin/items/list",
        label: "Items List",
        element: <ItemListPage />,
        protected: true,
        requiredRole: "admin",
    },
    {
        path: "/admin/categories",
        label: "Categories",
        element: <CategoriesInsertPage />,
        protected: true,
        requiredRole: "admin",
    },
    {
        path: "/admin/promo",
        label: "Promo",
        element: <PromoAddPage />,
        protected: true,
        requiredRole: "admin",
    },
];

export const publicNavRoutes = publicRoutes.filter((r) => r.showInNav);
export const adminNavRoutes = adminRoutes.filter(r => r.label);
export const DEFAULT_ADMIN_ROUTE = "/admin/orders";
