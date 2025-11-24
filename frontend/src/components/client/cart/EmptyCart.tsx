import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const EmptyCart = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="bg-gray-100 rounded-full p-8 mb-6">
                <ShoppingCart size={64} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 text-center max-w-md">
                Looks like you haven't added any items to your cart yet.
                Start shopping to fill it up!
            </p>
            <Link to="/">
                <Button size="lg">
                    Start Shopping
                </Button>
            </Link>
        </div>
    );
};

export default EmptyCart;
