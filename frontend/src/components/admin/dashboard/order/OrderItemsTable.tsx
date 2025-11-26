import type { OrderItem } from "@/types/order";
import { Badge } from "@/components/ui/badge";

const OrderItemsTable = ({ items }: { items: OrderItem[] }) => {
    return (
        <div className="rounded-lg border p-4 bg-white">
            <h4 className="text-sm font-semibold mb-3">Items in this order</h4>

            <table className="w-full text-sm">
                <thead className="text-gray-500 text-xs uppercase">
                    <tr>
                        <th className="py-2">Item</th>
                        <th className="py-2">Size</th>
                        <th className="py-2">Qty</th>
                        <th className="py-2">Price</th>
                        <th className="py-2">Discount</th>
                        <th className="py-2">Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => {
                        const hasDiscount = (item.discount ?? 0) > 0;
                        return (
                            <tr key={item._id ?? item.name} className="border-t">
                                <td className="py-2 font-medium">{item.name}</td>
                                <td className="py-2">{item.size}</td>
                                <td className="py-2">{item.quantity}</td>
                                <td className="py-2">
                                    {hasDiscount ? (
                                        <div className="flex flex-col">
                                            <span className="font-semibold">Rs. {item.price.toFixed(2)}</span>
                                            <span className="text-xs text-gray-500 line-through">
                                                Rs. {item.originalPrice.toFixed(2)}
                                            </span>
                                        </div>
                                    ) : (
                                        <span>Rs. {item.price.toFixed(2)}</span>
                                    )}
                                </td>
                                <td className="py-2">
                                    {hasDiscount ? (
                                        <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs">
                                            -Rs. {(item.discount * item.quantity).toFixed(2)}
                                        </Badge>
                                    ) : (
                                        <span className="text-gray-400">-</span>
                                    )}
                                </td>
                                <td className="py-2">Rs. {(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default OrderItemsTable;
