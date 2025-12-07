import type { Order } from '@/types/order';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderStatusBadge, PaymentStatusBadge } from '@/components/admin/dashboard/OrderStatusBadge';
import { Link } from 'react-router-dom';
import { buildImageSrc, getImageUrl } from '@/utils/image';
import { formatDateTime } from '@/utils/datetime';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCancelOrder } from '@/hooks/useOrders';
import { SmartImage } from '@/components/common/SmartImage';

interface ProfileOrderCardProps {
    order: Order;
}

export const ProfileOrderCard = ({ order }: ProfileOrderCardProps) => {
    const cancelMutation = useCancelOrder();

    const canCancel =
        order.status !== 'Cancelled' &&
        order.paymentStatus !== 'Paid';

    const hasDiscount = (order.totalDiscount ?? 0) > 0;

    return (
        <Card className="shadow-sm">
            <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <CardTitle>Order #{order._id.slice(-6).toUpperCase()}</CardTitle>
                    <p className="text-sm text-gray-500">Placed on {formatDateTime(order.createdAt)}</p>
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                    <OrderStatusBadge status={order.status} />
                    <PaymentStatusBadge status={order.paymentStatus} />
                    {hasDiscount && (
                        <Badge className="bg-green-500 hover:bg-green-600 text-white">
                            Saved Rs. {order.totalDiscount?.toFixed(2)}
                        </Badge>
                    )}
                </div>
            </CardHeader>

            <CardContent className="space-y-3 text-sm text-gray-700">
                {order.items.map((item) => {
                    const itemDiscount = item.discount ?? 0;
                    const hasItemDiscount = itemDiscount > 0;

                    return (
                        <div
                            key={item._id ?? `${item.name}-${item.size}`}
                            className="flex items-center justify-between"
                        >
                            <div className="flex">
                                {item.item && typeof item.item === 'object' && '._id' in item.item ? (
                                    <Link to={`/items/${item.item.slug || item.item._id}`} className="flex-shrink-0 pt-4">
                                        <SmartImage
                                            src={buildImageSrc(
                                                getImageUrl(item.item, item.selectedImageIndex)
                                            )}
                                            alt={item.name}
                                            className="w-16 h-16"
                                            rounded="rounded-md"
                                        />
                                    </Link>
                                ) : (
                                    <div className="flex-shrink-0 pt-4">
                                        <SmartImage
                                            src={buildImageSrc(
                                                getImageUrl(item.item!, item.selectedImageIndex)
                                            )}
                                            alt={item.name}
                                            className="w-16 h-16"
                                            rounded="rounded-md"
                                        />
                                    </div>
                                )}

                                <div className="mt-4 ml-4">
                                    <p className="font-semibold text-gray-900">{item.name}</p>
                                    <p className="text-xs text-gray-500">Size {item.size}</p>
                                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                    {hasItemDiscount && (
                                        <p className="text-xs text-green-600 font-medium">
                                            Saved Rs. {(itemDiscount * item.quantity).toFixed(2)}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="text-right">
                                {hasItemDiscount && (
                                    <p className="text-xs text-gray-500 line-through">
                                        Rs. {(item.originalPrice * item.quantity).toFixed(2)}
                                    </p>
                                )}
                                <p className="font-semibold text-gray-700">
                                    Rs. {(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    );
                })}

                {hasDiscount && (
                    <div className="flex justify-between pt-2 text-sm text-green-600">
                        <span>Total Savings</span>
                        <span className="font-semibold">-Rs. {order.totalDiscount?.toFixed(2)}</span>
                    </div>
                )}

                <div className="flex justify-between border-t pt-3 text-base font-semibold text-gray-900">
                    <span>Total</span>
                    <span>Rs. {order.total.toFixed(2)}</span>
                </div>

                {canCancel && (
                    <Button
                        variant="outline"
                        className="w-full"
                        disabled={cancelMutation.isPending}
                        onClick={() => cancelMutation.mutate(order._id)}
                    >
                        {cancelMutation.isPending ? 'Cancelling…' : 'Cancel Order'}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default ProfileOrderCard;
