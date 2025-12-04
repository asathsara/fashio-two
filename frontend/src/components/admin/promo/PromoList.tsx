import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag } from 'lucide-react';
import { usePromoData } from '@/hooks/usePromoData';
import { usePromoList } from '@/hooks/admin/usePromoList';
import type { PromoFilter } from '@/hooks/admin/usePromoList';
import { Spinner } from '@/components/common/Spinner';
import type { PromoWithItem } from '@/types/promo';
import { PromoCard } from './promo-card/PromoCard';
import { ComponentErrorBoundary } from '@/error-boundaries';
import { useTogglePromoStatus } from '@/hooks/usePromos';

interface PromoListProps {
  onEditPromo: (promo: PromoWithItem) => void;
}

export const PromoList = ({ onEditPromo }: PromoListProps) => {
  const { promos, isLoading } = usePromoData();
  const {
    statusFilter,
    setStatusFilter,
    getPromoStatus,
    formatDateTime,
    filterPromos,
  } = usePromoList();
  const togglePromoStatus = useTogglePromoStatus();

  const filteredPromos = filterPromos(promos);

  const handlePromoStatusToggle = (promo: PromoWithItem) => {
    if (!promo._id) return;
    togglePromoStatus.mutate({ id: promo._id, isPaused: !promo.isPaused });
  };

  const filterOptions: { label: string; value: PromoFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Not Active', value: 'not-active' },
    { label: 'Archived', value: 'archived' },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Promotions {!isLoading && `(${promos.length})`}
          </CardTitle>
          <div className="flex flex-wrap gap-2 mt-4">
            {filterOptions.map((option) => (
              <Button
                key={option.value}
                variant={statusFilter === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <Spinner label="Loading Promos..." />
          ) : filteredPromos.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">No promotions match this filter</p>
          ) : (
            filteredPromos.map((promo) => (
              <ComponentErrorBoundary key={promo._id}>
                <PromoCard
                  key={promo._id}
                  promo={promo}
                  status={getPromoStatus(promo)}
                  formatDateTime={formatDateTime}
                  onEditClick={onEditPromo}
                  onToggleStatus={handlePromoStatusToggle}
                  isStatusUpdating={Boolean(togglePromoStatus.isPending && togglePromoStatus.variables?.id === promo._id)}

                />
              </ComponentErrorBoundary>
            ))
          )}
        </CardContent>
      </Card>
    </>
  );
};