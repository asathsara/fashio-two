import React from "react";

const Navbar = () => {
  return (
    <nav>
      <div className="flex justify-between items-center p-4">
        <div className="flex font-pacifico text-2.5xl font-semibold  tracking- pl-4 md:text-3xl">
          Fashio
        </div>
        <div className="flex items-center">
          <span
            className="sm:block md:hidden cursor-pointer text-3xl mx-3 text-black"
            onClick="openNav()"
          >
            &#9776;
          </span>
          <button className="bg-black text-white px-8 py-2 rounded-full font-poppins font-bold">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
