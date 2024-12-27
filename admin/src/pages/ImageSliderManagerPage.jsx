import React, { useState, useEffect } from "react";
import { fetchImages, uploadImage, deleteImage } from "../api/imageApi";
import ImageUploader from "../components/ImageUploader";
import ImageCard from "../components/ImageCard";

const ImageSliderManager = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchImages()
      .then((data) => setImages(data))
      .catch((err) => setError("Failed to fetch images"));
  }, []);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const newImage = await uploadImage(formData);
      setImages((prev) => [...prev, newImage]);
    } catch {
      setError("Failed to upload image");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteImage(id);
      setImages((prev) => prev.filter((image) => image._id !== id));
    } catch {
      setError("Failed to delete image");
    }
  };

  return (
    <div>
      <h1 className="font-poppins text-3xl font-semibold">Images for Slider</h1>
      <ImageUploader onUpload={handleUpload} className="my-8" />
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-wrap">
        {images.map((image) => (
          <ImageCard
            key={image._id}
            image={image}
            onDelete={handleDelete}
            className="shadow-md m-4"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSliderManager;
