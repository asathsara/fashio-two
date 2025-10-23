import { useState } from "react";

import { PromoForm } from "../../components/admin/promo/forms/PromoForm";
import { PromoList } from "../../components/admin/promo/PromoList";
import Dialog from "../../components/admin/Dialog";
import type { Promo } from "../../types/promo";
import { useDeletePromo, useInsertPromo } from "@/hooks/usePromos";
import { PromoProvider } from "@/contexts/PromoProvider";

interface DialogContent {
  title: string;
  subText: string;
}

const PromoAddPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<DialogContent | null>(null);

  const insertMutation = useInsertPromo();
  const deleteMutation = useDeletePromo();


  const handleCreatePromo = async (promo: Promo) => {

    insertMutation.mutate(promo, {
      onSuccess: () => handleSuccess(),
    });

  }

    const handleSuccess = () => {
      setDialogContent({
        title: "Success",
        subText: "Promotion created successfully!",
      });
      setIsDialogOpen(true);
    };

    const handleError = (message: string) => {
      setDialogContent({
        title: "Error",
        subText: message,
      });
      setIsDialogOpen(true);
    };

    const handleDeletePromo = async (id: string) => {

      deleteMutation.mutate(id, {
        onSuccess: () => {
          setDialogContent({
            title: "Deleted",
            subText: "Promotion deleted successfully.",
          });
          setIsDialogOpen(true);
        },
        onError: () => {
          setDialogContent({
            title: "Error",
            subText: "Failed to delete the promotion.",
          });
          setIsDialogOpen(true);
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

        {dialogContent && (
          <Dialog
            isOpen={isDialogOpen}
            title={dialogContent.title}
            subText={dialogContent.subText}
            onOk={() => setIsDialogOpen(false)}
            onCancel={() => setIsDialogOpen(false)}
          />
        )}
      </PromoProvider>
    );
  };

export default PromoAddPage;
