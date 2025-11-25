import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users } from 'lucide-react';

interface TopMoversCardProps {
    topItems: Array<{ name: string; totalSold: number; revenue: number }>;
}

const formatCurrency = (value: number) => `Rs. ${value.toFixed(2)}`;

export const TopMoversCard = ({ topItems }: TopMoversCardProps) => {
    return (
        <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Top Movers</CardTitle>
                    <CardDescription>Best selling items</CardDescription>
                </div>
                <Users className="h-8 w-8 text-gray-400" />
            </CardHeader>
            <CardContent>
                {topItems.length === 0 ? (
                    <p className="text-sm text-gray-500">No items sold yet.</p>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {topItems.map(item => (
                            <div
                                key={item.name}
                                className="rounded-lg border border-gray-100 p-4 hover:scale-105 transition-all hover:shadow-md hover:border-gray-300"
                            >
                                <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                                <p className="text-xs text-gray-500">{item.totalSold} unit(s)</p>
                                <p className="mt-2 text-sm font-medium text-gray-900">{formatCurrency(item.revenue)}</p>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
