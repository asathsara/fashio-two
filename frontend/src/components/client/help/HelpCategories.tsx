import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingBag, CreditCard, Truck, RotateCcw } from 'lucide-react';

const categories = [
    {
        icon: <ShoppingBag className="w-5 h-5" />,
        title: "Orders & Shopping",
        description: "Learn about placing orders and shopping"
    },
    {
        icon: <CreditCard className="w-5 h-5" />,
        title: "Payment & Billing",
        description: "Payment methods and billing information"
    },
    {
        icon: <Truck className="w-5 h-5" />,
        title: "Shipping & Delivery",
        description: "Delivery times and shipping options"
    },
    {
        icon: <RotateCcw className="w-5 h-5" />,
        title: "Returns & Refunds",
        description: "Return policy and refund process"
    }
];

export const HelpCategories = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-light-gray">
                    <CardHeader>
                        <div className="w-12 h-12 bg-light-gray rounded-full flex items-center justify-center mb-3 text-dark-gray">
                            {category.icon}
                        </div>
                        <CardTitle className="text-xl">{category.title}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
};