import React from "react";
import Item from "./Item";

const ItemCategery = ({ className, categoryName, items }) => {
  return (
    <div className={`${className} flex flex-col`}>
      <div className="flex flex-row">
        <p className="font-bold text-lg">{`${categoryName}'s`}</p>
        <p className="ml-4 text-lg font-bold  stroke-current">
          Collection
        </p>
      </div>
      {items.map((item) => {
        return <Item key={item._id} item={item} />;
      })}
    </div>
  );
};

export default ItemCategery;
