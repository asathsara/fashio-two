import { PromoForm } from "../../components/admin/promo/forms/PromoForm";
import { PromoList } from "../../components/admin/promo/PromoList";
import type { Promo } from "../../types/promo";
import { useDeletePromo, useInsertPromo } from "@/hooks/usePromos";
import { PromoProvider } from "@/contexts/PromoProvider";
import { toast } from "sonner";


const PromoAddPage = () => {

  const insertMutation = useInsertPromo();
  const deleteMutation = useDeletePromo();


  const handleCreatePromo = async (promo: Promo) => {
    insertMutation.mutate(promo, {
      onSuccess: () => {
        toast.success("Promotion created successfully!");
      },
    });
  };

  const handleSuccess = () => {
    toast.success("Promotion created successfully!");
  };

  const handleError = (message: string) => {
    toast.error(message || "An error occurred");
  };

  const handleDeletePromo = async (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Promotion deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete the promotion");
      }
    });
  };

  return (
    <PromoProvider>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-poppins">Promotions</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage promotional offers for your items
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PromoForm
            onSubmit={handleCreatePromo}
            onSuccess={handleSuccess}
            onError={handleError}
          />
          <PromoList onDelete={handleDeletePromo} />
        </div>
      </div>
    </PromoProvider>
  );
};

export default PromoAddPage;
