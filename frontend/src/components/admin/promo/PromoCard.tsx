import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Percent, Pencil, Loader2 } from 'lucide-react';
import type { KeyboardEvent } from 'react';
import type { PromoWithItem } from '@/types/promo';
import type { PromoStatus } from '@/hooks/admin/usePromoList';
import { toast } from 'sonner';

interface PromoCardProps {
    promo: PromoWithItem;
    status: PromoStatus;
    formatDateTime: (date: string, time: string) => string;
    onEditClick: (promo: PromoWithItem) => void;
    onToggleStatus: (promo: PromoWithItem) => void;
    isStatusUpdating?: boolean;
}

export const PromoCard = ({ promo, status, formatDateTime, onEditClick, onToggleStatus, isStatusUpdating }: PromoCardProps) => {
    const itemName = promo.item?.name ?? 'Unavailable item';
    const statusLabel = status === 'paused'
        ? 'Not active'
        : status.charAt(0).toUpperCase() + status.slice(1);

    const getStatusVariant = (status: PromoStatus) => {
        switch (status) {
            case 'active':
                return 'default';
            case 'upcoming':
                return 'secondary';
            case 'expired':
                return 'outline';
            case 'archived':
                return 'destructive';
            case 'paused':
                return 'outline';
        }
    };

    const promoId = promo._id ?? '';

    const formatMetadataTimestamp = (iso?: string | null) => {
        if (!iso) return null;
        const [datePart, timePart] = iso.split('T');
        const time = timePart?.split('.')[0] ?? '00:00:00';
        return formatDateTime(datePart, time);
    };

    const handleEdit = () => {
        if (!promoId) return;
        if (promo.isArchived) {
            toast.error('Archived promos cannot be modified');
            return;
        }
        onEditClick(promo);
    };

    const handleStatusToggle = () => {
        if (!promoId || promo.isArchived || isStatusUpdating) {
            if (promo.isArchived) {
                toast.error('Archived promos cannot be reactivated');
            }
            return;
        }
        onToggleStatus(promo);
    };

    const handleStatusKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleStatusToggle();
        }
    };

    const metadataPausedAt = formatMetadataTimestamp(promo.pausedAt ?? undefined);
    const metadataArchivedAt = formatMetadataTimestamp(promo.archivedAt ?? undefined);
    const showStatusToggle = !promo.isArchived && status !== 'expired';

    return (
        <div className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors">
            {/* Header with status and delete */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-lg">{itemName}</h3>
                    <Badge
                        variant={getStatusVariant(status)}
                        onClick={showStatusToggle ? handleStatusToggle : undefined}
                        onKeyDown={showStatusToggle ? handleStatusKeyDown : undefined}
                        role={showStatusToggle ? 'button' : undefined}
                        tabIndex={showStatusToggle ? 0 : -1}
                        aria-pressed={status === 'paused'}
                        aria-disabled={!showStatusToggle || isStatusUpdating}
                        title={showStatusToggle ? 'Click to toggle promo activity' : undefined}
                        className={`min-w-[96px] justify-center ${showStatusToggle ? 'cursor-pointer' : 'cursor-default'} ${isStatusUpdating ? 'opacity-70 pointer-events-none' : ''}`}
                    >
                        {isStatusUpdating ? <Loader2 className="w-3 h-3 animate-spin" /> : statusLabel}
                    </Badge>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleEdit}
                        className="text-muted-foreground hover:text-foreground"
                        aria-label="Edit promotion"
                    >
                        <Pencil className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Promo details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="flex items-start gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 mt-0.5" />
                    <div>
                        <p className="font-medium text-foreground">Start</p>
                        <p>{formatDateTime(promo.startDate, promo.startTime)}</p>
                    </div>
                </div>

                <div className="flex items-start gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 mt-0.5" />
                    <div>
                        <p className="font-medium text-foreground">End</p>
                        <p>{formatDateTime(promo.endDate, promo.endTime)}</p>
                    </div>
                </div>

                <div className="flex items-start gap-2 text-muted-foreground">
                    <Percent className="w-4 h-4 mt-0.5" />
                    <div>
                        <p className="font-medium text-foreground">Discount</p>
                        <p className="text-lg font-bold text-gray-600">{promo.discount}%</p>
                    </div>
                </div>
            </div>

            {promo.isArchived && promo.archivedAt && metadataArchivedAt && (
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
};
