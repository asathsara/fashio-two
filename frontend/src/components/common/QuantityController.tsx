import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface QuantityControllerProps {
    quantity: number;
    maxQuantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    disabled?: boolean;
}

export const QuantityController = ({
    quantity,
    maxQuantity,
    onIncrease,
    onDecrease,
    disabled = false
}: QuantityControllerProps) => {
    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={onDecrease}
                disabled={disabled || quantity <= 1}
            >
                <Minus size={14} />
            </Button>

            <span className="w-8 text-center font-medium">{quantity}</span>

            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={onIncrease}
                disabled={disabled || quantity >= maxQuantity}
            >
                <Plus size={14} />
            </Button>
        </div>
    );
};

export default QuantityController;
