import React from "react";

const CategorySelector = ({
  categories,
  category,
  subCategory,
  onCategoryChange,
  onSubCategoryChange,
}) => (
  <div className="flex-row mt-4 flex justify-between w-3/4 flex-wrap">
    <div className="mr-2">
      <p className="font-poppins text-lg mt-4">Category</p>
      <select
        className="w-64 border-1 border-gray-300 outline-none rounded-md px-4 py-2 bg-white cursor-pointer "
        value={category ? category._id : ""}
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
    <div>
      <p className="font-poppins text-lg mt-4">Sub Category</p>
      <select
        className="w-64 border-1 border-gray-300 outline-none rounded-md px-4 py-2 bg-white cursor-pointer"
        value={subCategory || ""}
        onChange={onSubCategoryChange}
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
);

export default CategorySelector;
