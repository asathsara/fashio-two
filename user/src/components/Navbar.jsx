import  { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";

const Navbar = ({ openNav, onSelect, navItems }) => {
  const inputRef = useRef();

  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-navbar-gray">
      <div className="flex p-4  items-center  justify-between">
        {/* First Item (Fashio) */}
        <div
          className="flex font-pacifico text-2.5xl font-semibold  tracking- pl-4 md:text-3xl cursor-pointer text-background-gray"
          onClick={() => onSelect("Home")}
        >
          Fashio
        </div>

        <div className="flex items-center ">
          <ul className="list-none hidden gap-5 md:flex sm:hidden ml-3 mr-5 font-poppins cursor-pointer font-semibold  text-background-gray">
            {navItems.map((item) => (
              <li
                key={item.id}
                className={`
            }`}
                onClick={() => {
                  onSelect(item.label);
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>

          <span
            className="sm:block md:hidden cursor-pointer text-3xl mx-3 text-background-gray"
            onClick={openNav}
          >
            &#9776;
          </span>

          {/* Search Bar */}
          <div className="flex rounded-full p-3 md:min-w-72 min-w-64 bg-dark-gray justify-between">
            <div className="flex-5 flex items-center ">
              <FaSearch className="mx-3 text-background-gray cursor-pointer" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                className="bg-transparent border-0 outline-hidden flex-1 font-poppins w-24 text-background-gray"
              />
            </div>
            <div className="flex-1 flex items-center ml-2 ">
              <div className="h-full w-0.25 bg-slate-300"></div>
              <MdOutlineShoppingBag className="mx-3 text-background-gray size-6" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
