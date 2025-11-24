import { AdminUsersTable } from '@/components/admin/user/AdminUsersTable';
import { Spinner } from '@/components/common/Spinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { useUsers } from '@/hooks/useUsers';

export const AdminUsersPlaceholder = () => {
    const { data: users = [], isLoading, error } = useUsers();

    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return <ErrorMessage message={error.message || 'Failed to load users'} />;
    }

    return <AdminUsersTable users={users} loading={isLoading} />;
};

export default AdminUsersPlaceholder;
