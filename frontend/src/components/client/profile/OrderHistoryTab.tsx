import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useMyOrders } from '@/hooks/useOrders';
import { Spinner } from '@/components/common/Spinner';
import ProfileOrderCard from '@/components/client/profile/ProfileOrderCard';
import { ComponentErrorBoundary } from '@/error-boundaries/ComponentErrorBoundary';
import { Suspense } from 'react';
import { ComponentLoadingFallback } from '@/components/common/LazyLoadingFallback';

const OrderHistoryTab = () => {
    const navigate = useNavigate();
    const { data: orders, isLoading } = useMyOrders();

    if (isLoading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <Spinner />
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <Card className="border-0 shadow-lg">
                <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>View and track your recent orders</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="py-12 text-center">
                        <div className="mb-4 text-gray-400">
                            <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-700">No orders yet</h3>
                        <p className="mb-6 text-gray-500">Start shopping to see your order history here</p>
                        <Button onClick={() => navigate('/')} className="bg-gray-900 hover:bg-gray-800">
                            Browse Products
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {orders.map((order) => (
                <ComponentErrorBoundary
                    name={`order ${order._id}`}
                >
                    <Suspense fallback={<ComponentLoadingFallback />}>
                        <ProfileOrderCard key={order._id} order={order} />
                    </Suspense>
                </ComponentErrorBoundary>
            ))}
        </div>
    );
};

export default OrderHistoryTab;