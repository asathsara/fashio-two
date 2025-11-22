import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CheckoutPage = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-md mx-auto text-center">
                <div className="bg-gray-100 rounded-full p-8 inline-flex mb-6">
                    <Package size={64} className="text-gray-400" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Checkout</h1>
                <p className="text-gray-600 mb-8">
                    The checkout feature will be implemented in the next phase.
                    This will include order processing, shipping details, and payment integration.
                </p>
                <div className="space-y-3">
                    <Link to="/cart">
                        <Button variant="default" className="w-full">
                            Back to Cart
                        </Button>
                    </Link>
                    <Link to="/">
                        <Button variant="outline" className="w-full">
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
