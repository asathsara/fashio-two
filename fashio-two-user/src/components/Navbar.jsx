import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const inputRef = useRef();

  return (
    <nav className="navbar">
      <div className="flex bg-counterBlue w-full items-center justify-between">
        {/* First Item (Fashio) */}
        <div className="p-4 pl-16 font-pacifico text-3xl font-semibold text-white tracking-wider">
          Fashio
        </div>

        {/* Search Bar */}
        <div className="p-4 rounded-lg bg-lightCounterBlue m-4 max-w-96 flex items-center">
          <FaSearch className="mr-3 text-gray-600" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            className="bg-transparent border-0 ml-4 outline-none flex-1 font-poppins font-semibold"
          />
        </div>

        {/* User Icon */}
        <div className="p-4 pr-8 ">
          <FaUserCircle className="mr-3 text-white size-8 " />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
