import React from "react";

const SizeSelector = ({ selectedSizes, onSizeToggle, className }) => (
  <div className="flex space-x-4 mt-2">
    {["S", "M", "L", "XL", "XXL"].map((size) => (
      <div
        key={size}
        onClick={() => onSizeToggle(size)}
        className={`${className} cursor-pointer w-12 h-12 flex items-center justify-center border-2 rounded-md ${
          selectedSizes.includes(size)
            ? "bg-gray-500 text-white"
            : "bg-white text-gray-700"
        }`}
      >
        {size}
      </div>
    ))}
  </div>
);

export default SizeSelector;
