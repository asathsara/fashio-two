import React, { useState, useEffect, useRef } from "react";
import ImageUploaderSolid from "../components/ImageUploaderSolid";
import { fetchCategories } from "../api/CategoryApi";
import { insertItem } from "../api/ItemApi";


const ItemInsertPage = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [uploadedImages, setUploadedImages] = useState({
    uploader1: null,
    uploader2: null,
    uploader3: null,
    uploader4: null,
  });
  

  // Using useRef for input fields
  const nameRef = useRef();
  const stockRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();

  const handleImageChange = (uploaderKey, file) => {
    setUploadedImages((prev) => ({
      ...prev,
      [uploaderKey]: file,
    }));
  };

  const handleSubmit = async () => {

    // Validation
    if (!nameRef.current.value.trim()) {
      alert("Name is required.");
      setIsDialogOpen(true);
      return;
    }
    if (!priceRef.current.value || isNaN(priceRef.current.value)) {
      alert("Price is required and must be a valid number.");
      return;
    }
    if (!stockRef.current.value || isNaN(stockRef.current.value)) {
      alert("Stock is required and must be a valid number.");
      return;
    }
    if (!category) {
      alert("Category is required.");
      return;
    }
    if (!subCategory) {
      alert("Subcategory is required.");
      return;
    }
    if (selectedSizes.length === 0) {
      alert("At least one size must be selected.");
      return;
    }
    if (!descriptionRef.current.value.trim()) {
      alert("Description is required.");
      return;
    }
    if (!Object.values(uploadedImages).some((file) => file)) {
      alert("At least one image is required.");
      return;
    }

    const formData = new FormData();

    // Append images
    Object.values(uploadedImages).forEach((file) => {
      if (file) {
        formData.append("images", file);
      }
    });

    // Append other fields from refs
    formData.append("name", nameRef.current.value);
    formData.append("price", (Math.round(priceRef.current.value * 100) / 100).toFixed(2));
    formData.append("stock", stockRef.current.value);
    formData.append("category", category?.name || "");
    formData.append("subCategory", subCategory || "");
    formData.append("sizes", JSON.stringify(selectedSizes));
    formData.append("description", descriptionRef.current.value);

    try {
      const response = await insertItem(formData);
      alert("Item added successfully!");
      console.log(response);

      // Clear fields after successful submission
      nameRef.current.value = "";
      priceRef.current.value = "";
      stockRef.current.value = "";
      descriptionRef.current.value = "";
      setCategory(null);
      setSubCategory(null);
      setSelectedSizes([]);
      setUploadedImages({
        uploader1: null,
        uploader2: null,
        uploader3: null,
        uploader4: null,
      });
    } catch (error) {
      console.error(error);
      alert("Failed to add item");
    }
  };

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch(() => alert("Failed to fetch categories"));
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find(
      (cat) => cat._id === e.target.value
    );
    setCategory(selectedCategory);
    setSubCategory(null);
  };

  const handleSubCategoryChange = (e) => {
    setSubCategory(e.target.value);
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes((prevSelectedSizes) =>
      prevSelectedSizes.includes(size)
        ? prevSelectedSizes.filter((item) => item !== size)
        : [...prevSelectedSizes, size]
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
            ref={nameRef}
            type="text"
            className="border-1 border-gray-300 outline-none rounded-md px-4 py-2 mt-1 w-3/4 min-w-96"
          />

          <p className="font-poppins text-lg mt-4">Description</p>
          <textarea
            ref={descriptionRef}
            className="border-1 border-gray-300 outline-none rounded-md px-4 py-2 mt-1 w-3/4 min-w-96 h-32"
          />

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
                  disabled={!category}
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
            ref={stockRef}
            type="number"
            className="border-1 border-gray-300 outline-none rounded-md px-4 py-2 mt-1 w-3/4 min-w-96"
          />
          <p className="font-poppins text-lg md:mt-4 mt-8">Item Price</p>
          <input
            ref={priceRef}
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
          <button
            onClick={handleSubmit}
            className="bg-black text-backgroundGray px-8 py-2 rounded-full font-semibold font-poppins w-3/4 mt-8"
          >
            Submit
          </button>
        </div>
      </div>
      
    </>
  );
};

export default ItemInsertPage;
