// Admin Pages
import ImageSliderManagerPage from "@/pages/admin/ImageSliderManagerPage";
import ItemInsertPage from "@/pages/admin/ItemInsertPage";
import ItemListPage from "@/pages/admin/ItemListPage";
import CategoriesInsertPage from "@/pages/admin/CategoriesInsertPage";
import PromoAddPage from "@/pages/admin/PromoAddPge";

// Client Pages
import HomePage from "@/pages/client/HomePage";
import PromoPage from "@/pages/client/PromoPage";
import HelpPage from "@/pages/client/HelpPage";
import ProfilePage from "@/pages/client/ProfilePage";
import ItemDetailPage from "@/pages/client/ItemDetailPage";
import CartPage from "@/pages/client/CartPage";
import CheckoutPage from "@/pages/client/CheckoutPage";
import VerifyEmailPage from "@/pages/client/auth/VerifyEmailPage";
import ResetPasswordPage from "@/pages/client/auth/ResetPasswordPage";
import ForgotPasswordPage from "@/pages/client/auth/ForgotPasswordPage";
import LoginPage from "@/pages/client/LoginPage";
import type { NavItem } from "@/types/nav";


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
        path: "/items/:id",
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
export const DEFAULT_ADMIN_ROUTE = "/admin/image-slider";
