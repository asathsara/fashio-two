import { Badge } from '@/components/ui/badge';

interface ItemStockBadgeProps {
    stock: number;
}

export const ItemStockBadge = ({ stock }: ItemStockBadgeProps) => {
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Availability:</span>
            {stock > 0 ? (
                <Badge variant="default" className="bg-green-600">
                    In Stock ({stock} available)
                </Badge>
            ) : (
                <Badge variant="destructive">Out of Stock</Badge>
            )}
        </div>
    );
};

export default ItemStockBadge;
