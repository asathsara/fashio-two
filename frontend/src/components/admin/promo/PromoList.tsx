import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tag } from 'lucide-react';
import { usePromoData } from '@/hooks/usePromoData';
import { usePromoList } from '@/hooks/admin/usePromoList';
import { useDeletePromo } from '@/hooks/usePromos';
import { PromoCard } from './PromoCard';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { Spinner } from '@/components/common/Spinner';
import type { PromoWithItem } from '@/types/promo';

interface PromoListProps {
  onEditPromo: (promo: PromoWithItem) => void;
}

export const PromoList = ({ onEditPromo }: PromoListProps) => {
  const { promos, isLoading } = usePromoData();
  const deleteMutation = useDeletePromo();
  const {
    deleteDialogOpen,
    promoToDelete,
    getPromoStatus,
    formatDateTime,
    handleDeleteClick,
    closeDeleteDialog,
  } = usePromoList();

  const confirmDelete = () => {
    if (!promoToDelete) return;
    deleteMutation.mutate(promoToDelete, {
      onSuccess: () => {
        closeDeleteDialog();
      },
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Active Promotions {!isLoading && `(${promos.length})`}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <Spinner label="Loading Promos..." />
          ) : promos.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">No promotions yet</p>
          ) : (
            promos.map((promo) => (
              <PromoCard
                key={promo._id}
                promo={promo}
                status={getPromoStatus(promo)}
                onDeleteClick={handleDeleteClick}
                formatDateTime={formatDateTime}
                onEditClick={onEditPromo}
              />
            ))
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={closeDeleteDialog}
        title="Delete Promotion"
        description="Are you sure you want to delete this promotion? This action cannot be undone."
        onConfirm={confirmDelete}
        confirmLabel={deleteMutation.isPending ? 'Deleting...' : 'Delete'}
        cancelLabel="Cancel"
      />
    </>
  );
};