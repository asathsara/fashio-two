import { useState } from 'react';
import type { PromoWithItem } from '@/types/promo';

export type PromoStatus = 'active' | 'upcoming' | 'expired';

export const usePromoList = () => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [promoToDelete, setPromoToDelete] = useState<string | null>(null);

    const getPromoStatus = (promo: PromoWithItem): PromoStatus => {
        const now = new Date();
        const start = new Date(`${promo.startDate}T${promo.startTime}`);
        const end = new Date(`${promo.endDate}T${promo.endTime}`);

        if (now < start) return 'upcoming';
        if (now > end) return 'expired';
        return 'active';
    };

    const formatDateTime = (date: string, time: string): string => {
        const dateObj = new Date(`${date}T${time}`);
        return dateObj.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleDeleteClick = (id: string) => {
        setPromoToDelete(id);
        setDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setPromoToDelete(null);
    };

    return {
        deleteDialogOpen,
        promoToDelete,
        getPromoStatus,
        formatDateTime,
        handleDeleteClick,
        closeDeleteDialog,
    };
};
