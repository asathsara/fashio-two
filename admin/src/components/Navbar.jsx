import React from "react";

const Navbar = ({ openNav }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-white">
      <div className="flex justify-between items-center p-4 ">
        <div className="flex font-pacifico text-2.5xl font-semibold tracking- pl-4 md:text-3xl">
          Fashio
        </div>
        <div className="flex items-center">
          <span
            className="sm:block md:hidden cursor-pointer text-3xl mx-3 text-black"
            onClick={openNav}
          >
            &#9776;
          </span>
          <button className="bg-black text-white px-8 py-2 rounded-full font-poppins">
            Logout
          </button>
        </div>
      </div>
      {/* divder */}
      <div className="h-0.25 w-auto bg-slate-200 mt-2 "></div>
    </nav>
  );
};

export default Navbar;
