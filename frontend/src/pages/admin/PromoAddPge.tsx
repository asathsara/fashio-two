import { useState } from "react";
import { PromoForm } from "../../components/admin/promo/forms/PromoForm";
import { PromoList } from "../../components/admin/promo/PromoList";
import type { Promo, PromoWithItem } from "../../types/promo";
import { useInsertPromo, useUpdatePromo } from "@/hooks/usePromos";
import { PromoProvider } from "@/contexts/PromoProvider";

const PromoAddPage = () => {
  const insertMutation = useInsertPromo();
  const updateMutation = useUpdatePromo();
  const [editingPromo, setEditingPromo] = useState<PromoWithItem | null>(null);

  const handleSubmitPromo = (promo: Omit<Promo, "_id">, promoId?: string) => {
    if (promoId) {
      updateMutation.mutate(
        { id: promoId, promo },
        {
          onSuccess: () => setEditingPromo(null),
        }
      );
      return;
    }

    insertMutation.mutate(promo);
  };

  const handleEditPromo = (promo: PromoWithItem) => {
    setEditingPromo(promo);
  };

  const handleCancelEdit = () => {
    setEditingPromo(null);
  };

  return (
    <PromoProvider>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Promotions</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage promotional offers for your items
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PromoForm
            onSubmit={handleSubmitPromo}
            editingPromo={editingPromo}
            onCancelEdit={handleCancelEdit}
            isCreatePending={insertMutation.isPending}
            isUpdatePending={updateMutation.isPending}
          />
          <PromoList onEditPromo={handleEditPromo} />
        </div>
      </div>
    </PromoProvider>
  );
};

export default PromoAddPage;
