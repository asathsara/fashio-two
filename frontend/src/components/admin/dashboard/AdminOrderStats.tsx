import type { OrderStats } from '@/types/order';
import { Spinner } from '@/components/common/Spinner';
import { RevenueCard } from './stats/RevenueCard';
import { MonthlyTrendCard } from './stats/MonthlyTrendCard';
import { TopMoversCard } from './stats/TopMoversCard';

interface Props {
    stats?: OrderStats;
    loading: boolean;
}

export const AdminOrderStats = ({ stats, loading }: Props) => {
    if (loading) return <Spinner fullHeight />;

    if (!stats) {
        return (
            <div className="rounded-xl border bg-white p-10 text-center text-gray-500">
                No stats available yet.
            </div>
        );
    }

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <RevenueCard
                totalRevenue={stats.totalRevenue}
                averageOrderValue={stats.averageOrderValue}
                totalOrders={stats.totalOrders}
                pendingOrders={stats.pendingOrders}
            />
            <MonthlyTrendCard monthlySales={stats.monthlySales} />
            <TopMoversCard topItems={stats.topItems} />
        </div>
    );
};

export default AdminOrderStats;
