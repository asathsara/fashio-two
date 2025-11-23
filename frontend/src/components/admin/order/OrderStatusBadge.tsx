import type { OrderStatus, PaymentStatus } from '@/types/order';
import { cn } from '@/lib/utils';

const orderStatusStyles: Record<OrderStatus, string> = {
    Pending: 'bg-amber-100 text-amber-800',
    Processing: 'bg-blue-100 text-blue-800',
    Shipped: 'bg-indigo-100 text-indigo-800',
    Delivered: 'bg-emerald-100 text-emerald-800',
    Cancelled: 'bg-rose-100 text-rose-800'
};

const paymentStatusStyles: Record<PaymentStatus, string> = {
    Pending: 'bg-amber-100 text-amber-800',
    Paid: 'bg-emerald-100 text-emerald-800',
    Refunded: 'bg-slate-100 text-slate-800'
};

export const OrderStatusBadge = ({ status }: { status: OrderStatus }) => (
    <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', orderStatusStyles[status])}>
        {status}
    </span>
);

export const PaymentStatusBadge = ({ status }: { status: PaymentStatus }) => (
    <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', paymentStatusStyles[status])}>
        {status}
    </span>
);

export default OrderStatusBadge;
