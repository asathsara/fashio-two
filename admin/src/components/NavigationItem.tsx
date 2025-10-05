import React from "react";

const NavigationItem = ({ item, selected, onSelect }) => {
  return (
    <li
      key={item.id}
      className={`px-10 py-3 cursor-pointer w-full rounded-full transition items-center text-left ${
        selected === item.label
          ? "bg-black rounded-full text-white"
          : "hover:bg-gray-200 text-gray-800"
      }`}
      onClick={() => onSelect(item.label)}
    >
      {item.label}
    </li>
  );
};

export default NavigationItem;
