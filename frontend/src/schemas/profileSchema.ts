import { z } from 'zod';

export const profileFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name is too long'),
    email: z.email({ message: "Invalid email address" }),
    phone: z.string().optional().refine(
        (val) => !val || /^[\d\s+()-]+$/.test(val),
        'Invalid phone number format'
    ),
    address: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
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
