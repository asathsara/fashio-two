import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';

interface RevenueCardProps {
    totalRevenue: number;
    averageOrderValue: number;
    totalOrders: number;
    pendingOrders: number;
}

const formatCurrency = (value: number) => `Rs. ${value.toFixed(2)}`;

export const RevenueCard = ({ totalRevenue, averageOrderValue, totalOrders, pendingOrders }: RevenueCardProps) => {
    const animatedRevenue = useCountUp(totalRevenue);
    const animatedAOV = useCountUp(averageOrderValue);
    const animatedOrders = useCountUp(totalOrders);
    const animatedPending = useCountUp(pendingOrders);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Revenue</CardTitle>
                    <CardDescription>All-time performance</CardDescription>
                </div>
                <TrendingUp className="h-8 w-8 text-gray-400" />
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
                <div>
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-semibold text-gray-900">{formatCurrency(animatedRevenue)}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Avg. Order Value</p>
                    <p className="text-2xl font-semibold text-gray-900">{formatCurrency(animatedAOV)}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="text-2xl font-semibold text-gray-900">{Math.round(animatedOrders)}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Pending Orders</p>
                    <p className="text-2xl font-semibold text-gray-900">{Math.round(animatedPending)}</p>
                </div>
            </CardContent>
        </Card>
    );
};
