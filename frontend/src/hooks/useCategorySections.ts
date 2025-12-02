import { useCallback, useEffect, useMemo, useState } from "react";
import type { Category } from "@/types/category";
import type { Item } from "@/types/item";
import type { CategorySection, SubCategoryGroup } from "@/types/categorySection";

const FALLBACK_SUBCATEGORY_ID = "uncategorized";
const FALLBACK_SUBCATEGORY_NAME = "Other";

interface UseCategorySectionsOptions {
    categories: Category[];
    items: Item[];
    query: string;
    isLoading: boolean;
    error?: unknown;
}

const filterItems = (
    items: Item[],
    query: string,
    selectedCategoryId: string | null,
) => {
    if (!items.length) return [];
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((item) => {
        const matchesCategory = !selectedCategoryId || item.category?._id === selectedCategoryId;
        if (!matchesCategory) {
            return false;
        }

        if (!normalizedQuery) {
            return true;
        }

        const haystack = [item.name, item.description, item.category?.name]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        return haystack.includes(normalizedQuery);
    });
};

const buildCategorySections = (
    categories: Category[],
    items: Item[],
): CategorySection[] => {
    if (!items.length) return [];

    return categories
        .map((category) => {
            const itemsForCategory = items.filter((item) => item.category?._id === category._id);
            if (!itemsForCategory.length) {
                return null;
            }

            const groups = new Map<string, SubCategoryGroup>();

            itemsForCategory.forEach((item) => {
                const subId = item.category?.subCategory?._id ?? FALLBACK_SUBCATEGORY_ID;
                const subName = item.category?.subCategory?.name ?? FALLBACK_SUBCATEGORY_NAME;

                if (!groups.has(subId)) {
                    groups.set(subId, { _id: subId, name: subName, items: [] });
                }

                groups.get(subId)?.items.push(item);
            });

            const sortedGroups: SubCategoryGroup[] = [];
            (category.subCategories ?? []).forEach((subCategory) => {
                const group = groups.get(subCategory._id);
                if (group) {
                    sortedGroups.push(group);
                    groups.delete(subCategory._id);
                }
            });

            groups.forEach((group) => {
                sortedGroups.push(group);
            });

            return sortedGroups.length
                ? {
                    categoryId: category._id,
                    categoryName: category.name,
                    subcategories: sortedGroups,
                }
                : null;
        })
        .filter(Boolean) as CategorySection[];
};

export const useCategorySections = ({
    categories,
    items,
    query,
    isLoading,
    error,
}: UseCategorySectionsOptions) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    useEffect(() => {
        if (!selectedCategoryId) return;
        const exists = categories.some((category) => category._id === selectedCategoryId);
        if (!exists) {
            setSelectedCategoryId(null);
        }
    }, [categories, selectedCategoryId]);

    const filteredItems = useMemo(
        () => filterItems(items, query, selectedCategoryId),
        [items, query, selectedCategoryId],
    );

    const categorySections = useMemo(
        () => buildCategorySections(categories, filteredItems),
        [categories, filteredItems],
    );

    const noResults = !isLoading && !error && categorySections.length === 0;

    const handleCategoryClick = useCallback((categoryId: string | null) => {
        setSelectedCategoryId((current) => (current === categoryId ? null : categoryId));
    }, []);

    return {
        selectedCategoryId,
        categorySections,
        noResults,
        handleCategoryClick,
    };
};
