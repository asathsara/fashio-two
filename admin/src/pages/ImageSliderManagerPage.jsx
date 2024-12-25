import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageUploader from "../components/ImageUploader";

const ImageSliderManager = () => {
  const [images, setImages] = useState([]); // Store image data
  const [file, setFile] = useState(null);  // Store the file to upload
  const [error, setError] = useState("");  // Store error messages for debugging

  // Fetch images from the backend when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/images")
      .then((response) => {
        console.log("Fetched images:", response.data); // Debugging log
        setImages(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setError("Failed to load images.");
        setImages([]); // Fallback to an empty array
      });
  }, []);


 

  // Handle file input changes
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:5000/api/images/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImages((prevImages) => [...prevImages, response.data]); // Add new image to state
      setFile(null); // Clear the file input
      document.querySelector('input[type="file"]').value = ""; // Clear input field visually
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image.");
    }
  };

  // Handle image delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/images/${id}`);
      setImages((prevImages) => prevImages.filter((image) => image._id !== id)); // Remove the deleted image from state
    } catch (error) {
      console.error("Error deleting image:", error);
      setError("Failed to delete image.");
    }
  };

  return (
    <div>
      <h1 className="font-poppins text-3xl font-semibold">Images for slider</h1>
      <ImageUploader className='my-8'/>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error messages */}
      <div>
        {images.length === 0 ? (
          <p>No images available. Upload one to get started!</p>
        ) : (
          images.map((image) => (
            <div key={image._id} style={{ marginBottom: "10px" }}>
              <img
                
                src={`http://localhost:5000${image.url}`}
                alt="Uploaded"
                style={{ width: 100, height: 100, objectFit: "cover" }}
              />
              <button onClick={() => handleDelete(image._id)}>Delete</button>
            </div>
            
          ))
        )}
      </div>
    </div>
  );
};

export default ImageSliderManager;
