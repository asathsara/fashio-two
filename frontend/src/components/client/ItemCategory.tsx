import  { type Item as ItemType } from "../types/item";
import ItemCard from "./Item";


type ItemCategoryProps = {
  categoryName: string,
  items: ItemType[]
}

const ItemCategory = ({ categoryName, items } : ItemCategoryProps) => {
  return (
    <div className={`flex flex-col font-poppins  mx-1/10`}>
      <div className="flex flex-row mt-10 tracking-tighter">
        <p className="font-bold md:text-5xl text-4xl">{`${categoryName}'s`}</p>
        <p className="ml-4 md:text-5xl text-4xl font-bold text-outline">Collection</p>
      </div>
      <div className="flex flex-row flex-wrap">
        {items.map((item) => {
          return <ItemCard key={item._id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default ItemCategory;
