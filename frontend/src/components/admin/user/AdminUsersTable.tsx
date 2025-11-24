import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { UserRoleBadge, UserStatusBadge } from './UserBadges';
import { Spinner } from '@/components/common/Spinner';
import type { AdminUser } from '@/services/userService';
import { useUpdateUserRole, useDeleteUser } from '@/hooks/useUsers';
import { Trash2 } from 'lucide-react';

interface AdminUsersTableProps {
    users: AdminUser[];
    loading: boolean;
}

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

export const AdminUsersTable = ({ users, loading }: AdminUsersTableProps) => {
    const updateRole = useUpdateUserRole();
    const deleteUser = useDeleteUser();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null);

    const handleDeleteClick = (user: AdminUser) => {
        setUserToDelete(user);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (userToDelete) {
            deleteUser.mutate(userToDelete.id);
        }
        setDeleteDialogOpen(false);
        setUserToDelete(null);
    };

    return (
        <div className="rounded-xl border bg-white shadow-sm">
            <div className="border-b px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900">
                    Users ({users.length})
                </h3>
                <p className="text-sm text-gray-500">Manage user accounts and permissions</p>
            </div>

            {loading ? (
                <div className="flex min-h-[200px] items-center justify-center">
                    <Spinner />
                </div>
            ) : users.length === 0 ? (
                <div className="py-16 text-center text-gray-500">No users found.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                            <tr>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Role</th>
                                <th className="px-6 py-3">Joined</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b last:border-0">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {user.avatar ? (
                                                <img
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    className="h-10 w-10 rounded-full"
                                                />
                                            ) : (
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600 font-semibold">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                            <p className="font-medium text-gray-900">{user.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <UserStatusBadge emailVerified={user.emailVerified} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-2">
                                            <UserRoleBadge role={user.role} />
                                            <Select
                                                value={user.role}
                                                disabled={updateRole.isPending}
                                                onValueChange={(value) => {
                                                    if (value === user.role || updateRole.isPending) return;
                                                    updateRole.mutate({
                                                        userId: user.id,
                                                        role: value as 'user' | 'admin',
                                                    });
                                                }}
                                            >
                                                <SelectTrigger className="h-8 w-32 text-xs">
                                                    <SelectValue placeholder="Change role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="user">User</SelectItem>
                                                    <SelectItem value="admin">Admin</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">
                                        {formatDate(user.createdAt)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            disabled={deleteUser.isPending}
                                            onClick={() => handleDeleteClick(user)}
                                        >
                                            <Trash2 className="h-4 w-4 text-red-600" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <ConfirmDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                title="Delete User"
                description={`Are you sure you want to delete ${userToDelete?.name}? This action cannot be undone.`}
                onConfirm={handleDeleteConfirm}
                confirmLabel="Delete"
            />
        </div>
    );
};

export default AdminUsersTable;
