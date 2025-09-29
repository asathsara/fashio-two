import React, { useState } from "react";
import Navbar from "./components/Navbar";
import NavigationRail from "./components/NavigationRail";
import ImageSliderManagerPage from "./pages/ImageSliderManagerPage";
import ItemInsertPage from "./pages/ItemInsertPage";
import ItemListPage from "./pages/ItemListPage";
import CategoriesInsertPage from "./pages/CategoriesInsertPage";
import PromoAddPge from "./pages/PromoAddPge";
import NavgiationDrawer from "./components/NavgiationDrawer";
import Spacer from "./components/Spacer";

const App = () => {
  const [currentPage, setCurrentPage] = useState("Image Slider"); // Current page state
  const [navbarOpen, setNavabarOpen] = useState(false);

  const navItems = [
    { id: 1, label: "Image Slider" },
    { id: 2, label: "Items Insert" },
    { id: 3, label: "Items List" },
    { id: 4, label: "Categories" },
    { id: 5, label: "Promo" },
  ];

  // Map label to components
  const pageComponents = {
    "Image Slider": <ImageSliderManagerPage />,
    "Items Insert": <ItemInsertPage />,
    "Items List": <ItemListPage />,
    Categories: <CategoriesInsertPage />,
    Promo: <PromoAddPge />,
  };

  const openNav = () => {
    setNavabarOpen(true);
  };

  const closeNav = () => {
    setNavabarOpen(false);
  };

  return (
    <>
      <Navbar openNav={openNav} />
      <Spacer />
      <NavgiationDrawer
        className={`${navbarOpen ? "w-64" : "w-0"}`}
        navItems={navItems}
        onSelect={(label) => setCurrentPage(label)}
        closeNav={closeNav}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />

      <div className="flex mt-4">
        <NavigationRail
          navItems={navItems}
          className="hidden md:block"
          onSelect={(label) => setCurrentPage(label)}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
        <div className="flex-1 p-4 mt-4">{pageComponents[currentPage]}</div>
      </div>
    </>
  );
};

export default App;
