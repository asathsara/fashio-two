import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import orderService from '@/services/orderService';
import type {
    CheckoutResponse,
    CreateOrderPayload,
    Order,
    OrderStats,
    OrderStatus,
    PaymentStatus
} from '@/types/order';
import { getErrorMessage } from '@/utils/errorHandler';
import { useCart } from '@/hooks/useCart';

type UpdateStatusPayload = {
    orderId: string;
    status?: OrderStatus;
    paymentStatus?: PaymentStatus;
};

export const useMyOrders = () => {
    return useQuery<Order[]>({
        queryKey: ['orders', 'me'],
        queryFn: orderService.getMyOrders
    });
};

export const useOrderDetails = (orderId?: string) => {
    return useQuery<Order>({
        queryKey: ['orders', orderId],
        queryFn: () => orderService.getOrderById(orderId as string),
        enabled: Boolean(orderId)
    });
};

export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    const { fetchCart } = useCart();

    return useMutation<CheckoutResponse, unknown, CreateOrderPayload>({
        mutationFn: (payload) => orderService.checkout(payload),
        onSuccess: async (data) => {
            toast.success(data.message || 'Order placed successfully');
            queryClient.invalidateQueries({ queryKey: ['orders', 'me'] });
            queryClient.invalidateQueries({ queryKey: ['orders', 'admin'] });
            await fetchCart();
        },
        onError: (error) => {
            toast.error(getErrorMessage(error, 'Unable to place order right now'));
        }
    });
};

export const useAdminOrders = (status?: OrderStatus) => {
    return useQuery<Order[]>({
        queryKey: ['orders', 'admin', status || 'all'],
        queryFn: () => orderService.getAdminOrders(status),
        staleTime: 1000 * 30
    });
};

export const useOrderStats = () => {
    return useQuery<OrderStats>({
        queryKey: ['orders', 'stats'],
        queryFn: orderService.getOrderStats,
        staleTime: 1000 * 60
    });
};

export const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();

    return useMutation<{ message: string; order: Order }, unknown, UpdateStatusPayload>({
        mutationFn: ({ orderId, status, paymentStatus }) =>
            orderService.updateOrderStatus(orderId, { status, paymentStatus }),
        onSuccess: (data) => {
            toast.success(data.message || 'Order updated');
            queryClient.invalidateQueries({ queryKey: ['orders', 'admin'] });
            queryClient.invalidateQueries({ queryKey: ['orders', 'me'] });
        },
        onError: (error) => {
            toast.error(getErrorMessage(error, 'Unable to update order right now'));
        }
    });
}

export const useCancelOrder = () => {
    const queryClient = useQueryClient();
    return useMutation<void, unknown, string>({
        mutationFn: (orderId) => orderService.cancelOrder(orderId),
        onSuccess: () => {
            toast.success('Order cancelled successfully');
            queryClient.invalidateQueries({ queryKey: ['orders', 'me'] });
            queryClient.invalidateQueries({ queryKey: ['orders', 'admin'] });
        },
        onError: (error) => {
            toast.error(getErrorMessage(error, 'Unable to cancel order right now'));
        }
    });
}
