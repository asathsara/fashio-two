import { PromoForm } from "../../components/admin/promo/forms/PromoForm";
import { PromoList } from "../../components/admin/promo/PromoList";
import type { Promo } from "../../types/promo";
import { useInsertPromo } from "@/hooks/usePromos";
import { PromoProvider } from "@/contexts/PromoProvider";

const PromoAddPage = () => {
  const insertMutation = useInsertPromo();

  const handleCreatePromo = async (promo: Promo) => {
    insertMutation.mutate(promo);
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
          <PromoForm onSubmit={handleCreatePromo} />
          <PromoList />
        </div>
      </div>
    </PromoProvider>
  );
};

export default PromoAddPage;
