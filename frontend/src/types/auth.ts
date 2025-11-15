export interface Address {
    fullName?: string;
    phone: string;
    country: string;
    city: string;
    postalCode: string;
    addressLine1: string;
    addressLine2?: string;
    isDefault: boolean;
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
    emailVerified: boolean;
    avatar?: string;
    addresses?: Address[];
}

