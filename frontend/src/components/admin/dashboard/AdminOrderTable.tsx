import { useMemo, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OrderStatusBadge, PaymentStatusBadge } from '@/components/admin/dashboard/OrderStatusBadge';
import type { Order, OrderStatus } from '@/types/order';
import { Spinner } from '@/components/common/Spinner';
import { ChevronDown, ChevronRight } from "lucide-react";
import OrderItemsTable from './order/OrderItemsTable';
import { useUpdateOrderStatus } from '@/hooks/useOrders';


const statusFilters: Array<OrderStatus | 'all'> = ['all', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

interface AdminOrderTableProps {
    orders?: Order[];
    loading: boolean;
    statusFilter: OrderStatus | 'all';
    onStatusFilterChange: (value: OrderStatus | 'all') => void;
}

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('en-LK', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

export const AdminOrderTable = ({ orders = [], loading, statusFilter, onStatusFilterChange }: AdminOrderTableProps) => {
    

    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedOrderId(prev => (prev === id ? null : id));
    };

   const updateStatus = useUpdateOrderStatus();

    const totalRevenue = useMemo(() => orders.reduce((sum, order) => sum + order.total, 0), [orders]);

    return (
        <div className="rounded-xl border bg-white shadow-sm">

            {/* Top Section */}
            <div className="flex flex-col gap-3 border-b px-6 py-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        Orders
                        <span className="px-2 py-0.5 text-sm rounded-full bg-gray-200 text-gray-700">
                            {orders.length}
                        </span>
                    </h3>

                    <p className="text-sm text-gray-500">
                        Rs. {totalRevenue.toFixed(2)} in this view
                    </p>
                </div>

                <Select
                    value={statusFilter}
                    onValueChange={(value) => onStatusFilterChange(value as OrderStatus | 'all')}
                >
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                        {statusFilters.map((filter) => (
                            <SelectItem key={filter} value={filter}>
                                {filter === 'all' ? 'All statuses' : filter}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* TABLE */}
            {loading ? (
                <div className="flex min-h-[200px] items-center justify-center">
                    <Spinner />
                </div>
            ) : orders.length === 0 ? (
                <div className="py-16 text-center text-gray-500">No orders match this filter.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                            <tr>
                                <th className="px-6 py-3">Order</th>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Items</th>
                                <th className="px-6 py-3">Total</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Payment</th>
                                <th className="px-6 py-3 w-10"></th> {/* expandable column */}
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((order) => (
                                <>

                                    {/* MAIN ROW */}
                                    <tr key={order._id} className="border-b last:border-0">
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-gray-900">
                                                #{order._id.slice(-6).toUpperCase()}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {formatDate(order.createdAt)}
                                            </p>
                                        </td>

                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900">
                                                {order.user?.name || 'Online order'}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {order.user?.email ?? 'guest@store.com'}
                                            </p>
                                        </td>

                                        <td className="px-6 py-4 text-gray-700">
                                            {order.items.length} item(s)
                                        </td>

                                        <td className="px-6 py-4 font-semibold text-gray-900">
                                            Rs. {order.total.toFixed(2)}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-2">
                                            <OrderStatusBadge status={order.status} />
                                            <Select
                                                value={order.status}
                                                disabled={updateStatus.isPending}
                                                onValueChange={(value) => {
                                                    if (value === order.status || updateStatus.isPending) {
                                                        return;
                                                    }
                                                    updateStatus.mutate({ orderId: order._id, status: value as OrderStatus });
                                                }}
                                            >
                                                <SelectTrigger size="sm">
                                                    <SelectValue placeholder="Update status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {statusFilters
                                                        .filter((status) => status !== 'all')
                                                        .map((status) => (
                                                            <SelectItem key={status} value={status}>
                                                                {status}
                                                            </SelectItem>
                                                        ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <PaymentStatusBadge status={order.paymentStatus} />
                                        </td>

                                        {/* EXPAND/COLLAPSE BUTTON */}
                                        <td
                                            className="px-6 py-4 cursor-pointer"
                                            onClick={() => toggleExpand(order._id)}
                                        >
                                            {expandedOrderId === order._id ? (
                                                <ChevronDown size={18} />
                                            ) : (
                                                <ChevronRight size={18} />
                                            )}
                                        </td>
                                    </tr>

                                    {/* EXPANDED ROW */}
                                    {expandedOrderId === order._id && (
                                        <tr className="bg-gray-50">
                                            <td colSpan={7} className="px-6 py-4">
                                                <OrderItemsTable items={order.items} />
                                            </td>
                                        </tr>
                                    )}

                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminOrderTable;
