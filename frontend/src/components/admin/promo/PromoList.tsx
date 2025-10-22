import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Calendar, Clock, Percent, Trash2, Tag } from "lucide-react";
import type { PromoWithItem } from "../../../types/promo";
import { usePromoData } from "@/hooks/usePromoData";

interface PromoListProps {
  onDelete: (id: string) => Promise<void>;
}

export const PromoList = ({ onDelete }: PromoListProps) => {
  const { promos, isLoading } = usePromoData();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [promoToDelete, setPromoToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setPromoToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!promoToDelete) return;
    await onDelete(promoToDelete);
    setDeleteDialogOpen(false);
    setPromoToDelete(null);
  };

  const getPromoStatus = (promo: PromoWithItem): "active" | "upcoming" | "expired" => {
    const now = new Date();
    const start = new Date(`${promo.startDate}T${promo.startTime}`);
    const end = new Date(`${promo.endDate}T${promo.endTime}`);
    
    if (now < start) return "upcoming";
    if (now > end) return "expired";
    return "active";
  };

  const formatDateTime = (date: string, time: string) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">Loading promotions...</p>
        </CardContent>
      </Card>
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
          {promos.map((promo) => {
            const status = getPromoStatus(promo);
            return (
              <div
                key={promo._id}
                className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors"
              >
                {/* Header with status and delete */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{promo.item.name}</h3>
                    <Badge
                      variant={
                        status === "active"
                          ? "default"
                          : status === "upcoming"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteClick(promo._id!)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
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
                      <p className="text-lg font-bold text-green-600">
                        {promo.discount}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Promotion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this promotion? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};