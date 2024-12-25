import React, { useState } from "react";

const NavigationRail = ({ onSelect }) => {
  const [selected, setSelected] = useState("Image Slider"); // Default selected item

  const navItems = [
    { id: 1, label: "Image Slider" },
    { id: 2, label: "Items Insert" },
    { id: 3, label: "Items List" },
    { id: 4, label: "Categories" },
    { id: 5, label: "Promo" },
  ];

  const handleSelect = (label) => {
    setSelected(label);
    onSelect(label); // Notify parent
  };

  return (
    <div className="min-w-44 h-screen flex flex-col items-start py-4 mx-4">
      <ul className="list-none flex flex-col gap-2 w-full mt-4 font-poppins ">
        {navItems.map((item) => (
          <li
            key={item.id}
            className={`px-10 py-3 cursor-pointer w-full rounded-full transition items-center text-left ${
              selected === item.label
                ? "bg-black rounded-full  text-white"
                : "hover:bg-gray-200  text-gray-800"
            }`}
            onClick={() => handleSelect(item.label)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavigationRail;
