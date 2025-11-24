import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PackageCheck } from 'lucide-react';

interface MonthlyTrendCardProps {
    monthlySales: Array<{ label: string; total: number }>;
}

const formatCurrency = (value: number) => `Rs. ${value.toFixed(2)}`;

const ProgressBar = ({ label, value, maxValue, delay }: { label: string; value: number; maxValue: number; delay: number }) => {
    const [width, setWidth] = useState('0%');

    useEffect(() => {
        const percent = Math.max((value / maxValue) * 100, 4);
        setWidth(`${percent}%`);
    }, [value, maxValue]);

    return (
        <div>
            <div className="mb-1 flex items-center justify-between text-sm text-gray-600">
                <span>{label}</span>
                <span>{formatCurrency(value)}</span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                    className="h-2 bg-gray-900 rounded-full transition-all duration-700 ease-out"
                    style={{
                        width,
                        transitionDelay: `${delay}ms`
                    }}
                />
            </div>
        </div>
    );
};

export const MonthlyTrendCard = ({ monthlySales }: MonthlyTrendCardProps) => {
    const maxMonthly = Math.max(...monthlySales.map(m => m.total), 1);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Monthly Trend</CardTitle>
                    <CardDescription>Last six months</CardDescription>
                </div>
                <PackageCheck className="h-8 w-8 text-gray-400" />
            </CardHeader>
            <CardContent className="space-y-4">
                {monthlySales.map((month, idx) => (
                    <ProgressBar
                        key={month.label}
                        label={month.label}
                        value={month.total}
                        maxValue={maxMonthly}
                        delay={idx * 120}
                    />
                ))}
            </CardContent>
        </Card>
    );
};
