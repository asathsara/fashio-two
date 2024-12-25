import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageSliderManager = () => {
  const [images, setImages] = useState([]); // List of images
  const [file, setFile] = useState(null);  // Selected file for upload

  // Fetch images from the backend
  useEffect(() => {
    axios.get("/api/images")
      .then((response) => setImages(response.data))
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle upload
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("/api/images/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImages([...images, response.data]); // Add the new image to the list
      setFile(null); // Clear the input field
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/images/${id}`);
      setImages(images.filter((image) => image._id !== id)); // Update the list
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div>
      <h1>Admin Image Manager</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div>
        {images.map((image) => (
          <div key={image._id}>
            <img src={image.url} alt="uploaded" style={{ width: 100, height: 100 }} />
            <button onClick={() => handleDelete(image._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSliderManager;
