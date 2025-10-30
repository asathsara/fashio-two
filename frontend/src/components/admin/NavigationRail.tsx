import { NavLink } from "react-router-dom";
import type { AppRoute } from "../../config/routes";

type RailProps = {
  routes: AppRoute[];
};

const NavigationRail = ({ routes }: RailProps) => {
  return (
    <div
      className={`pt-20 hidden md:flex min-w-44 h-screen md:flex-col items-start pb-4 mx-4`}
    >
      <ul className="list-none flex flex-col gap-2 w-full mt-4">
        {routes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-full transition text-left ${isActive ? "bg-black text-white" : "hover:bg-gray-200 text-gray-800"
              }`
            }
          >
            {route.label}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default NavigationRail;