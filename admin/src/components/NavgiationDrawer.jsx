import React, { useState } from "react";
import NavigationItem from "./NavigationItem";

const NavgiationDrawer = ({ className, navItems, closeNav, currentPage, setCurrentPage }) => {
 

  return (
    <div
      className={`${className} h-full z-20 fixed overflow-x-hidden  bg-slate-100 transition-all duration-300`}
    >
      <span
        className="cursor-pointer text-4xl float-right mr-6 pt-3 pb-5 "
        onClick={closeNav}
      >
        &times;
      </span>
      <ul className="list-none flex flex-col gap-2 w-full px-4  font-poppins ">
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

export default NavgiationDrawer;
