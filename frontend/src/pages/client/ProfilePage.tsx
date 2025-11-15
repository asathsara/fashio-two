import { useState, useEffect } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/UseAuth';
import { useUpdateProfile } from '@/hooks/useAuthQueries';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ProfileHeader } from '@/components/client/profile/ProfileHeader';
import { PersonalInfoTab } from '@/components/client/profile/PersonalInfoTab';
import { OrderHistoryTab } from '@/components/client/profile/OrderHistoryTab';
import { SecurityTab } from '@/components/client/profile/SecurityTab';
import { profileFormSchema, type ProfileFormData } from '@/schemas/profileSchema';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const updateProfileMutation = useUpdateProfile();

  // React Hook Form with Zod validation
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema) as Resolver<ProfileFormData>,
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      address: user?.addresses?.[0] || {
        phone: '',
        country: '',
        city: '',
        postalCode: '',
        addressLine1: '',
        addressLine2: '',
        isDefault: false,
      }
    },
  });

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || '',
        email: user.email || '',
        address: user.addresses?.[0] || {
          phone: '',
          country: '',
          city: '',
          postalCode: '',
          addressLine1: '',
          addressLine2: '',
          isDefault: false,
        }
      });
    }
  }, [user, form]);

  const handleEdit = () => {
    setIsEditing(true);
    setSuccess('');
    setError('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.reset();
    setError('');
  };

  const handleSave = async () => {
    // Validate form
    const isValid = await form.trigger();
    if (!isValid) {
      setError('Please fix the errors in the form');
      return;
    }

    setError('');
    setSuccess('');

    try {
      const formData = form.getValues();

      await updateProfileMutation.mutateAsync(formData);

      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch {
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const loading = updateProfileMutation.isPending;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        {/* Profile Header Card */}
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

        {/* Alerts */}
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

        {/* Tabs Section */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto h-12">
            <TabsTrigger value="personal" className="text-sm">
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="orders" className="text-sm">
              Order History
            </TabsTrigger>
            <TabsTrigger value="security" className="text-sm">
              Security
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal">
            <PersonalInfoTab form={form} isEditing={isEditing} />
          </TabsContent>

          {/* Order History Tab */}
          <TabsContent value="orders">
            <OrderHistoryTab />
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <SecurityTab onLogout={handleLogout} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;