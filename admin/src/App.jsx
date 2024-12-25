import React, { useState } from "react";
import Navbar from "./components/Navbar";
import NavigationRail from "./components/NavigationRail";
import ImageSliderManagerPage from "./pages/ImageSliderManagerPage";
import ItemInsertPage from "./pages/ItemInsertPage";
import ItemListPage from "./pages/ItemListPage";
import CategoriesInsertPage from "./pages/CategoriesInsertPage";
import PromoAddPge from "./pages/PromoAddPge";



const App = () => {
  const [currentPage, setCurrentPage] = useState("Image Slider"); // Current page state

  // Map label to components
  const pageComponents = {
    "Image Slider": <ImageSliderManagerPage/> ,
    "Items Insert": <ItemInsertPage/>,
    "Items List": <ItemListPage />,
    Categories: <CategoriesInsertPage />,
    Promo: <PromoAddPge />,
  };

  return (
    <>
      <Navbar />
      <div className="h-0.25 w-auto bg-slate-200 m2-4"></div>
      <div className="flex">
        <NavigationRail onSelect={(label) => setCurrentPage(label)} />
        <div className="flex-1 p-4">{pageComponents[currentPage]}</div>
      </div>
    </>
  );
};

export default App;
