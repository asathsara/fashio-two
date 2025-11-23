import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { ProfileHeader } from "@/components/client/profile/ProfileHeader";
import { PersonalInfoTab } from "@/components/client/profile/PersonalInfoTab";
import { OrderHistoryTab } from "@/components/client/profile/OrderHistoryTab";
import { SecurityTab } from "@/components/client/profile/SecurityTab";

import { useProfile } from "@/hooks/useProfile";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  type ProfileTab = 'personal' | 'orders' | 'security';
  const location = useLocation();
  const highlightState = (location.state as { highlight?: 'orders' } | null)?.highlight;
  const [activeTab, setActiveTab] = useState<ProfileTab>(
    highlightState === 'orders' ? 'orders' : 'personal'
  );

  useEffect(() => {
    const nextHighlight = (location.state as { highlight?: 'orders' } | null)?.highlight;
    if (nextHighlight === 'orders') {
      setActiveTab('orders');
    }
  }, [location.state]);

  const {
    user,
    form,
    isEditing,
    success,
    error,
    loading,
    handleEdit,
    handleCancel,
    handleSave,
    handleLogout,
  } = useProfile();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading your majestic profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account settings</p>
        </div>

        {/* Header Card */}
        <ProfileHeader
          user={{
            name: user.name,
            email: user.email,
            role: user.role,
            verified: user.emailVerified,
          }}
          isEditing={isEditing}
          loading={loading}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
        />

        {/* Success & Error Alerts */}
        {success && (
          <Alert className="mb-6 bg-green-50 border-green-200 text-green-800">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ProfileTab)} className="space-y-6">
          <TabsList className="grid grid-cols-3 max-w-md mx-auto h-12">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <PersonalInfoTab form={form} isEditing={isEditing} />
          </TabsContent>

          <TabsContent value="orders">
            <OrderHistoryTab />
          </TabsContent>

          <TabsContent value="security">
            <SecurityTab onLogout={handleLogout} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
