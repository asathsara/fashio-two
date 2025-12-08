import ItemCard from "./Item";
import type { SubCategoryGroup } from "@/types/categorySection";

type ItemCategoryProps = {
  categoryName: string;
  subcategories: SubCategoryGroup[];
};

const ItemCategory = ({ categoryName, subcategories }: ItemCategoryProps) => {
  return (
    <section className="flex flex-col font-poppins px-4 sm:px-8 xl:px-16 py-6">
      <div className="flex items-baseline gap-2 sm:gap-4 mt-4 tracking-tight">
        <p className="font-bold md:text-5xl text-3xl">{`${categoryName}'s`}</p>
        <p className="md:text-5xl text-3xl font-bold text-outline">Collection</p>
      </div>

      {subcategories.length === 0 ? (
        <p className="mt-6 text-lg text-gray-500">No items available in this category.</p>
      ) : (
        subcategories.map((subCategory) => (
          <div key={subCategory._id} className="mt-8">
            <div className="flex items-center gap-2 sm:gap-4 mb-2">
              <h3 className="text-xl md:text-2xl font-semibold text-navbar-gray">
                {subCategory.name}
              </h3>
              <div className="h-px flex-1 bg-gray-200" aria-hidden="true" />
            </div>

            {/* Horizontal scroll container with small gap and hidden scrollbar */}
            <div className="flex gap-4 sm:gap-8 overflow-x-auto scrollbar-none py-2">
              {subCategory.items.map((item) => (
                <div className="flex-shrink-0">
                  <ItemCard key={item._id} item={item} />
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default ItemCategory;
