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

// Lazy load heavy ItemCategory component
const ItemCategory = lazy(() => import("../../components/client/ItemCategory"));

const HomePage = () => {

  const { data: images = [] } = useImages();
  const { data: categories = [] } = useCategories();
  const { data: items = [], isLoading: loading, error } = useItems()

  const { currentImage, index } = useImageCarousel<Image>(images, 5000);

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

      <div className="flex flex-row items-center mt-16 justify-center w-full ">
        {categories.map((category) => {
          return (
            <p
              key={category._id}
              className="md:text-xl sm:text-lg font-bold font-poppins md:mx-8 mx-2 border-navbar-gray border-2 md:px-8 md:py-4 px-6 py-3 rounded-lg cursor-pointer text-navbar-gray"
            >
              {category.name}
            </p>
          );
        })}
      </div>


      <div className="mt-8 w-full">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner size="lg" variant="bars" label="Loading products..." />
          </div>
        ) : error ? (
          <ErrorMessage message={error.message} />
        ) : (
          categories.map((category) => {
            // Filter items belonging to the current category
            const categoryItems = items.filter(
              (item) => item.category._id === category._id
            );

            return (
              <ComponentErrorBoundary
                key={category._id}
                name={`ItemCategory-${category.name}`}
                fallbackRender={({ error, resetErrorBoundary }) => (
                  <ComponentFallback
                    boundaryName={`${category.name} section`}
                    error={error}
                    onRetry={resetErrorBoundary}
                    compact
                  />
                )}
              >
                <Suspense fallback={<ComponentLoadingFallback />}>
                  <ItemCategory
                    categoryName={category.name}
                    items={categoryItems}
                  />
                </Suspense>
              </ComponentErrorBoundary>
            );
          })
        )}
      </div>

    </div>
  );
};

export default HomePage;
