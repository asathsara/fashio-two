import type { ReactElement } from "react";

import ImageSliderManagerPage from "../pages/admin/ImageSliderManagerPage";
import ItemInsertPage from "../pages/admin/ItemInsertPage";
import ItemListPage from "../pages/admin/ItemListPage";
import CategoriesInsertPage from "../pages/admin/CategoriesInsertPage";
import PromoAddPge from "../pages/admin/PromoAddPge";

export type AppRoute = {
    path: string;
    label: string;
    element: ReactElement;
    showInNav?: boolean;
};

export const routes: AppRoute[] = [
    {
        path: "/image-slider",
        label: "Image Slider",
        element: <ImageSliderManagerPage />,
    },
    {
        path: "/items/insert",
        label: "Items Insert",
        element: <ItemInsertPage />,
    },
    {
        path: "/items/list",
        label: "Items List",
        element: <ItemListPage />,
    },
    {
        path: "/categories",
        label: "Categories",
        element: <CategoriesInsertPage />,
    },
    {
        path: "/promo",
        label: "Promo",
        element: <PromoAddPge />,
    },
];

export const navRoutes = routes.filter(r => r.showInNav !== false);
export const DEFAULT_ROUTE = "/image-slider";
