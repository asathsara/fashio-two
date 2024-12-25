import React from "react";
import Navbar from "./components/Navbar";
import NavigationRail from "./components/NavigationRail";
import ImageSliderManager from "./pages/ImageSliderManager";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="h-0.25 w-auto bg-slate-200  m2-4"></div>
      <div className="flex">
        <NavigationRail />
        <ImageSliderManager />
      </div>
      
    </>
  );
};

export default App;
