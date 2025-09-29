import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import {
  fetchCategories,
  insertCategory,
  deleteCategory,
  deleteSubCategory,
  insertSubCategory,
} from "../api/CategoryApi";
import CategoryItem from "../components/CategoryItem";

const CategoriesInsertPage = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const inputRef = useRef();

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((error) => setError(error));
  }, []);

  const handleAddCategory = () => {
    const name = inputRef.current.value;
    if (!name) {
      return;
    }

    insertCategory(name).then((data) => {
      setCategories([...categories, data]);
      inputRef.current.value = "";
    });
  };

  const addSubItem = (categoryId, subItemName) => {
    insertSubCategory(categoryId, subItemName).then((newSubItem) => {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === categoryId
            ? {
                ...category,
                subItems: [...category.subItems, newSubItem],
              }
            : category
        )
      );
    });
  };
  

  const handleDeleteCategory = (categoryId) => {
    deleteCategory(categoryId).then(() => {
      setCategories(
        categories.filter((category) => category._id !== categoryId)
      );
    });
  };

  const handleDeleteSubCategory = (categoryId, subCategoryName) => {
    deleteSubCategory(categoryId, subCategoryName).then(() => {
      const category = categories.find(
        (category) => category._id === categoryId
      );
      category.subItems = category.subItems.filter(
        (subItem) => subItem.name !== subCategoryName
      );
      setCategories([...categories]);
    });
  };

  return (
    <>
      <h1 className="font-poppins text-3xl font-semibold">
        Fashion Categories
      </h1>

      <div className="flex flex-row items-center mt-8">
        <div className="flex flex-8 rounded-full p-3 md:min-w-72 min-w-64 bg-backgroundGray justify-between items-center">
          <FaSearch className="mx-3 text-gray-400 cursor-pointer " />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            className="bg-transparent border-0 outline-none flex-1 font-poppins text-gray-400 font-semibold"
          />
        </div>
        <button
          className="bg-black text-backgroundGray px-8 py-2 rounded-full font-semibold font-poppins flex-1 ml-8 h-full"
          onClick={handleAddCategory}
        >
          ADD
        </button>
      </div>

      <div className="mt-8">
        {categories.map((category) => (
          <CategoryItem
            key={category._id}
            category={category}
            onAddSubItem={addSubItem}
            onDelete={handleDeleteCategory}
            onDeleteSubCategory={handleDeleteSubCategory}
          />
        ))}
      </div>
    </>
  );
};

export default CategoriesInsertPage;
