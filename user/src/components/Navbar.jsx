import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";

const Navbar = () => {
  const inputRef = useRef();

  return (
    <nav className="navbar">
      <div className="flex p-4   items-center  justify-between">
        {/* First Item (Fashio) */}
        <div className="flex font-pacifico text-2.5xl font-semibold  tracking- pl-4 md:text-3xl">
          Fashio
        </div>

        <div className="flex items-center ">
          <ul className="list-none flex gap-5 md:flex sm:hidden ml-3 mr-5 font-poppins">
            <li>
              <a href="/Promo">Promo</a>
            </li>
            <li>
              <a href="/Help">Help</a>
            </li>
            <li>
              <a href="/Login">Login</a>
            </li>
          </ul>

          <span
            className="sm:block md:hidden cursor-pointer text-3xl mx-3 text-black"
            onClick="openNav()">
            &#9776;
          </span>

          {/* Search Bar */}
          <div className="flex rounded-full p-3 md:min-w-72 min-w-64 bg-black justify-between">
            <div className="flex-[5] flex items-center ">
              <FaSearch className="mx-3 text-gray-100 cursor-pointer" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                className="bg-transparent border-0 outline-none flex-1 font-poppins w-24 text-gray-100"
              />
            </div>
            <div className="flex-[1] flex items-center ml-2 ">
              <div className="h-full w-0.25 bg-slate-300"></div>
              <MdOutlineShoppingBag className="mx-3 text-gray-100 size-6" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
