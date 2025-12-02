import { motion, AnimatePresence } from "framer-motion";
import DetailsBar from "../../components/client/detailsbar/Detailsbar";
import { Spinner } from "@/components/common/Spinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { useImages } from "@/hooks/useImages";
import { useCategories } from "@/hooks/useCategories";
import { useItems } from "@/hooks/useItems";
import { useImageCarousel } from "@/hooks/useImageCarousel";
import type { Image } from "@/types/image";
import type { Category } from "@/types/category";
import type { Item } from "@/types/item";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { ComponentLoadingFallback } from "@/components/common/LazyLoadingFallback";
import { ComponentErrorBoundary, ComponentFallback } from "@/error-boundaries";
import { useNavbarSearch } from "@/hooks/useNavbarSearch";

// Lazy load heavy ItemCategory component
const ItemCategory = lazy(() => import("../../components/client/ItemCategory"));

type SubCategoryGroup = {
  _id: string;
  name: string;
  items: Item[];
};

type CategorySection = {
  categoryId: string;
  categoryName: string;
  subcategories: SubCategoryGroup[];
};

const FALLBACK_SUBCATEGORY_ID = "uncategorized";
const FALLBACK_SUBCATEGORY_NAME = "Other";

const filterItems = (
  items: Item[],
  query: string,
  selectedCategoryId: string | null,
) => {
  if (!items.length) return [];

  return items.filter((item) => {
    const matchesCategory = !selectedCategoryId || item.category?._id === selectedCategoryId;
    if (!matchesCategory) {
      return false;
    }

    if (!query) {
      return true;
    }

    const haystack = [
      item.name,
      item.description,
      item.category?.name,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
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

interface CategoryPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const CategoryPill = ({ label, active, onClick }: CategoryPillProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`text-sm sm:text-base font-semibold font-poppins border-2 px-4 sm:px-6 py-2 rounded-full transition-colors duration-200 ${active
        ? "bg-navbar-gray text-white border-navbar-gray shadow-sm"
        : "text-navbar-gray border-navbar-gray/50 hover:border-navbar-gray"
      }`}
    aria-pressed={active}
  >
    {label}
  </button>
);

const HomePage = () => {

  const { data: images = [] } = useImages();
  const { data: categories = [] } = useCategories();
  const { data: items = [], isLoading: loading, error } = useItems();
  const { query } = useNavbarSearch();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const { currentImage, index } = useImageCarousel<Image>(images, 5000);

  useEffect(() => {
    if (!selectedCategoryId) return;
    const exists = categories.some((category) => category._id === selectedCategoryId);
    if (!exists) {
      setSelectedCategoryId(null);
    }
  }, [categories, selectedCategoryId]);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredItems = useMemo(
    () => filterItems(items, normalizedQuery, selectedCategoryId),
    [items, normalizedQuery, selectedCategoryId]
  );

  const categorySections = useMemo(
    () => buildCategorySections(categories, filteredItems),
    [categories, filteredItems]
  );

  const noResults = !loading && !error && categorySections.length === 0;

  const handleCategoryClick = (categoryId: string | null) => {
    setSelectedCategoryId((current) => (current === categoryId ? null : categoryId));
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center">
        {images.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={`${import.meta.env.VITE_API_UPLOAD_IMAGES_URL}${currentImage._id}`}
              alt={currentImage.filename}
              className="object-cover w-4/5 md:h-144 sm:min-h-72 min-w-4/5 rounded-2xl mt-8 shadow-sm"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 1,
              }}
            />
          </AnimatePresence>)}
      </div>

      <DetailsBar className={"mt-8"} />

      <div className="flex flex-wrap items-center gap-3 mt-16 justify-center w-full px-4">
        <CategoryPill
          label="All"
          active={!selectedCategoryId}
          onClick={() => handleCategoryClick(null)}
        />
        {categories.map((category) => (
          <CategoryPill
            key={category._id}
            label={category.name}
            active={selectedCategoryId === category._id}
            onClick={() => handleCategoryClick(category._id)}
          />
        ))}
      </div>


      <div className="mt-8 w-full">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner size="lg" variant="bars" label="Loading products..." />
          </div>
        ) : error ? (
          <ErrorMessage message={error.message} />
        ) : noResults ? (
          <p className="text-center text-lg text-gray-500 py-16">
            No items match your filters. Try clearing the search or selecting another category.
          </p>
        ) : (
          categorySections.map(({ categoryId, categoryName, subcategories }) => (
            <ComponentErrorBoundary
              key={categoryId}
              name={`ItemCategory-${categoryName}`}
              fallbackRender={({ error, resetErrorBoundary }) => (
                <ComponentFallback
                  boundaryName={`${categoryName} section`}
                  error={error}
                  onRetry={resetErrorBoundary}
                  compact
                />
              )}
            >
              <Suspense fallback={<ComponentLoadingFallback />}>
                <ItemCategory categoryName={categoryName} subcategories={subcategories} />
              </Suspense>
            </ComponentErrorBoundary>
          ))
        )}
      </div>

    </div>
  );
};

export default HomePage;
