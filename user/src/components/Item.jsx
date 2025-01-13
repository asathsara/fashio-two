import React from "react";

const Item = ({ className, item }) => {
  return (
    <div className={`${className} rounded-md border-1 border-x-gray-100 md:w-64 mr-10 mt-10 w-56 cursor-pointer`}>
      <img
        className="rounded-t-md md:h-72 h-64 w-full object-cover"
        src={import.meta.env.VITE_API_UPLOAD_IMAGES_URL + item.urls[0]}
        alt={item.name}
      />
      <div className="flex flex-col w-full items-center font-poppins">
        <p className="text-lg text-darkGray mt-8">{item.name}</p>
        <h2 className="text-md font-bold mt-2 mb-6">{`Rs. ${(Math.round(item.price * 100) / 100).toFixed(2)}`}</h2>
      </div>
    </div>
  );
};

export default Item;
