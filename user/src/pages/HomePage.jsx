import React, { useState, useEffect } from "react";
import { fetchImages } from "../api/ImageApi";

const HomePage = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchImages()
      .then((data) => setImages(data))
      .catch(() => setError("Failed to fetch images"));
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
    <div className="flex justify-center">
      {images.length > 0 && (
        <img
          src={import.meta.env.VITE_API_UPLOAD_IMAGES_URL + images[index].url}
          alt="slide"
          className="object-cover w-4/5 h-3/4 min-h-96 min-w-4/5 rounded-2xl mt-8"
        />
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default HomePage;
