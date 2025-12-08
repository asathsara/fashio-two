import DetailsBar from "../../components/client/detailsbar/Detailsbar";
import { Spinner } from "@/components/common/Spinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { useImages } from "@/hooks/useImages";
import { useCategories } from "@/hooks/useCategories";
import { useItems } from "@/hooks/useItems";
import { lazy, Suspense } from "react";
import { ComponentLoadingFallback } from "@/components/common/LazyLoadingFallback";
import { ComponentErrorBoundary, ComponentFallback } from "@/error-boundaries";
import { useNavbarSearch } from "@/hooks/useNavbarSearch";
import { useCategorySections } from "@/hooks/useCategorySections";
import { CategoryPill } from "@/components/client/home/CategoryPill";
import { HeroSlider } from "@/components/client/home/HeroSlider";

// Lazy load heavy ItemCategory component
const ItemCategory = lazy(() => import("../../components/client/ItemCategory"));

const HomePage = () => {

  const { data: images = [] } = useImages();
  const { data: categories = [] } = useCategories();
  const { data: items = [], isLoading: loading, error } = useItems();
  const { query } = useNavbarSearch();

  const { selectedCategoryId, categorySections, noResults, handleCategoryClick } = useCategorySections({
    categories,
    items,
    query,
    isLoading: loading,
    error,
  });

  return (
    <div className="flex flex-col w-full">
      <HeroSlider images={images} interval={5000} />

      <DetailsBar className={"mt-4 md:mt-8"} />

      <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-8 md:mt-16 justify-center w-full px-4">
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
