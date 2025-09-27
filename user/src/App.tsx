import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import { useState, type SetStateAction } from "react";
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
    <Router>
      <Navbar />
      <NavgiationDrawer />
      <FloatingUpButton />
      <Spacer />

      <div className="flex">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/promo" element={<PromoPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
