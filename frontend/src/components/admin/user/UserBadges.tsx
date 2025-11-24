import type { AdminUser } from '@/services/userService';

interface UserRoleBadgeProps {
    role: 'user' | 'admin';
}

export const UserRoleBadge = ({ role }: UserRoleBadgeProps) => {
    if (role === 'admin') {
        return (
            <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                Admin
            </span>
        );
    }

    return (
        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
            User
        </span>
    );
};

interface UserStatusBadgeProps {
    emailVerified: boolean;
}

export const UserStatusBadge = ({ emailVerified }: UserStatusBadgeProps) => {
    if (emailVerified) {
        return (
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                Verified
            </span>
        );
    }

    return (
        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
            Unverified
        </span>
    );
};
