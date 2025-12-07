import { Button } from '@/components/ui/button';
import { Calendar, Clock, Percent, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { PromoStatusBadge } from './PromoStatusBadge';
import { PromoDetail } from './PromoDetail';

import type { PromoWithItem } from '@/types/promo';
import type { PromoStatus } from '@/hooks/admin/usePromoList';
import { formatISODateTime } from '@/utils/datetime';
import { memo } from 'react';

interface PromoCardProps {
    promo: PromoWithItem;
    status: PromoStatus;
    formatDateTime: (date: string, time: string) => string;
    onEditClick: (promo: PromoWithItem) => void;
    onToggleStatus: (promo: PromoWithItem) => void;
    onDeleteClick: (promo: PromoWithItem) => void;
    isStatusUpdating?: boolean;
}

export const PromoCard = memo(({
    promo,
    status,
    formatDateTime,
    onEditClick,
    onToggleStatus,
    onDeleteClick,
    isStatusUpdating
}: PromoCardProps) => {

    const promoId = promo._id ?? '';
    const itemName = promo.item?.name ?? 'Unavailable item';

    const metadataPausedAt = formatISODateTime(promo.pausedAt ?? undefined);
    const metadataArchivedAt = formatISODateTime(promo.archivedAt ?? undefined);

    const handleEdit = () => {
        if (!promoId) return;
        if (promo.isArchived) {
            toast.error('Archived promos cannot be modified');
            return;
        }
        onEditClick(promo);
    };

    const handleDelete = () => {
        if (!promoId) return;
        onDeleteClick(promo);
    };

    const handleToggle = () => {
        if (!promoId || promo.isArchived || isStatusUpdating) {
            if (promo.isArchived) toast.error('Archived promos cannot be reactivated');
            return;
        }
        onToggleStatus(promo);
    };

    const showStatusToggle = !promo.isArchived && status !== 'expired';

    return (
        <div className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-lg">{itemName}</h3>

                    <PromoStatusBadge
                        status={status}
                        isUpdating={isStatusUpdating}
                        onToggle={showStatusToggle ? handleToggle : undefined}
                    />
                </div>

                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleEdit}
                        className="text-muted-foreground hover:text-foreground"
                        aria-label="Edit promotion"
                    >
                        <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleDelete}
                        className="text-destructive hover:text-destructive/90"
                        aria-label="Delete promotion"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <PromoDetail
                    icon={Calendar}
                    label="Start"
                    value={formatDateTime(promo.startDate, promo.startTime)}
                />
                <PromoDetail
                    icon={Clock}
                    label="End"
                    value={formatDateTime(promo.endDate, promo.endTime)}
                />
                <PromoDetail
                    icon={Percent}
                    label="Discount"
                    value={`${promo.discount}%`}
                />
            </div>

            {/* Metadata */}
            {promo.isArchived && metadataArchivedAt && (
                <p className="text-xs text-muted-foreground">
                    Archived on {metadataArchivedAt}
                    {promo.archivedReason ? ` • ${promo.archivedReason}` : ''}
                </p>
            )}

            {promo.isPaused && metadataPausedAt && (
                <p className="text-xs text-amber-700">
                    Paused on {metadataPausedAt}
                    {promo.pausedReason ? ` • ${promo.pausedReason}` : ''}
                </p>
            )}
        </div>
    );
});
