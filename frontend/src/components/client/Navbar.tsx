import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { publicNavRoutes } from "@/config/routes"; // ✅ uses route config
import { useAuth } from "@/hooks/UseAuth";

type NavbarProps = {
  onOpenDrawer: () => void;
};

const Navbar = ({ onOpenDrawer }: NavbarProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-navbar-gray h-20 shadow-md">
      <div className="flex p-4 items-center justify-between">
        {/* Logo */}
        <div className="flex font-pacifico text-3xl font-semibold pl-4 cursor-pointer text-background-gray">
          <Link to="/">Fashio</Link>
        </div>

        {/* Center Navigation */}
        <div className="flex items-center">
          <ul className="hidden md:flex gap-6 font-poppins font-semibold text-background-gray mx-4">
            {publicNavRoutes.map((route) => (
              <li key={route.path}>
                <Link to={route.path}>{route.label}</Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <span
            className="md:hidden cursor-pointer text-3xl mx-3 text-background-gray"
            onClick={onOpenDrawer}
          >
            &#9776;
          </span>

          {/* Search Bar */}
          <div className="flex rounded-full p-3 md:min-w-72 min-w-64 bg-dark-gray justify-between">
            <div className="flex flex-[5] items-center">
              <FaSearch className="mx-3 text-background-gray cursor-pointer" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                className="bg-transparent border-0 outline-none flex-1 font-poppins text-background-gray"
              />
            </div>
            <div className="flex items-center ml-2">
              <div className="h-full w-px bg-slate-300"></div>
              <MdOutlineShoppingBag className="mx-3 text-background-gray size-6" />
            </div>
          </div>

          {/* Right-side Auth Buttons / User Menu */}
          <div className="ml-6">
            {!isAuthenticated ? (
              <Button asChild className="rounded-full px-5">
                <Link to="/login">Login</Link>
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="cursor-pointer">
                    <AvatarFallback>
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuLabel>
                    {user?.name || "User"}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/orders")}>
                    Orders
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
