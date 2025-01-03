import React, { useState } from "react";

const NavgiationDrawer = ({
  className,
  navItems,
  closeNav,
  onSelect,
}) => {
  return (
    <div
      className={`${className} h-full z-20 fixed overflow-x-hidden  bg-navbarGray transition-all duration-300`}
    >
      <span
        className="cursor-pointer text-4xl float-right mr-6 pt-3 pb-5 text-white" 
        onClick={closeNav}
      >
        &times;
      </span>
      <ul className="list-none flex flex-col gap-2 w-full px-4  font-poppins ">
        {navItems.map((item) => (
          <li
            key={item.id}
            className={`px-10 py-3 cursor-pointer w-full rounded-full  items-center text-left text-gray-300 hover:text-gray-100
            }`}
            onClick={() => {
              onSelect(item.label);
              closeNav();
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavgiationDrawer;
