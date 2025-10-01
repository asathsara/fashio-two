import React from "react";
import type { Category } from "../types/api/category"; 

type CategorySelectorProps =  {
  categories: Category[];
  category: Category | null;
  subCategory: string | null;
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSubCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CategorySelector = ({
  categories,
  category,
  subCategory,
  onCategoryChange,
  onSubCategoryChange,
}: CategorySelectorProps) => (

  <div className="flex-row mt-4 flex justify-between w-3/4 flex-wrap">
    {/* Category Select */}
    <div className="mr-2">
      <p className="font-poppins text-lg mt-4">Category</p>
      <select
        className="w-64 border border-gray-300 outline-none rounded-md px-4 py-2 bg-white cursor-pointer"
        value={category?._id || ""}
        onChange={onCategoryChange}
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

    {/* Subcategory Select */}
    <div>
      <p className="font-poppins text-lg mt-4">Sub Category</p>
      <select
        className="w-64 border border-gray-300 outline-none rounded-md px-4 py-2 bg-white cursor-pointer"
        value={subCategory || ""}
        onChange={onSubCategoryChange}
        disabled={!category}
      >
        <option value="" disabled>
          Select an option
        </option>
        {category?.subCategories?.map((subItem) => (
          <option key={subItem._id} value={subItem.name}>
            {subItem.name}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default CategorySelector;
