import type { OrderStats } from '@/types/order';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/common/Spinner';
import { PackageCheck, TrendingUp, Users } from 'lucide-react';

interface AdminOrderStatsProps {
    stats?: OrderStats;
    loading: boolean;
}

const formatCurrency = (value: number) => `Rs. ${value.toFixed(2)}`;

export const AdminOrderStats = ({ stats, loading }: AdminOrderStatsProps) => {
    if (loading) {
        return (
            <div className="flex min-h-[200px] items-center justify-center">
                <Spinner />
            </div>
        );
    }

    if (!stats) {
        return <div className="rounded-xl border bg-white p-10 text-center text-gray-500">No stats available yet.</div>;
    }

     /**
     * maxMonthly:
     * We calculate the highest monthly revenue value.
     * This is used to scale each bar proportionally in the Monthly Trend graph.
     * The `1` ensures we never divide by zero.
     */
    const maxMonthly = Math.max(...stats.monthlySales.map((month) => month.total), 1);

    return (
        <div className="grid gap-6 lg:grid-cols-2">
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
                        <p className="text-2xl font-semibold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Avg. Order Value</p>
                        <p className="text-2xl font-semibold text-gray-900">{formatCurrency(stats.averageOrderValue)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Orders</p>
                        <p className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Pending Orders</p>
                        <p className="text-2xl font-semibold text-gray-900">{stats.pendingOrders}</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Monthly Trend</CardTitle>
                        <CardDescription>Last six months</CardDescription>
                    </div>
                    <PackageCheck className="h-8 w-8 text-gray-400" />
                </CardHeader>
                <CardContent className="space-y-4">
                    {stats.monthlySales.map((month) => (
                        <div key={month.label}>
                            <div className="mb-1 flex items-center justify-between text-sm text-gray-600">
                                <span>{month.label}</span>
                                <span>{formatCurrency(month.total)}</span>
                            </div>
                            <div className="h-2 rounded-full bg-gray-100">
                                <div
                                    className="h-2 rounded-full bg-gray-900"
                                    style={{ width: `${Math.max((month.total / maxMonthly) * 100, 4)}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Top Movers</CardTitle>
                        <CardDescription>Best selling items by units</CardDescription>
                    </div>
                    <Users className="h-8 w-8 text-gray-400" />
                </CardHeader>
                <CardContent>
                    {stats.topItems.length === 0 ? (
                        <p className="text-sm text-gray-500">No items sold yet.</p>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {stats.topItems.map((item) => (
                                <div key={item.name} className="rounded-lg border border-gray-100 p-4">
                                    <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                                    <p className="text-xs text-gray-500">{item.totalSold} unit(s)</p>
                                    <p className="mt-2 text-sm font-medium text-gray-900">{formatCurrency(item.revenue)}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminOrderStats;
