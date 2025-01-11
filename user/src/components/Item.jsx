import React from "react";

const Item = ({ className, item }) => {
  return (
    <div className={`${className} rounded-md border-1 border-x-gray-100 w-96`}>
      <img
        className="rounded-t-md h-64 w-96"
        src={import.meta.env.VITE_API_UPLOAD_IMAGES_URL + item.urls[0]}
        alt={item.name}
      />
      <div className="flex flex-col">
        <p className="text-lg text-gray-500 mt-8">{item.name}</p>
        <h2 className="text-sm font-bold mt-2 mb-6">{item.price}</h2>
      </div>
    </div>
  );
};

export default Item;
