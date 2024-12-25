import React, { useState } from "react";

const NavigationRail = () => {
  const [selected, setSelected] = useState("Home"); // Default selected item

  const navItems = [
    { id: 1, label: "Home" },
    { id: 2, label: "Items Add" },
    { id: 3, label: "Items List" },
    { id: 4, label: "Categories" },
    { id: 4, label: "Promo" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-50 border-r  flex flex-col items-start py-4">
      
      {/* Navigation Items */}
      <ul className="list-none flex flex-col gap-2 w-full mt-4 font-poppins">
        {navItems.map((item) => (
          <li
            key={item.id}
            className={`px-4 py-2 cursor-pointer  w-full text-left transition ${
              selected === item.label
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelected(item.label)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavigationRail;
