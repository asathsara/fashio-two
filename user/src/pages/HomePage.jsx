import React, { useState, useEffect } from "react";
import { fetchImages } from "../api/ImageApi";
import { fetchCategories } from "../api/CategoryApi";

const HomePage = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [index, setIndex] = useState(0);
  const [categories, setCategories] = useState([]);

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

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center">
        {images.length > 0 && (
          <img
            src={import.meta.env.VITE_API_UPLOAD_IMAGES_URL + images[index].url}
            alt="slide"
            className="object-cover w-4/5 md:h-144 sm:min-h-72 min-w-4/5 rounded-2xl mt-8 shadow-sm"
          />
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>

      <div className="flex flex-row items-center mt-8 justify-around w-full h-20 bg-navbarGray">
        {categories.map((category) => {
          return (
            <p key={category._id} className="md:text-xl sm:text-lg font-bold font-poppins cursor-pointer text-backgroundGray">
              {category.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
