import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import type { PromoStatus } from '@/hooks/admin/usePromoList';
import type { KeyboardEvent } from 'react';

interface PromoStatusBadgeProps {
    status: PromoStatus;
    isUpdating?: boolean;
    onToggle?: () => void;
}

export const PromoStatusBadge = ({ status, isUpdating, onToggle }: PromoStatusBadgeProps) => {
    const isInteractive = Boolean(onToggle && !isUpdating);

    const getVariant = (status: PromoStatus) => {
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

    const statusLabel =
        status === 'paused'
            ? 'Not active'
            : status.charAt(0).toUpperCase() + status.slice(1);

    const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
        if (!isInteractive) return;

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onToggle?.();
        }
    };

    return (
        <Badge
            variant={getVariant(status)}
            onClick={isInteractive ? onToggle : undefined}
            onKeyDown={isInteractive ? handleKeyDown : undefined}
            role={isInteractive ? 'button' : undefined}
            tabIndex={isInteractive ? 0 : -1}
            aria-pressed={status === 'paused'}
            aria-disabled={!isInteractive}
            className={`min-w-[96px] justify-center 
                ${isInteractive ? 'cursor-pointer' : 'cursor-default'} 
                ${isUpdating ? 'opacity-70 pointer-events-none' : ''}`}
        >
            {isUpdating ? <Loader2 className="w-3 h-3 animate-spin" /> : statusLabel}
        </Badge>
    );
};
