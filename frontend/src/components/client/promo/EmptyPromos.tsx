import { ShoppingBag } from "lucide-react";

export const EmptyPromos = () => {
    return (
        <div className="max-w-2xl mx-auto text-center py-16">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                No Active Promotions
            </h2>
            <p className="text-gray-600">
                Check back soon for exciting deals and special offers!
            </p>
        </div>
    );
};

export default EmptyPromos;
