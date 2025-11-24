import type { Order } from '@/types/order';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderStatusBadge, PaymentStatusBadge } from '@/components/admin/order/OrderStatusBadge';
import { Link } from 'react-router-dom';
import { buildImageSrc, getImageUrl } from '@/utils/image';
import { formatDateTime } from '@/utils/datetime';

interface ProfileOrderCardProps {
    order: Order;
}


export const ProfileOrderCard = ({ order }: ProfileOrderCardProps) => {
    return (
        <Card className="shadow-sm">
            <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <CardTitle>Order #{order._id.slice(-6).toUpperCase()}</CardTitle>
                    <p className="text-sm text-gray-500">Placed on {formatDateTime(order.createdAt)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <OrderStatusBadge status={order.status} />
                    <PaymentStatusBadge status={order.paymentStatus} />
                </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-700">
                {order.items.map((item) => (
                    <div key={item._id ?? `${item.name}-${item.size}`} className="flex items-center justify-between">
                        <div className='flex'>
                            <Link to={`/items/${item._id}`} className="flex-shrink-0 pt-4">
                                <img
                                    src={buildImageSrc(getImageUrl(item.item!, item.selectedImageIndex))}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-md"
                                />
                            </Link>
                            <div className="mt-4 ml-4">
                                <p className="font-semibold text-gray-900">{item.name}</p>
                                <p className="text-xs text-gray-500">Size {item.size} </p>
                                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                            </div>
                        </div>
                        <p className="font-semibold text-gray-700">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
                <div className="flex justify-between border-t pt-3 text-base font-semibold text-gray-900">
                    <span>Total</span>
                    <span>Rs. {order.total.toFixed(2)}</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProfileOrderCard;
