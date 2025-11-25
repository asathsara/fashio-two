import type { OrderItem } from "@/types/order";

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
                        <th className="py-2">Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item._id ?? item.name} className="border-t">
                            <td className="py-2 font-medium">{item.name}</td>
                            <td className="py-2">{item.size}</td>
                            <td className="py-2">{item.quantity}</td>
                            <td className="py-2">Rs. {item.price.toFixed(2)}</td>
                            <td className="py-2">Rs. {(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderItemsTable;
