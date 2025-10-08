import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Package, Shield } from 'lucide-react';

export const GuidesSection = () => {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-purple-600" />
                        <CardTitle>Getting Started</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="border-l-4 border-purple-600 pl-4 py-2">
                        <h3 className="font-semibold mb-2">Creating an Account</h3>
                        <p className="text-gray-600">Learn how to set up your account and manage your profile.</p>
                    </div>
                    <div className="border-l-4 border-purple-600 pl-4 py-2">
                        <h3 className="font-semibold mb-2">Making Your First Purchase</h3>
                        <p className="text-gray-600">Step-by-step guide to placing your first order.</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-purple-600" />
                        <CardTitle>Account & Security</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="border-l-4 border-green-600 pl-4 py-2">
                        <h3 className="font-semibold mb-2">Password & Security</h3>
                        <p className="text-gray-600">Keep your account secure with best practices.</p>
                    </div>
                    <div className="border-l-4 border-green-600 pl-4 py-2">
                        <h3 className="font-semibold mb-2">Privacy Settings</h3>
                        <p className="text-gray-600">Manage your privacy and data preferences.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};