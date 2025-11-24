import { Tag } from "lucide-react";

export const PromoHero = () => {
    return (
        <div className="bg-gradient-to-r from-navbar-gray to-dark-gray text-white py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <Tag className="w-12 h-12 mx-auto mb-4" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
                        Special Offers
                    </h1>
                    <p className="text-lg text-gray-300">
                        Don't miss out on our amazing deals and limited-time promotions
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PromoHero;
