import React, { useState, useEffect, useRef } from "react";

import { fetchCategories } from "../api/CategoryApi";
import { insertItem } from "../api/ItemApi";
import ImageUploaderGroup from "../components/ImageUploaderGroup";
import FormInput from "../components/FormInput ";
import SizeSelector from "../components/SizeSelector";
import CategorySelector from "../components/CategorySelector";
import Dialog from "../components/Dialog";

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
  const [resetCounter, setResetCounter] = useState(0); // Reset trigger
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState([])

  const handleOk = () => {
    setIsDialogOpen(false); // Close the dialog
    setItemToDelete(null); // Reset itemToDelete
  };

  const handleCancel = () => {
    setIsDialogOpen(false); // Just close the dialog
    setItemToDelete(null); // Reset itemToDelete
  };

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

  const validateField = (field, message) => {
    if (!field || (typeof field === "string" && field.trim() === "")) {
      setDialogContent({ title: "Validation Error", subText: message });
      setIsDialogOpen(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    // Validation
    if (!validateField(nameRef.current.value, "Name is required.")) return;
    if (
      !validateField(
        priceRef.current.value,
        "Price is required and must be a valid number."
      ) ||
      isNaN(priceRef.current.value)
    )
      return;
    if (
      !validateField(
        stockRef.current.value,
        "Stock is required and must be a valid number."
      ) ||
      isNaN(stockRef.current.value)
    )
      return;
    if (!category) {
      setDialogContent({
        title: "Validation Error",
        subText: "Category is required.",
      });
      setIsDialogOpen(true);
      return;
    }
    if (!subCategory) {
      setDialogContent({
        title: "Validation Error",
        subText: "Subcategory is required.",
      });
      setIsDialogOpen(true);
      return;
    }
    if (selectedSizes.length === 0) {
      setDialogContent({
        title: "Validation Error",
        subText: "At least one size must be selected.",
      });
      setIsDialogOpen(true);
      return;
    }
    if (
      !validateField(descriptionRef.current.value, "Description is required.")
    )
      return;
    if (!Object.values(uploadedImages).some((file) => file)) {
      setDialogContent({
        title: "Validation Error",
        subText: "At least one image is required.",
      });
      setIsDialogOpen(true);
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
    formData.append(
      "price",
      (Math.round(priceRef.current.value * 100) / 100).toFixed(2)
    );
    formData.append("stock", stockRef.current.value);
    formData.append("category", category?.name || "");
    formData.append("subCategory", subCategory || "");
    formData.append("sizes", JSON.stringify(selectedSizes));
    formData.append("description", descriptionRef.current.value);

    try {
      await insertItem(formData);
      setDialogContent({
        title: "Success",
        subText: "Item added successfully!",
      });
      setIsDialogOpen(true);
      

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

      setResetCounter((prev) => prev + 1); // Increment the reset trigger
    } catch (error) {
      console.error(error);
      setDialogContent({ title: "Error", subText: "Failed to add item" });
      setIsDialogOpen(true);
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
        <div className="flex flex-col flex-1 mr-4">
          <ImageUploaderGroup
            resetTrigger={resetCounter}
            onImageChange={handleImageChange}
          />
        </div>
        <div className="flex-col flex-1 ml-0 md:ml-8">
          <FormInput label="Item Name" type="text" inputRef={nameRef} />
          <FormInput
            label="Description"
            inputRef={descriptionRef}
            as="textarea"
          />
          <CategorySelector
            categories={categories}
            category={category}
            subCategory={subCategory}
            onCategoryChange={handleCategoryChange}
            onSubCategoryChange={handleSubCategoryChange}
          />
          <FormInput label="Stock" type="number" inputRef={stockRef} />
          <FormInput label="Item Price" type="text" inputRef={priceRef} />
          <SizeSelector
            className={"mt-8"}
            selectedSizes={selectedSizes}
            onSizeToggle={handleSizeToggle}
          />
          <button
            onClick={handleSubmit}
            className="bg-black text-backgroundGray px-8 py-2 rounded-full font-semibold font-poppins w-3/4 mt-8"
          >
            Submit
          </button>
        </div>
      </div>
      <Dialog
        isOpen={isDialogOpen}
        title={dialogContent.title}
        subText={dialogContent.subText}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </>
  );
};

export default ItemInsertPage;
