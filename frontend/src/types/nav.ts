import type { ReactElement } from "react";

export interface NavItem {
    path: string;
    label: string;
    element: ReactElement
    showInNav?: boolean
}
