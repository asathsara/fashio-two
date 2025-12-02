import type { Item } from "./item";
import type { Category } from "./category";

export type SubCategoryGroup = {
    _id: string;
    name: string;
    items: Item[];
};

export type CategorySection = {
    categoryId: Category["_id"];
    categoryName: Category["name"];
    subcategories: SubCategoryGroup[];
};
