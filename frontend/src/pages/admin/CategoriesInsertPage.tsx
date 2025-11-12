import { useRef } from "react";
import { FaSearch } from "react-icons/fa";

import CategoryItem from "../../components/admin/category/CategoryItem";
import { useCategories, useInsertCategory, useDeleteCategory, useInsertSubCategory, useDeleteSubCategory } from "../../hooks/useCategories";
import { Spinner } from "@/components/common/Spinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";

const CategoriesInsertPage = () => {

  const { data: categories = [], isLoading, error } = useCategories();
  const insertCategoryMutation = useInsertCategory();
  const deleteCategoryMutation = useDeleteCategory();
  const insertSubCategoryMutation = useInsertSubCategory();
  const deleteSubCategoryMutation = useDeleteSubCategory();

  const inputRef = useRef<HTMLInputElement | null>(null);


  const handleAddCategory = () => {
    const name = inputRef.current?.value;
    if (!name) {
      return;
    }

    insertCategoryMutation.mutate(name, {
      onSuccess: () => {
        if (inputRef.current) inputRef.current.value = "";
      }
    });
  };

  const addSubItem = (categoryId: string, subItemName: string) => {
    insertSubCategoryMutation.mutate({ id: categoryId, name: subItemName });
  };


  const handleDeleteCategory = (categoryId: string) => {
    deleteCategoryMutation.mutate(categoryId);
  };

  const handleDeleteSubCategory = (categoryId: string, subCategoryName: string) => {
    deleteSubCategoryMutation.mutate({ categoryId, subItemName: subCategoryName });
  };

  if (isLoading) {
    return <Spinner fullHeight />;
  }

  if (error) {
    return <ErrorMessage message="Failed to load categories." />;
  }

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
          className="bg-black text-backgroundGray px-8 py-2 rounded-full font-semibold font-poppins flex-1 ml-8 h-full text-white cursor-pointer"
          onClick={handleAddCategory}
        >
          ADD
        </button>
      </div>

      {error ? (
        <p className="text-red-500 mt-4">Failed to fetch categories: {String(error)}</p>
      ) : (
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
      )}
    </>
  );
};

export default CategoriesInsertPage;
