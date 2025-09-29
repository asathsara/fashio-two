import { Link } from "react-router-dom";
import type { NavItem } from "../types/nav";

type DrawerProps = {
  navItems: NavItem[],
  open: boolean,
  closeNav: () => void
}

const NavigationDrawer = ({
  navItems,
  open,
  closeNav,
}: DrawerProps) => {
  return (
    <div
      className={`${open ? 'w-64' : 'w-0'} h-full z-20 fixed overflow-x-hidden  bg-navbar-gray transition-all duration-300`}
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
            key={item.path}
            className={`px-10 py-3 cursor-pointer w-full rounded-full  items-center text-left text-gray-300 hover:text-gray-100
            }`}

            onClick={closeNav}
          >
            <Link to={item.path}>{item.label}</Link>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavigationDrawer;
