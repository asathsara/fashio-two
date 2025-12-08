import { NavLink } from "react-router-dom";
import type { NavItem } from "@/types/nav";


type DrawerProps = {
  routes: NavItem[];
  closeNav?: () => void;
  navbarOpen: boolean
};

const NavigationDrawer = ({ routes, closeNav, navbarOpen }: DrawerProps) => {


  return (
    <div
      className={`${navbarOpen ? "w-64" : "w-0"} h-full z-40 fixed overflow-x-hidden  bg-slate-100 transition-all duration-300`}
    >
      <span
        className="cursor-pointer text-4xl float-right mr-6 pt-3 pb-5 "
        onClick={closeNav}
      >
        &times;
      </span>
      <ul className="list-none flex flex-col gap-2 w-full px-4  font-poppins ">
        {routes.map((r) => (
          <NavLink
            key={r.path}
            to={r.path}
            onClick={closeNav}
            className={({ isActive }) =>
              `px-4 py-2 rounded-full transition text-left ${isActive ? "bg-black text-white" : "hover:bg-gray-200 text-gray-800"
              }`
            }
          >
            {r.label}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default NavigationDrawer;
