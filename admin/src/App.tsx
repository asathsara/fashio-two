import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import NavigationRail from "./components/NavigationRail";
import NavigationDrawer from "./components/NavigationDrawer";
import Spacer from "./components/Spacer";
import { routes, navRoutes, DEFAULT_ROUTE } from "./config/routes";

const App = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const openNav = () => setNavbarOpen(true);
  const closeNav = () => setNavbarOpen(false);

  return (
    <BrowserRouter>
      <Navbar openNav={openNav} />
      <Spacer />

      <NavigationDrawer
        routes={navRoutes}
        closeNav={closeNav}
        navbarOpen={navbarOpen}
      />

      <div className="flex mt-4">
        <NavigationRail routes={navRoutes} />

        <div className="flex-1 p-4 mt-4">
          <Routes>
            <Route path="/" element={<Navigate to={DEFAULT_ROUTE} replace />} />
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
            <Route path="*" element={<Navigate to={DEFAULT_ROUTE} replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
