import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Mail, Shield, Calendar, Edit2, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileHeaderProps {
    user: {
        name: string;
        email: string;
        role: string;
        verified?: boolean;
    };
    isEditing: boolean;
    loading: boolean;
    onEdit: () => void;
    onSave: () => void;
    onCancel: () => void;
}

export const ProfileHeader = ({
    user,
    isEditing,
    loading,
    onEdit,
    onSave,
    onCancel,
}: ProfileHeaderProps) => {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const navigate = useNavigate()

    return (
        <Card className="mb-8 shadow-lg border-0">
            <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    {/* Avatar */}
                    <Avatar className="w-24 h-24 border-4 border-gray-100">
                        <AvatarFallback className="bg-gradient-to-br from-gray-700 to-gray-900 text-white text-2xl font-bold">
                            {getInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>

                    {/* User Info */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                            <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
                            <Badge
                                variant={user.role === 'admin' ? 'default' : 'secondary'}
                                className={`w-fit mx-auto md:mx-0 ${user.role === 'admin' ? 'cursor-pointer' : ''}`}
                                onClick={
                                    user.role === 'admin'
                                        ? () => {
                                              navigate('/admin')
                                          }
                                        : undefined
                                }
                            >
                                {user.role === 'admin' ? (
                                    <>
                                        <Shield className="w-3 h-3 mr-1" /> Admin
                                    </>
                                ) : (
                                    <>
                                        <User className="w-3 h-3 mr-1" /> Customer
                                    </>
                                )}
                            </Badge>
                        </div>
                        <div className="flex flex-col gap-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                <Mail className="w-4 h-4" />
                                <span>{user.email}</span>
                            </div>
                            {user.verified && (
                                <div className="flex items-center gap-2 justify-center md:justify-start text-green-600">
                                    <Calendar className="w-4 h-4" />
                                    <span>Verified Account</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        {!isEditing ? (
                            <Button onClick={onEdit} variant="outline" className="gap-2">
                                <Edit2 className="w-4 h-4" />
                                Edit Profile
                            </Button>
                        ) : (
                            <>
                                <Button
                                    onClick={onSave}
                                    disabled={loading}
                                    className="gap-2 bg-gray-900 hover:bg-gray-800"
                                >
                                    <Save className="w-4 h-4" />
                                    {loading ? 'Saving...' : 'Save'}
                                </Button>
                                <Button onClick={onCancel} variant="outline" className="gap-2">
                                    <X className="w-4 h-4" />
                                    Cancel
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
