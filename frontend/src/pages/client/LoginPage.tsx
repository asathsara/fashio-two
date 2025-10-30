import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm  from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { useAuth } from "@/hooks/UseAuth";

const LoginPage = () => {
  const { isAuthenticated, loading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      if (user?.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [isAuthenticated, loading, user, navigate]);



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 via-white to-gray-200 px-4">
      <div className="absolute top-6 right-6">
        <button
          type="button"
          aria-label="Close"
          title="Close"
          onClick={() => navigate("/", { replace: true })}
          className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-md border border-gray-200 cursor-pointer transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-gray-100">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome</h1>
          <p className="text-gray-600 text-sm">
            Sign in or create an account to continue your fashion journey
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid grid-cols-2 bg-gray-100 rounded-lg p-1 mb-6">
            <TabsTrigger
              value="login"
              className="rounded-md text-sm font-medium py-2 data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:text-gray-900"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="rounded-md text-sm font-medium py-2 data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:text-gray-900"
            >
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>

          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
