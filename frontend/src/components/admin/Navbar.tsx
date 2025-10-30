import { useNavigate } from "react-router-dom";

type NavbarProps = {
  openNav: () => void
}

const Navbar = ({ openNav }: NavbarProps) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    // go back to home page
    navigate('/')
  }
  return (
    <nav className="fixed top-0 left-0 h-20 w-full z-10 bg-navbarGray">
      <div className="flex justify-between  items-center p-5 ">
        <div className="flex font-pacifico text-2.5xl font-semibold tracking- pl-4 md:text-3xl text-backgroundGray cursor-pointer" onClick={() => navigate('/admin/')}>
          Fashio
        </div>
        <div className="flex items-center">
          <span
            className="sm:block md:hidden cursor-pointer text-3xl mx-3 text-backgroundGray"
            onClick={openNav}
          >
            &#9776;
          </span>
          <button className="bg-darkGray text-backgroundGray px-8 py-2 rounded-full font-semibold cursor-pointer" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
