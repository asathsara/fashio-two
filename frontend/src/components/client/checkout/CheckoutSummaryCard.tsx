import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface CheckoutSummaryCardProps {
    subtotal: number;
    totalDiscount?: number;
    total: number;
    itemCount: number;
    paymentMethod: string;
    notes: string;
    disabled?: boolean;
    loading?: boolean;
    onNotesChange: (value: string) => void;
    onPaymentMethodChange: (value: string) => void;
    onPlaceOrder: () => void;
}

export const CheckoutSummaryCard = ({
    subtotal,
    totalDiscount = 0,
    total,
    itemCount,
    paymentMethod,
    notes,
    disabled,
    loading,
    onNotesChange,
    onPaymentMethodChange,
    onPlaceOrder
}: CheckoutSummaryCardProps) => {
    const hasDiscount = totalDiscount > 0;

    return (
        <Card className="sticky top-6 h-max">
            <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
                <CardDescription>Review your order details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                        <span>Items ({itemCount})</span>
                        <span className="font-medium text-gray-900">Rs. {subtotal.toFixed(2)}</span>
                    </div>
                    {hasDiscount && (
                        <div className="flex justify-between text-gray-600">
                            <span>Discount</span>
                            <span className="font-medium text-green-600">-Rs. {totalDiscount.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="text-green-600 font-medium">FREE</span>
                    </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>Rs. {total.toFixed(2)}</span>
                </div>

                {hasDiscount && (
                    <div className="flex justify-center">
                        <Badge className="bg-green-500 hover:bg-green-600 text-white">
                            You save Rs. {totalDiscount.toFixed(2)}!
                        </Badge>
                    </div>
                )}

                <div className="space-y-2">
                    <Label className="text-sm text-gray-600">Payment Method</Label>
                    <Select value={paymentMethod} onValueChange={onPaymentMethodChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Cash on Delivery" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Cash on Delivery">Cash on Delivery</SelectItem>
                            <SelectItem value="Card" disabled>
                                Card (Coming Soon)
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="checkout-notes" className="text-sm text-gray-600">
                        Delivery Notes
                    </Label>
                    <Textarea
                        id="checkout-notes"
                        placeholder="Leave a note for our delivery team..."
                        value={notes}
                        onChange={(event) => onNotesChange(event.target.value)}
                        maxLength={500}
                    />
                    <p className="text-xs text-gray-500">Optional • {notes.length}/500</p>
                </div>

                <Button
                    className="w-full"
                    disabled={disabled || loading}
                    onClick={onPlaceOrder}
                >
                    {loading ? 'Placing order...' : 'Place Order'}
                </Button>
                <p className="text-xs text-gray-500 text-center">
                    You will only be charged once the package is handed over. Rs. pricing stays locked even if promos change.
                </p>
            </CardContent>
        </Card>
    );
};

export default CheckoutSummaryCard;
