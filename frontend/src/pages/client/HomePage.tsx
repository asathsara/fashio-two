import { motion, AnimatePresence } from "framer-motion";
import DetailsBar from "../../components/client/detailsbar/Detailsbar";
import { Spinner } from "@/components/common/Spinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { useImages } from "@/hooks/useImages";
import { useCategories } from "@/hooks/useCategories";
import { useItems } from "@/hooks/useItems";
import { useImageCarousel } from "@/hooks/useImageCarousel";
import type { Image } from "@/types/image";
import { lazy, Suspense } from "react";
import { ComponentLoadingFallback } from "@/components/common/LazyLoadingFallback";
import { ComponentErrorBoundary, ComponentFallback } from "@/error-boundaries";
import { useNavbarSearch } from "@/hooks/useNavbarSearch";
import { useCategorySections } from "@/hooks/useCategorySections";
import { CategoryPill } from "@/components/client/CategoryPill";

// Lazy load heavy ItemCategory component
const ItemCategory = lazy(() => import("../../components/client/ItemCategory"));

const HomePage = () => {

  const { data: images = [] } = useImages();
  const { data: categories = [] } = useCategories();
  const { data: items = [], isLoading: loading, error } = useItems();
  const { query } = useNavbarSearch();
  const { currentImage, index } = useImageCarousel<Image>(images, 5000);

  const { selectedCategoryId, categorySections, noResults, handleCategoryClick } = useCategorySections({
    categories,
    items,
    query,
    isLoading: loading,
    error,
  });

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
