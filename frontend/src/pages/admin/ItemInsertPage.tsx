import React, { useState, useEffect, useRef } from "react";

import { fetchCategories } from "../../services/categoryService";
import { insertItem } from "../../services/itemService";
import ImageUploaderGroup from "../../components/admin/ImageUploaderGroup";
import FormInput from "../../components/admin/FormInput ";
import SizeSelector from "../../components/admin/SizeSelector";
import CategorySelector from "../../components/admin/CategorySelector";
import Dialog from "../../components/admin/Dialog";
import type { Category } from "../../types/category";



interface UploadedImages {
  uploader1: File | null;
  uploader2: File | null;
  uploader3: File | null;
  uploader4: File | null;
}

interface DialogContent {
  title: string;
  subText: string;
}

const ItemInsertPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [subCategory, setSubCategory] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImages>({
    uploader1: null,
    uploader2: null,
    uploader3: null,
    uploader4: null,
  });
  const [resetCounter, setResetCounter] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<DialogContent>({
    title: "",
    subText: "",
  });

  // Refs
  const nameRef = useRef<HTMLInputElement>(null);
  const stockRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleOk = () => {
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const handleImageChange = (uploaderKey: keyof UploadedImages, file: File | null) => {
    setUploadedImages((prev) => ({
      ...prev,
      [uploaderKey]: file,
    }));
  };

  const validateField = (field: string | undefined, message: string): boolean => {
    if (!field || field.trim() === "") {
      setDialogContent({ title: "Validation Error", subText: message });
      setIsDialogOpen(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async (): Promise<void> => {
    const name = nameRef.current?.value || "";
    const price = priceRef.current?.value || "";
    const stock = stockRef.current?.value || "";
    const description = descriptionRef.current?.value || "";

    // Validation
    if (!validateField(name, "Name is required.")) return;
    if (!validateField(price, "Price is required and must be a valid number.") || isNaN(Number(price))) return;
    if (!validateField(stock, "Stock is required and must be a valid number.") || isNaN(Number(stock))) return;
    if (!category) {
      setDialogContent({ title: "Validation Error", subText: "Category is required." });
      setIsDialogOpen(true);
      return;
    }
    if (!subCategory) {
      setDialogContent({ title: "Validation Error", subText: "Subcategory is required." });
      setIsDialogOpen(true);
      return;
    }
    if (selectedSizes.length === 0) {
      setDialogContent({ title: "Validation Error", subText: "At least one size must be selected." });
      setIsDialogOpen(true);
      return;
    }
    if (!validateField(description, "Description is required.")) return;
    if (!Object.values(uploadedImages).some((file) => file)) {
      setDialogContent({ title: "Validation Error", subText: "At least one image is required." });
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

    // Append other fields
    formData.append("name", name);
    formData.append("price", (Math.round(Number(price) * 100) / 100).toFixed(2));
    formData.append("stock", stock);
    formData.append("category", category?.name || "");
    formData.append("subCategory", subCategory || "");
    formData.append("sizes", JSON.stringify(selectedSizes));
    formData.append("description", description);

    try {
      await insertItem(formData);
      setDialogContent({ title: "Success", subText: "Item added successfully!" });
      setIsDialogOpen(true);

      // Reset fields
      if (nameRef.current) nameRef.current.value = "";
      if (priceRef.current) priceRef.current.value = "";
      if (stockRef.current) stockRef.current.value = "";
      if (descriptionRef.current) descriptionRef.current.value = "";

      setCategory(null);
      setSubCategory(null);
      setSelectedSizes([]);
      setUploadedImages({ uploader1: null, uploader2: null, uploader3: null, uploader4: null });
      setResetCounter((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      setDialogContent({ title: "Error", subText: "Failed to add item" });
      setIsDialogOpen(true);
    }
  };

  useEffect(() => {
    fetchCategories()
      .then((data: Category[]) => setCategories(data))
      .catch(() => alert("Failed to fetch categories"));
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = categories.find((cat) => cat._id === e.target.value) || null;
    setCategory(selectedCategory);
    setSubCategory(null);
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubCategory(e.target.value);
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
    );
  };

  return (
    <>
      <h1 className="font-poppins text-3xl font-semibold">Item Insert</h1>
      <div className="flex flex-row mt-8 flex-wrap">
        <div className="flex flex-col flex-1 mr-4">
          <ImageUploaderGroup resetTrigger={resetCounter} onImageChange={handleImageChange} />
        </div>
        <div className="flex-col flex-1 ml-0 md:ml-8">
          <FormInput label="Item Name" type="text" inputRef={nameRef} />
          <FormInput label="Description" inputRef={descriptionRef} as="textarea" />
          <CategorySelector
            categories={categories}
            category={category}
            subCategory={subCategory}
            onCategoryChange={handleCategoryChange}
            onSubCategoryChange={handleSubCategoryChange}
          />
          <FormInput label="Stock" type="number" inputRef={stockRef} />
          <FormInput label="Item Price" type="text" inputRef={priceRef} />
          <SizeSelector className="mt-8" selectedSizes={selectedSizes} onSizeToggle={handleSizeToggle} />
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
