import { MapPin, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Address } from '@/types/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CheckoutAddressCardProps {
    address?: Address | null;
}

export const CheckoutAddressCard = ({ address }: CheckoutAddressCardProps) => {
    return (
        <Card className="h-full">
            <CardHeader className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <MapPin className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                    <CardTitle className="text-xl">Delivery Address</CardTitle>
                    <CardDescription>Your order ships to your saved address</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                {address ? (
                    <div className="space-y-2 text-sm text-gray-700">
                        <p className="font-semibold text-gray-900">{address.fullName || 'Default recipient'}</p>
                        <p>{address.addressLine1}</p>
                        {address.addressLine2 && <p>{address.addressLine2}</p>}
                        <p>{`${address.city}, ${address.country}`}</p>
                        <p>{`Postal Code: ${address.postalCode}`}</p>
                        <p className="text-gray-600">Phone: {address.phone}</p>
                        <Button variant="outline" asChild className="mt-4">
                            <Link to="/profile">
                                <Pencil className="mr-2 h-4 w-4" /> Update Address
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
                        <p className="mb-3 font-semibold text-gray-800">No address on file</p>
                        <p className="mb-4 text-sm text-gray-500">Add an address in your profile to finish checkout.</p>
                        <Button asChild>
                            <Link to="/profile">Add Address</Link>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default CheckoutAddressCard;
