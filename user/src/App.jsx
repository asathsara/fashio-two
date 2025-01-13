import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import NavgiationDrawer from "./components/NavgiationDrawer";
import Spacer from "./components/Spacer";
import HomePage from "./pages/HomePage";
import PromoPage from "./pages/PromoPage";
import HelpPage from "./pages/HelpPage";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer";
import FloatingUpButton from "./components/FloatingUpButton";

function App() {
  const [currentPage, setCurrentPage] = useState("Home"); // Current page state

  const [navbarOpen, setNavabarOpen] = useState(false);

  const navItems = [
    { id: 1, label: "Promo" },
    { id: 2, label: "Help" },
    { id: 3, label: "Login" },
  ];

  // Map label to components
  const pageComponents = {
    Home: <HomePage />,
    Promo: <PromoPage />,
    Help: <HelpPage />,
    Login: <LoginPage />,
  };

  const openNav = () => {
    setNavabarOpen(true);
  };

  const closeNav = () => {
    setNavabarOpen(false);
  };

  return (
    <>
      <Navbar
        openNav={openNav}
        onSelect={(label) => setCurrentPage(label)}
        navItems={navItems}
      />

      <NavgiationDrawer
        className={`${navbarOpen ? "w-64" : "w-0"}`}
        navItems={navItems}
        onSelect={(label) => setCurrentPage(label)}
        closeNav={closeNav}
      />

      <FloatingUpButton/>
      <Spacer />
      <div className="flex ">{pageComponents[currentPage]}</div>
      <Footer onSelect={(label) => setCurrentPage(label)} footerItems={navItems} />
    </>
  );
}

export default App;
