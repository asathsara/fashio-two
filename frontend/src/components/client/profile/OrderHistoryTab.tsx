import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const OrderHistoryTab = () => {
    const navigate = useNavigate();

    return (
        <Card className="shadow-lg border-0">
            <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View and track your recent orders</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                        <svg
                            className="w-16 h-16 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-6">Start shopping to see your order history here</p>
                    <Button
                        onClick={() => navigate('/')}
                        className="bg-gray-900 hover:bg-gray-800"
                    >
                        Browse Products
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
