import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-background-gray via-white to-gray-300 px-4">
            <motion.div
                className="flex flex-col items-center text-center max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* 404 Number */}
                <h1 className="text-9xl md:text-[12rem] font-bold font-poppins  text-navbar-gray   bg-clip-text">
                    404
                </h1>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mb-8"
                >
                    <h2 className="text-3xl md:text-4xl font-bold font-poppins text-black mb-4">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-lg md:text-xl text-black/70 mb-2">
                        The page you're looking for seems to have wandered off.
                    </p>
                    <p className="text-base md:text-lg text-black/60">
                        It might have been moved, deleted, or never existed at all.
                    </p>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                    className="flex gap-4 mb-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <div
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-navbar-gray to-background-gray opacity-25 animate-bounce"
                        style={{ animationDelay: "0s", animationDuration: "2s" }}
                    />
                    <div
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-navbar-gray to-background-gray animate-bounce"
                        style={{ animationDelay: "0.2s", animationDuration: "2s" }}
                    />
                    <div
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-navbar-gray to-background-gray animate-bounce"
                        style={{ animationDelay: "0.4s", animationDuration: "2s" }}
                    />
                </motion.div>

                {/* Action Buttons */}
                <div className="flex space-between gap-6 mb-8 flex-col sm:flex-row w-full sm:w-auto">
                    <Button
                        onClick={() => navigate("/")}
                        className="text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        size="lg"
                    >
                        <Home className="mr-2 size-5" />
                        Go to Home
                    </Button>

                    <Button
                        onClick={() => navigate(-1)}
                        variant="outline"
                        className="border-2 hover:text-navbar-gray font-semibold px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all duration-300"
                        size="lg"
                    >
                        <ArrowLeft className="mr-2 size-5" />
                        Go Back
                    </Button>
                </div>


                {/* Help Text */}

                <p className="text-sm text-black/60 mb-2">
                    Looking for something specific?
                </p>
                <Button
                    onClick={() => navigate("/")}
                    variant="link"
                >
                    <Search className="mr-2 size-4" />
                    Browse our collection
                </Button>

            </motion.div>
        </div>
    );
};

export default NotFoundPage;
