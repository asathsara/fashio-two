import { z } from 'zod';

export const addressSchema = z.object({
    phone: z.string()
        .min(5, 'Phone is required')
        .regex(
            /^(\+?\d{1,3}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?[\d\-.\s]{5,}$/,
            'Invalid phone number format'
        ),
    country: z.string().min(1, 'Country is required'),
    city: z.string().min(1, 'City is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    addressLine1: z.string().min(1, 'Address line 1 is required'),
    addressLine2: z.string().optional(),
});


export const profileFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name is too long'),
    email: z.email({ message: "Invalid email address" }),
    address: addressSchema.optional()
});



export const passwordChangeSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(100, 'Password is too long'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;
export type PasswordChangeData = z.infer<typeof passwordChangeSchema>;
