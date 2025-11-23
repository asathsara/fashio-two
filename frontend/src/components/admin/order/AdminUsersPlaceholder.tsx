import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export const AdminUsersPlaceholder = () => {
    return (
        <Card className="border-dashed">
            <CardHeader className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <Users className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                    <CardTitle>User Insights (Coming Soon)</CardTitle>
                    <CardDescription>We will unlock detailed user analytics in the next phase.</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-600">
                    For now, focus on tracking orders and Rs. performance. User metrics such as repeat purchase rate and
                    loyalty insights will appear here later.
                </p>
            </CardContent>
        </Card>
    );
};

export default AdminUsersPlaceholder;
