import React, { useState } from "react";
import NavigationItem from "./NavigationItem";

const NavigationRail = ({ className, navItems,currentPage, setCurrentPage }) => {
  return (
    <div
      className={`${className} min-w-44 h-screen flex flex-col items-start pb-4 mx-4`}
    >
      <ul className="list-none flex flex-col gap-2 w-full mt-4 font-poppins">
        {navItems.map((item) => (
          <NavigationItem
            key={item.id}
            item={item}
            selected={currentPage}
            onSelect={setCurrentPage}
          />
        ))}
      </ul>
    </div>
  );
};

export default NavigationRail;