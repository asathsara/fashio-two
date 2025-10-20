import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { passwordChangeSchema, type PasswordChangeData } from '@/schemas/profileSchema';
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SecurityTabProps {
    onLogout: () => void;
}

export const SecurityTab = ({ onLogout }: SecurityTabProps) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<PasswordChangeData>({
        resolver: zodResolver(passwordChangeSchema),
    });

    const onSubmit = async (data: PasswordChangeData) => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // TODO: Implement password change API call
            console.log('Password change data:', data);
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setSuccess('Password updated successfully!');
            reset();
        } catch {
            setError('Failed to update password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="shadow-lg border-0">
            <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your password and account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Alerts */}
                {success && (
                    <Alert className="bg-green-50 border-green-200 text-green-800">
                        <AlertDescription>{success}</AlertDescription>
                    </Alert>
                )}
                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* Change Password Section */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Change Password</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                                Current Password
                            </Label>
                            <Input
                                {...register('currentPassword')}
                                type="password"
                                className="h-11"
                                placeholder="Enter current password"
                            />
                            {errors.currentPassword && (
                                <p className="text-xs text-red-600">{errors.currentPassword.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                                New Password
                            </Label>
                            <Input
                                {...register('newPassword')}
                                type="password"
                                className="h-11"
                                placeholder="Enter new password"
                            />
                            {errors.newPassword && (
                                <p className="text-xs text-red-600">{errors.newPassword.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                                Confirm New Password
                            </Label>
                            <Input
                                {...register('confirmPassword')}
                                type="password"
                                className="h-11"
                                placeholder="Confirm new password"
                            />
                            {errors.confirmPassword && (
                                <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-gray-900 hover:bg-gray-800"
                        >
                            {loading ? 'Updating...' : 'Update Password'}
                        </Button>
                    </div>
                </form>

                <Separator />

                {/* Danger Zone */}
                <div>
                    <h3 className="text-sm font-semibold text-red-600 mb-4">Danger Zone</h3>
                    <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Sign Out</h4>
                                <p className="text-sm text-gray-600">
                                    Sign out from your account on this device
                                </p>
                            </div>
                            <Button onClick={onLogout} variant="destructive" className="w-full sm:w-auto">
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
