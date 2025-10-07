import { FaTrash } from "react-icons/fa";

type SubCategoryItemProps =  {
  name: string;
  onDeleteSubCategory: () => void;
}


const SubCategoryItem = ({name, onDeleteSubCategory } : SubCategoryItemProps) => {
  return (
    <div className="flex justify-between items-center mx-4 mt-2 ">
      <p className="text-gray-600 font-semibold">{name}</p>
      <FaTrash
        onClick={onDeleteSubCategory}
        className="cursor-pointer text-gray-600"
      />
    </div>
  );
};

export default SubCategoryItem;
