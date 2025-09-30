import { useState, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import SubCategoryItem from "./SubCategoryItem";
import type { Category } from "../types/api/category";


interface CategoryItemProps {
  category: Category;
  onAddSubItem: (categoryId: string, subItemName: string) => void;
  onDelete: (categoryId: string) => void;
  onDeleteSubCategory: (categoryId: string, subCategoryName: string) => void;
}

const CategoryItem = ({
  category,
  onAddSubItem,
  onDelete,
  onDeleteSubCategory
}: CategoryItemProps) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const subItemRef = useRef<HTMLInputElement | null>(null);

  const handleAddSubItem = () => {

    if (!subItemRef.current) return;

    const subItemName = subItemRef.current.value;
    if (subItemName) {
      onAddSubItem(category._id, subItemName);
      subItemRef.current.value = "";
    }
  };

  return (
    <div className="p-4 bg-backgroundGray my-2 rounded-lg">
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
          {category.subCategories.map((subItem) => (
            <SubCategoryItem
              key={subItem._id}
              name={subItem.name}
              onDeleteSubCategory={() =>
                onDeleteSubCategory(category._id, subItem.name)
              }
            />
          ))}
          <div className="mt-4 flex">
            <input
              ref={subItemRef}
              type="text"
              placeholder="Sub-item"
              className="rounded-md px-4 py-1 mr-2 flex-1 bg-white border-0 outline-none font-semibold"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddSubItem();
              }}
              className="bg-skyBlue rounded-md text-white px-8 py-1 font-semibold mx-2"
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
