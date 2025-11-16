import { useState, useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/UseAuth";
import { useUpdateProfile } from "@/hooks/useAuthQueries";
import {
  profileFormSchema,
  type ProfileFormData,
} from "@/schemas/profileSchema";

export const useProfile = () => {
  const { user, logout } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const updateProfile = useUpdateProfile();

  // React Hook Form setup
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema) as Resolver<ProfileFormData>,
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      address:
        user?.addresses?.[0] || {
          phone: "",
          country: "",
          city: "",
          postalCode: "",
          addressLine1: "",
          addressLine2: "",
          isDefault: false,
        },
    },
  });

  // Keep form synced with user data
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        address:
          user.addresses?.[0] || {
            phone: "",
            country: "",
            city: "",
            postalCode: "",
            addressLine1: "",
            addressLine2: "",
            isDefault: false,
          },
      });
    }
  }, [user, form]);

  // Handlers
  const handleEdit = () => {
    setIsEditing(true);
    setSuccess("");
    setError("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.reset();
    setError("");
  };

  const handleSave = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      setError("Please fix the errors in the form.");
      return;
    }

    setSuccess("");
    setError("");

    try {
      const data = form.getValues();
      await updateProfile.mutateAsync(data);

      setSuccess("Profile updated successfully!");
      setIsEditing(false);
    } catch {
      setError("Failed to update profile. Please try again.");
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return {
    user,
    form,
    isEditing,
    success,
    error,
    loading: updateProfile.isPending,
    handleEdit,
    handleCancel,
    handleSave,
    handleLogout,
  };
};
