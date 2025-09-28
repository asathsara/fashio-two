import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Footer from "./components/Footer";
import FloatingUpButton from "./components/FloatingUpButton";
import { routes } from "./config/routes";

function App() {

  return (
     <Router>
      <Navbar navItems={routes.filter(r => r.showInNav)} />
      <NavigationDrawer navItems={routes.filter(r => r.showInNav)} />
      <FloatingUpButton />
      <Spacer />

      <div className="flex">
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
