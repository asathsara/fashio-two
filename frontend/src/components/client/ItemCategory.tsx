import { type Item as ItemType } from "../../types/item";
import ItemCard from "./Item";

type SubCategoryGroup = {
  _id: string;
  name: string;
  items: ItemType[];
};

type ItemCategoryProps = {
  categoryName: string;
  subcategories: SubCategoryGroup[];
};

const ItemCategory = ({ categoryName, subcategories }: ItemCategoryProps) => {
  return (
    <section className="flex flex-col font-poppins px-4 sm:px-8 xl:px-16 py-6">
      <div className="flex flex-wrap items-baseline gap-4 mt-4 tracking-tight">
        <p className="font-bold md:text-5xl text-4xl">{`${categoryName}'s`}</p>
        <p className="md:text-5xl text-4xl font-bold text-outline">Collection</p>
      </div>

      {subcategories.length === 0 ? (
        <p className="mt-6 text-lg text-gray-500">No items available in this category.</p>
      ) : (
        subcategories.map((subCategory) => (
          <div key={subCategory._id} className="mt-8">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-2xl font-semibold text-navbar-gray">
                {subCategory.name}
              </h3>
              <div className="h-px flex-1 bg-gray-200" aria-hidden="true" />
              {/* <span className="text-sm text-gray-500">
                {subCategory.items.length} item{subCategory.items.length !== 1 ? "s" : ""}
              </span> */}
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {subCategory.items.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default ItemCategory;
