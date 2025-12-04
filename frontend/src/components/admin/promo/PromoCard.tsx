import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Percent, Pencil } from 'lucide-react';
import type { PromoWithItem } from '@/types/promo';
import type { PromoStatus } from '@/hooks/admin/usePromoList';
import { toast } from 'sonner';

interface PromoCardProps {
    promo: PromoWithItem;
    status: PromoStatus;
    formatDateTime: (date: string, time: string) => string;
    onEditClick: (promo: PromoWithItem) => void;
}

export const PromoCard = ({ promo, status, formatDateTime, onEditClick }: PromoCardProps) => {
    const itemName = promo.item?.name ?? 'Unavailable item';
    const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);

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
        }
    };

    const promoId = promo._id ?? '';

    const handleEdit = () => {
        if (!promoId) return;
        if (promo.isArchived) {
            toast.error('Archived promos cannot be modified');
            return;
        }
        onEditClick(promo);
    };

    return (
        <div className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors">
            {/* Header with status and delete */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-lg">{itemName}</h3>
                    <Badge variant={getStatusVariant(status)}>
                        {statusLabel}
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
                        <p className="text-lg font-bold text-green-600">{promo.discount}%</p>
                    </div>
                </div>
            </div>

            {promo.isArchived && promo.archivedAt && (
                <p className="text-xs text-muted-foreground">
                    Archived on {formatDateTime(promo.archivedAt.split('T')[0], promo.archivedAt.split('T')[1].split('.')[0])}
                </p>
            )}
        </div>
    );
};
