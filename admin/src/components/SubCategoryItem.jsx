import React from "react";
import { FaTrash } from "react-icons/fa";

const SubCategoryItem = ({subItem, onDeleteSubCategory }) => {
  return (
    <div className="flex justify-between items-center mx-4 mt-2 ">
      <p className="text-gray-600 font-semibold">{subItem.name}</p>
      <FaTrash
        onClick={onDeleteSubCategory}
        className="cursor-pointer text-gray-600"
      />
    </div>
  );
};

export default SubCategoryItem;
