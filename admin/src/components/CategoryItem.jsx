import { useState, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import SubCategoryItem from "./SubCategoryItem";

const CategoryItem = ({
  category,
  onAddSubItem,
  onDelete,
  onDeleteSubCategory,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const subItemRef = useRef();

  const handleAddSubItem = () => {
    const subItemName = subItemRef.current.value;
    if (subItemName) {
      onAddSubItem(category._id, subItemName);
      subItemRef.current.value = "";
    }
  };

  return (
    <div className="p-4 bg-gray-100 my-2 rounded-lg">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <h2 className="font-semibold">{category.name}</h2>
        <FaTrash
          className="cursor-pointer "
          onClick={(e) => {
            e.stopPropagation();
            onDelete(category._id);
          }}
        />
      </div>
      {isExpanded && (
        <div className="mt-2">
          {category.subItems.map((subItem, index) => (
            <SubCategoryItem
              key={index}
              subItem={subItem}
              onDeleteSubCategory={() =>
                onDeleteSubCategory(category._id, subItem.name)
              }
            />
          ))}
          <div className="mt-2 flex">
            <input
              ref={subItemRef}
              type="text"
              placeholder="Add sub-item"
              className="border rounded px-2 py-1 mr-2 flex-1"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddSubItem();
              }}
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
