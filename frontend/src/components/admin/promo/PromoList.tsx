import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tag } from 'lucide-react';
import { usePromoData } from '@/hooks/usePromoData';
import { usePromoList } from '@/hooks/admin/usePromoList';
import { useDeletePromo } from '@/hooks/usePromos';
import { PromoCard } from './PromoCard';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { Spinner } from '@/components/common/Spinner';

export const PromoList = () => {
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

  if (isLoading) {
    return (
      <Spinner label='Loading Promos...' />
    );
  }

  if (promos.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Active Promotions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">No promotions yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Active Promotions ({promos.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {promos.map((promo) => (
            <PromoCard
              key={promo._id}
              promo={promo}
              status={getPromoStatus(promo)}
              onDeleteClick={handleDeleteClick}
              formatDateTime={formatDateTime}
            />
          ))}
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