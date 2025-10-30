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
                            placeholder="you@example.com"
                            type="email"
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
                            {...register('phone')}
                            disabled={!isEditing}
                            className="h-11"
                            placeholder="+1 (555) 000-0000"
                        />
                        {errors.phone && (
                            <p className="text-xs text-red-600">{errors.phone.message}</p>
                        )}
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                            <MapPin className="w-3 h-3 inline mr-1" />
                            Address
                        </Label>
                        <Input
                            {...register('address')}
                            disabled={!isEditing}
                            className="h-11"
                            placeholder="Street address"
                        />
                    </div>

                    {/* City */}
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                            City
                        </Label>
                        <Input
                            {...register('city')}
                            disabled={!isEditing}
                            className="h-11"
                            placeholder="City"
                        />
                    </div>

                    {/* Country */}
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                            Country
                        </Label>
                        <Input
                            {...register('country')}
                            disabled={!isEditing}
                            className="h-11"
                            placeholder="Country"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
