// src/App.tsx
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth/AuthProvider";
import { AppRoutes } from "@/AppRoutes";

function App() {
  return (
    <AuthProvider>  
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
