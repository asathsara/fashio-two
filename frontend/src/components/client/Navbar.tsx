import { useRef, type ChangeEvent, type KeyboardEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { publicNavRoutes } from "@/config/routes";
import { useAuth } from "@/hooks/UseAuth";
import { useCart } from "@/hooks/useCart";
import { useNavbarSearch } from "@/hooks/useNavbarSearch";

type NavbarProps = {
  onOpenDrawer: () => void;
};

const Navbar = ({ onOpenDrawer }: NavbarProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const { query, setQuery, clearQuery } = useNavbarSearch();

  const handleLogout = async () => {
    await logout();
  };

  const handleCartClick = () => {
    if (isAuthenticated) {
      navigate('/cart');
    } else {
      navigate('/login');
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
    focusInput();
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearchSubmit();
    } else if (event.key === 'Escape') {
      clearQuery();
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-30 bg-navbar-gray h-20 shadow-md">
      <div className="flex px-2 md:px-4 h-full items-center justify-between">
        {/* Logo */}
        <div className="flex font-pacifico text-2xl md:text-3xl font-semibold pl-2 md:pl-4 cursor-pointer text-background-gray shrink-0">
          <Link to="/">Fashio</Link>
        </div>

        {/* Center Navigation */}
        <div className="flex items-center flex-1 justify-end">
          <ul className="hidden md:flex gap-6 font-poppins font-semibold text-background-gray mx-4 shrink-0">
            {publicNavRoutes.map((route) => (
              <li key={route.path}>
                <Link to={route.path}>{route.label}</Link>
              </li>
            ))}
          </ul>

          {/* Search Bar */}
          <div className="flex rounded-full p-2 md:p-3 flex-1 max-w-[200px] md:max-w-md mx-2 bg-dark-gray justify-between transition-all duration-300">
            <div className="flex flex-[5] items-center overflow-hidden">
              <button
                type="button"
                onClick={handleSearchSubmit}
                className="mx-2 md:mx-3 text-background-gray cursor-pointer bg-transparent border-0 outline-none flex items-center shrink-0"
                aria-label="Search products"
              >
                <FaSearch />
              </button>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search"
                className="bg-transparent border-0 outline-none w-full min-w-0 font-poppins text-background-gray text-sm md:text-base"
                aria-label="Search catalog"
              />
            </div>
            <div className="flex items-center ml-1 md:ml-2 relative shrink-0">
              <div className="h-4 md:h-full w-px bg-slate-300"></div>
              <div
                className="mx-2 md:mx-3 cursor-pointer relative"
                onClick={handleCartClick}
              >
                <MdOutlineShoppingBag className="text-background-gray size-5 md:size-6" />
                {isAuthenticated && itemCount > 0 && (
                  <Badge
                    className="absolute -top-2 -right-2 h-4 w-4 md:h-5 md:w-5 flex items-center justify-center p-0 text-[10px] md:text-xs"
                    variant="secondary"
                  >
                    {itemCount > 99 ? '99+' : itemCount}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button - Moved to right for typical pattern, or keep in flow? 
             Original had it before search bar. Let's keep consistent but flexible.
             Wait, original had: Logo -> Nav -> MobileMenu -> Search -> Auth.
             If I use flex-1 for search, it will take space.
          */}

          {/* Right-side Auth Buttons / User Menu */}
          <div className="hidden md:block ml-4 shrink-0">
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
                  <DropdownMenuItem onClick={() => navigate("/cart")}>
                    Cart {itemCount > 0 && `(${itemCount})`}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Button - Moved to the end on mobile to be easily accessible */}
          <span
            className="md:hidden cursor-pointer text-2xl mx-2 text-background-gray shrink-0"
            onClick={onOpenDrawer}
          >
            &#9776;
          </span>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
