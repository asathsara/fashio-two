import React, { useState, useEffect } from "react";
import ImageUploaderSolid from "../components/ImageUploaderSolid";
import { fetchCategories } from "../api/CategoryApi";

const ItemInsertPage = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null); // Store entire category object
  const [subCategory, setSubCategory] = useState(null); // Store selected sub-category
  const [selectedSizes, setSelectedSizes] = useState([]); // Store multiple selected sizes
  const [uploadedImages, setUploadedImages] = useState({
    uploader1: null,
    uploader2: null,
    uploader3: null,
    uploader4: null,
  });

  const handleImageChange = (uploaderKey, file) => {
    setUploadedImages((prev) => ({
      ...prev,
      [uploaderKey]: file,
    }));
  };

  const handleButtonClick = () => {
    console.log("Uploaded images:", uploadedImages);
    // You can process or save the uploaded images here
  };

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch(() => setError("Failed to fetch categories"));
  }, []);

  // Handle category change
  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find(
      (cat) => cat._id === e.target.value
    );
    setCategory(selectedCategory); // Store the entire selected category
    setSubCategory(null); // Reset subcategory when a new category is selected
  };

  // Handle sub-category change
  const handleSubCategoryChange = (e) => {
    setSubCategory(e.target.value); // Store selected subcategory name
  };

  // Handle size toggle
  const handleSizeToggle = (size) => {
    setSelectedSizes(
      (prevSelectedSizes) =>
        prevSelectedSizes.includes(size)
          ? prevSelectedSizes.filter((item) => item !== size) // If already selected, remove it
          : [...prevSelectedSizes, size] // If not selected, add it
    );
  };

  return (
    <>
      <h1 className="font-poppins text-3xl font-semibold">Item Insert</h1>

      <div className="flex flex-row mt-8 flex-wrap">
        <div className="flex flex-col flex-[1] mr-4">
          <ImageUploaderSolid
            onImageChange={(file) => handleImageChange("uploader1", file)}
          />
          <div className="flex flex-row mt-4">
            <div className="flex-[1]">
              <ImageUploaderSolid
                onImageChange={(file) => handleImageChange("uploader2", file)}
              />
            </div>
            <div className="flex-[1] ml-4">
              <ImageUploaderSolid
                onImageChange={(file) => handleImageChange("uploader3", file)}
              />
            </div>
            <div className="flex-[1] ml-4">
              <ImageUploaderSolid
                onImageChange={(file) => handleImageChange("uploader4", file)}
              />
            </div>
          </div>
        </div>
        <div className="flex-col flex-[1] ml-0 md:ml-8">
          <p className="font-poppins text-lg md:mt-2 mt-8">Item Name</p>
          <input
            type="text"
            className="border-1 border-gray-300 outline-none rounded-md px-4 py-2 mt-1 w-3/4 min-w-96"
          />

          <p className="font-poppins text-lg mt-4">Description</p>
          <textarea className="border-1 border-gray-300 outline-none rounded-md px-4 py-2 mt-1 w-3/4 min-w-96 h-32" />

          <div className="flex-row mt-4 flex justify-between w-3/4 flex-wrap">
            <div className="mr-2">
              <p className="font-poppins text-lg mt-4">Category</p>
              <div className="relative inline-block w-64 mt-1">
                <select
                  className="w-full border-1 border-gray-300 outline-none rounded-md px-4 py-2 bg-white cursor-pointer"
                  value={category ? category._id : ""}
                  onChange={handleCategoryChange}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <p className="font-poppins text-lg mt-4">Sub Category</p>
              <div className="relative inline-block w-64 mt-1">
                <select
                  className="w-full border-1 border-gray-300 outline-none rounded-md px-4 py-2 bg-white cursor-pointer"
                  value={subCategory || ""}
                  onChange={handleSubCategoryChange}
                  disabled={!category} // Disable sub-category dropdown if no category selected
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {category &&
                    category.subItems &&
                    category.subItems.map((subItem) => (
                      <option key={subItem._id} value={subItem.name}>
                        {subItem.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <p className="font-poppins text-lg md:mt-4 mt-8">Stock</p>
          <input
            type="number"
            className="border-1 border-gray-300 outline-none rounded-md px-4 py-2 mt-1 w-3/4 min-w-96"
          />
          <p className="font-poppins text-lg md:mt-4 mt-8">Item Price</p>
          <input
            type="text"
            className="border-1 border-gray-300 outline-none rounded-md px-4 py-2 mt-1 w-3/4 min-w-96"
          />
          <p className="font-poppins text-lg md:mt-4 mt-8">Item Size</p>

          <div className="flex space-x-4 mt-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`cursor-pointer w-12 h-12 flex items-center justify-center border-2 rounded-md ${
                  selectedSizes.includes(size)
                    ? "bg-gray-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {size}
              </div>
            ))}
          </div>
          <button className="bg-black text-backgroundGray px-8 py-2 rounded-full font-semibold font-poppins w-3/4 mt-8">
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default ItemInsertPage;
