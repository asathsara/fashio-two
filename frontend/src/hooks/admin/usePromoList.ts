import { useState, useCallback } from 'react';
import type { PromoWithItem } from '@/types/promo';

export type PromoStatus = 'active' | 'upcoming' | 'expired' | 'archived';
export type PromoFilter = 'all' | 'active' | 'upcoming' | 'archived' | 'not-active';

export const usePromoList = () => {
    const [statusFilter, setStatusFilter] = useState<PromoFilter>('all');

    const getPromoStatus = useCallback((promo: PromoWithItem): PromoStatus => {
        if (promo.isArchived) {
            return 'archived';
        }

        const now = new Date();
        const start = new Date(`${promo.startDate}T${promo.startTime}`);
        const end = new Date(`${promo.endDate}T${promo.endTime}`);

        if (now < start) return 'upcoming';
        if (now > end) return 'expired';
        return 'active';
    }, []);

    const formatDateTime = useCallback((date: string, time: string): string => {
        const dateObj = new Date(`${date}T${time}`);
        return dateObj.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }, []);

    const filterPromos = useCallback((promos: PromoWithItem[]) => {
        return promos.filter((promo) => {
            const status = getPromoStatus(promo);

            switch (statusFilter) {
                case 'all':
                    return true;
                case 'not-active':
                    return status !== 'active';
                default:
                    return status === statusFilter;
            }
        });
    }, [getPromoStatus, statusFilter]);

    return {
        statusFilter,
        setStatusFilter,
        getPromoStatus,
        formatDateTime,
        filterPromos,
    };
};
