import  { useState, useEffect } from "react";
import { fetchImages, uploadImage, deleteImage } from "../api/ImageApi";
import ImageUploader from "../components/ImageUploader";
import ImageCard from "../components/ImageCard";
import type { Image } from "../types/api/image";

const ImageSliderManager = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchImages()
      .then((data) => setImages(data))
      .catch(() => setError("Failed to fetch images"));
  }, []);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const newImage = await uploadImage(formData);
      setImages((prev) => [...prev, newImage]);
    } catch {
      setError("Failed to upload image");
    }
  };

  const handleDelete = async (id: string) => {
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
      <ImageUploader onUpload={handleUpload}/>
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
