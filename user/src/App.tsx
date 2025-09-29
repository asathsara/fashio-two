import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Footer from "./components/Footer";
import FloatingUpButton from "./components/FloatingUpButton";
import { routes } from "./config/routes";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Spacer from "./components/Spacer";
import NavigationDrawer from "./components/NavigationDrawer";

function App() {

  const [drawerOpen , setDrawerOpen] = useState<boolean>(false)

  return (
     <Router>
      <Navbar navItems={routes.filter(r => r.showInNav)} onOpenDrawer={() => setDrawerOpen(true)}  />
      <NavigationDrawer navItems={routes.filter(r => r.showInNav)} open={drawerOpen} closeNav={() => setDrawerOpen(false)} />
      <FloatingUpButton />
      <Spacer />

      <div className="flex">
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>

      {/* <Footer /> */}
    </Router>
  );
}

export default App;
