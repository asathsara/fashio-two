import type { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Phone } from 'lucide-react';
import type { ProfileFormData } from '@/schemas/profileSchema';

interface PersonalInfoTabProps {
    form: UseFormReturn<ProfileFormData>;
    isEditing: boolean;
}

export const PersonalInfoTab = ({ form, isEditing }: PersonalInfoTabProps) => {
    const {
        register,
        formState: { errors },
    } = form;

    return (
        <Card className="shadow-lg border-0">
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Full Name */}
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                            Full Name
                        </Label>
                        <Input
                            {...register('name')}
                            disabled={!isEditing}
                            className="h-11"
                            placeholder="Enter your full name"
                        />
                        {errors.name && (
                            <p className="text-xs text-red-600">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                            Email Address
                        </Label>
                        <Input
                            {...register('email')}
                            disabled={!isEditing}
                            className="h-11"
                            type="email"
                            placeholder="you@example.com"
                        />
                        {errors.email && (
                            <p className="text-xs text-red-600">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                            <Phone className="w-3 h-3 inline mr-1" />
                            Phone Number
                        </Label>
                        <Input
                            {...register('address.phone')}
                            disabled={!isEditing}
                            className="h-11"
                            placeholder="+94 77 123 4567"
                        />
                        {errors.address?.phone && (
                            <p className="text-xs text-red-600">{errors.address.phone.message}</p>
                        )}
                    </div>

                    {/* Address Line 1 */}
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                            <MapPin className="w-3 h-3 inline mr-1" />
                            Address Line 1
                        </Label>
                        <Input
                            {...register('address.addressLine1')}
                            disabled={!isEditing}
                            className="h-11"
                            placeholder="Street address, house number"
                        />
                        {errors.address?.addressLine1 && (
                            <p className="text-xs text-red-600">{errors.address.addressLine1.message}</p>
                        )}
                    </div>

                    {/* Address Line 2 */}
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                            Address Line 2 (Optional)
                        </Label>
                        <Input
                            {...register('address.addressLine2')}
                            disabled={!isEditing}
                            className="h-11"
                            placeholder="Apartment, floor, landmark"
                        />
                    </div>

                    {/* City */}
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                            City
                        </Label>
                        <Input
                            {...register('address.city')}
                            disabled={!isEditing}
                            className="h-11"
                            placeholder="City"
                        />
                        {errors.address?.city && (
                            <p className="text-xs text-red-600">{errors.address.city.message}</p>
                        )}
                    </div>

                    {/* Postal Code */}
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                            Postal Code
                        </Label>
                        <Input
                            {...register('address.postalCode')}
                            disabled={!isEditing}
                            className="h-11"
                            placeholder="Postal / ZIP code"
                        />
                        {errors.address?.postalCode && (
                            <p className="text-xs text-red-600">{errors.address.postalCode.message}</p>
                        )}
                    </div>

                    {/* Country */}
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                            Country
                        </Label>
                        <Input
                            {...register('address.country')}
                            disabled={!isEditing}
                            className="h-11"
                            placeholder="Country"
                        />
                        {errors.address?.country && (
                            <p className="text-xs text-red-600">{errors.address.country.message}</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
