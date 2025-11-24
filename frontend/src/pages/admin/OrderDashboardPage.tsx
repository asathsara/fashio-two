import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminOrderTable from '@/components/admin/dashboard/AdminOrderTable';
import AdminOrderStats from '@/components/admin/dashboard/AdminOrderStats';
import AdminUsersPlaceholder from '@/components/admin/dashboard/AdminUsersPlaceholder';
import { useAdminOrders, useOrderStats } from '@/hooks/useOrders';
import type { OrderStatus } from '@/types/order';

const OrderDashboardPage = () => {
    const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
    const { data: orders, isLoading } = useAdminOrders(statusFilter === 'all' ? undefined : statusFilter);
    const statsQuery = useOrderStats();

    return (
        <div className="space-y-6">
            <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Dashboard</p>
                <h1 className="text-3xl font-bold text-gray-900">Orders & Numbers</h1>
                <p className="text-gray-600">Monitor Rs. performance, update statuses, and keep fulfilment tidy.</p>
            </div>

            <Tabs defaultValue="orders" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 md:w-auto">
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="stats">Statistics</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                </TabsList>

                <TabsContent value="orders">
                    <AdminOrderTable
                        orders={orders}
                        loading={isLoading}
                        statusFilter={statusFilter}
                        onStatusFilterChange={setStatusFilter}
                    />
                </TabsContent>

                <TabsContent value="stats">
                    <AdminOrderStats stats={statsQuery.data} loading={statsQuery.isLoading} />
                </TabsContent>

                <TabsContent value="users">
                    <AdminUsersPlaceholder />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default OrderDashboardPage;
