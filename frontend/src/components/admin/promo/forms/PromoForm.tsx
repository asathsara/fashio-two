import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { promoSchema, type PromoFormData } from "@/schemas/promoSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Percent } from "lucide-react";
import { PromoDateTimePicker } from "./PromoDateTimePicker";
import { PromoItemSelect } from "./PromoItemSelect";
import type { PromoFormProps } from "@/types/promo";

export const PromoForm = ({ items, onSubmit, loading, onSuccess, onError }: PromoFormProps) => {
  const form = useForm<PromoFormData>({
    resolver: zodResolver(promoSchema),
    defaultValues: {
      item: "",
      startDate: new Date(),
      endDate: new Date(),
      discount: 10,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await onSubmit(data);
      form.reset();
      onSuccess();
    } catch {
      onError("Failed to create promotion");
    }
  });

  return (
    <Card>
      <CardHeader><CardTitle>Create Promotion</CardTitle></CardHeader>
      <CardContent className="space-y-6">
        <PromoItemSelect control={form.control} items={items} />
        <PromoDateTimePicker control={form.control} name="startDate" label="Start Date" />
        <PromoDateTimePicker control={form.control} name="endDate" label="End Date" />

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Percent className="w-4 h-4" /> Discount %
          </label>
          <Input type="number" {...form.register("discount", { valueAsNumber: true })} />
          {form.formState.errors.discount && (
            <p className="text-sm text-red-500">
              {form.formState.errors.discount.message}
            </p>
          )}
        </div>

        <Button onClick={handleSubmit} disabled={loading} className="w-full">
          {loading ? "Creating..." : "Create Promotion"}
        </Button>
      </CardContent>
    </Card>
  );
};
