import { useState, useEffect } from "react";
import { fetchImages } from "../api/ImageApi";
import { fetchCategories } from "../api/CategoryApi";
import { motion, AnimatePresence } from "framer-motion";
import { fetchItems } from "../api/ItemApi";
import ItemCategory from "../components/ItemCategory";
import DetailsBar from "../components/detailsbar/Detailsbar";
import type { Category, Image, Item } from "../types/item";

const HomePage = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState("");
  const [index, setIndex] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  //const [uniqueCategories, setUniqueCategories] = useState([]);

  useEffect(() => {
    fetchImages()
      .then((data) => setImages(data))
      .catch(() => setError("Failed to fetch images"));
  }, []);

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch(() => setError("Failed to fetch categories"));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    // Fetch items from the API
    const loadItems = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
      } catch (err) {
        setError("Failed to fetch items");
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  // useEffect(() => {
  //   setUniqueCategories(
  //     Array.from(new Set(items.map((item) => item.category)))
  //   );
  //   console.log(uniqueCategories);
  // }, [items]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center">
        {images.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.img
              key={index} // This will trigger re-render and animation
              src={
                import.meta.env.VITE_API_UPLOAD_IMAGES_URL + images[index].url
              }
              alt="slide"
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
          </AnimatePresence>
        )}
        {error && <p className="text-red-500">{error}</p>}
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
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          categories.map((category, index) => {
            // Filter items belonging to the current category
            const categoryItems = items.filter(
              (item) => item.category === category.name
            );

            return (
              <ItemCategory
                key={index}
                categoryName={category.name}
                items={categoryItems}
              />
            );
          })
        )}
      </div>
      
    </div>
  );
};

export default HomePage;
