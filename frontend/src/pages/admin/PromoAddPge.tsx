import { useState, useEffect } from "react";
import { fetchItems } from "../../services/itemService";
import { fetchPromos, insertPromo, deletePromo } from "../../services/promoService";
import { PromoForm } from "../../components/admin/promo/forms/PromoForm";
import { PromoList } from "../../components/admin/promo/PromoList";
import Dialog from "../../components/admin/Dialog";
import type { Promo } from "../../types/promo";
import type { PromoFormData } from "@/schemas/promoSchema";

interface Item {
  _id: string;
  name: string;
  category: string;
}

interface DialogContent {
  title: string;
  subText: string;
}

const PromoAddPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<DialogContent | null>(null);

  // Load items
  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
      } catch {
        setDialogContent({
          title: "Error",
          subText: "Failed to fetch items",
        });
        setIsDialogOpen(true);
      }
    };
    loadItems();
  }, []);

  // Load promos
  useEffect(() => {
    const loadPromos = async () => {
      try {
        const data = await fetchPromos();
        setPromos(data);
      } catch {
        setDialogContent({
          title: "Error",
          subText: "Failed to fetch promotions",
        });
        setIsDialogOpen(true);
      } finally {
        setLoading(false);
      }
    };
    loadPromos();
  }, []);

  const handleCreatePromo = async (promo: PromoFormData) => {
    const newPromo = await insertPromo(promo as Promo);
    setPromos((prev) => [newPromo, ...prev]);
  };

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
    try {
      await deletePromo(id);
      setPromos((prev) => prev.filter((p) => p._id !== id));
      setDialogContent({
        title: "Success",
        subText: "Promotion deleted successfully",
      });
      setIsDialogOpen(true);
    } catch {
      setDialogContent({
        title: "Error",
        subText: "Failed to delete promotion",
      });
      setIsDialogOpen(true);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-poppins">Promotions</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage promotional offers for your items
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PromoForm
            items={items}
            loading={loading}
            onSubmit={handleCreatePromo}
            onSuccess={handleSuccess}
            onError={handleError}
          />
          <PromoList promos={promos} loading={loading} onDelete={handleDeletePromo} />
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
    </>
  );
};

export default PromoAddPage;
