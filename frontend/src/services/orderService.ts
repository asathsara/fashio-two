import api from './api';
import API_ENDPOINTS from './endpoints';
import type {
    Order,
    OrderStats,
    CreateOrderPayload,
    CheckoutResponse,
    OrderStatus,
    PaymentStatus
} from '@/types/order';

export const orderService = {
    checkout: async (payload: CreateOrderPayload = {}): Promise<CheckoutResponse> => {
        const response = await api.post(API_ENDPOINTS.ORDER_CHECKOUT, payload);
        return response.data;
    },

    getMyOrders: async (): Promise<Order[]> => {
        const response = await api.get(API_ENDPOINTS.ORDER_ME);
        return response.data;
    },

    getOrderById: async (orderId: string): Promise<Order> => {
        const response = await api.get(API_ENDPOINTS.ORDER_DETAIL(orderId));
        return response.data;
    },

    getAdminOrders: async (status?: OrderStatus): Promise<Order[]> => {
        const response = await api.get(API_ENDPOINTS.ORDER_ADMIN, {
            params: status ? { status } : undefined
        });
        return response.data;
    },

    updateOrderStatus: async (
        orderId: string,
        payload: { status?: OrderStatus; paymentStatus?: PaymentStatus }
    ): Promise<{ message: string; order: Order }> => {
        const response = await api.patch(API_ENDPOINTS.ORDER_STATUS(orderId), payload);
        return response.data;
    },

    getOrderStats: async (): Promise<OrderStats> => {
        const response = await api.get(API_ENDPOINTS.ORDER_ADMIN_STATS);
        return response.data;
    }
};

export default orderService;
