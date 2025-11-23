import type { Address } from './auth';
import type { Item } from './item';

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
export type PaymentStatus = 'Pending' | 'Paid' | 'Refunded';

export interface OrderItem {
    _id?: string;
    item?: Item | null;
    name: string;
    size: string;
    quantity: number;
    price: number;
    selectedImageIndex: number;
}

export interface Order {
    _id: string;
    user?: {
        _id: string;
        name: string;
        email: string;
    };
    items: OrderItem[];
    shippingAddress: Address;
    subtotal: number;
    tax: number;
    total: number;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    paymentMethod: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface OrderStats {
    totalOrders: number;
    pendingOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    monthlySales: { label: string; total: number; orders: number }[];
    topItems: { name: string; totalSold: number; revenue: number }[];
}

export interface CreateOrderPayload {
    paymentMethod?: string;
    notes?: string;
}

export interface CheckoutResponse {
    message: string;
    order: Order;
}
