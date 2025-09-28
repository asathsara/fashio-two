import HelpPage from "../pages/HelpPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PromoPage from "../pages/PromoPage";
import type {NavItem}  from "../types/nav"

export const routes: NavItem[] = [
    { path: '/', label: 'Home', element: <HomePage /> },
    { path: "/promo", label: "Promo", element: <PromoPage />, showInNav: true },
    { path: "/help", label: "Help", element: <HelpPage />, showInNav: true },
    { path: "/login", label: "Login", element: <LoginPage />, showInNav: true },
]