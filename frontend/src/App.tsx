import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth/AuthProvider";
import { CartProvider } from "@/contexts/cart/CartProvider";
import { AppRoutes } from "@/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from "@/components/ui/sonner";
import { PromoProvider } from "./contexts/PromoProvider";


const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PromoProvider>
          <CartProvider>
            <BrowserRouter>
              <AppRoutes />
              <Toaster position="top-right" />
              <ReactQueryDevtools initialIsOpen={false} />
            </BrowserRouter>
          </CartProvider>
        </PromoProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
