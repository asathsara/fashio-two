import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { promoSchema, type PromoFormData } from "@/schemas/promoSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { PromoDateTimePicker } from "./PromoDateTimePicker";
import { PromoItemSelect } from "./PromoItemSelect";
import type { PromoFormProps } from "@/types/promo";
import { mapFormToPromo, mapPromoToFormValues } from "@/utils/mappers/promoMapper";
import { usePromoData } from "@/hooks/usePromoData";
import { useEffect } from "react";

const createDefaultValues = () => ({
  item: "",
  startDate: new Date(),
  endDate: new Date(Date.now() + 60 * 60 * 1000),
  discount: 10,
});

export const PromoForm = ({
  onSubmit,
  editingPromo,
  onCancelEdit,
  isCreatePending = false,
  isUpdatePending = false,
}: PromoFormProps) => {
  const { isLoading } = usePromoData();
  const isEditMode = Boolean(editingPromo);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PromoFormData>({
    resolver: zodResolver(promoSchema),
    defaultValues: createDefaultValues(),
  });

  useEffect(() => {
    if (editingPromo) {
      reset(mapPromoToFormValues(editingPromo));
    } else {
      reset(createDefaultValues());
    }
  }, [editingPromo, reset]);

  // Handle form submission to create a new promo
  const onFormSubmit = handleSubmit((data: PromoFormData) => {
    const payload = mapFormToPromo(data);
    onSubmit(payload, editingPromo?._id);

    if (!editingPromo) {
      reset(createDefaultValues());
    }
  });

  const isSubmitting = isEditMode ? isUpdatePending : isCreatePending;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditMode ? "Edit Promotion" : "Create Promotion"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <PromoItemSelect control={control} name="item" />
        <PromoDateTimePicker control={control} name="startDate" label="Start Date" />
        <PromoDateTimePicker control={control} name="endDate" label="End Date" />

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            Discount %
          </label>
          <Input type="number" {...register("discount", { valueAsNumber: true })} />
          {errors.discount && (
            <p className="text-sm text-red-500">
              {errors.discount.message}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          {isEditMode && (
            <Button
              type="button"
              variant="outline"
              className="w-full flex-1"
              onClick={() => onCancelEdit?.()}
              disabled={isUpdatePending}
            >
              Cancel
            </Button>
          )}
          <Button
            type="button"
            onClick={onFormSubmit}
            disabled={isLoading || Boolean(isSubmitting)}
            className="w-full flex-1"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditMode ? "Updating..." : "Creating..."}
              </>
            ) : (
              isEditMode ? "Update Promotion" : "Create Promotion"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
