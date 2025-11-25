import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { promoSchema, type PromoFormData } from "@/schemas/promoSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PromoDateTimePicker } from "./PromoDateTimePicker";
import { PromoItemSelect } from "./PromoItemSelect";
import type { PromoFormProps } from "@/types/promo";
import { mapFormToPromo } from "@/utils/mappers/promoMapper";
import { usePromoData } from "@/hooks/usePromoData";

export const PromoForm = ({ onSubmit }: PromoFormProps) => {
  const { isLoading } = usePromoData();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PromoFormData>({
    resolver: zodResolver(promoSchema),
    defaultValues: {
      item: "",
      startDate: new Date(),
      endDate: new Date(),
      discount: 10,
    },
  });

  // Handle form submission to create a new promo
  const onFormSubmit  = handleSubmit(async (data: PromoFormData) => {

      // Map form data to promo request payload
      const payload = mapFormToPromo(data);
      await onSubmit(payload);
      reset();


  });

  return (
    <Card>
      <CardHeader><CardTitle>Create Promotion</CardTitle></CardHeader>
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

        <Button onClick={onFormSubmit} disabled={isLoading} className="w-full">
          {isLoading ? "Creating..." : "Create Promotion"}
        </Button>
      </CardContent>
    </Card>
  );
};
