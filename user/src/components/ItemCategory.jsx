import React from "react";
import Item from "./Item";

const ItemCategery = ({ className, categoryName, items }) => {
  return (
    <div className={`${className} flex flex-col font-poppins  mx-1/10`}>
      <div className="flex flex-row mt-10">
        <p className="font-bold md:text-5xl text-4xl">{`${categoryName}'s`}</p>
        <p className="ml-4 md:text-5xl text-4xl font-bold text-outline">Collection</p>
      </div>
      <div className="flex flex-row flex-wrap">
        {items.map((item) => {
          return <Item key={item._id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default ItemCategery;
