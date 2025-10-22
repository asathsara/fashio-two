import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { usePromoData } from "@/hooks/usePromoData";


interface Props<T extends FieldValues> {
  name: Path<T>; 
  control: Control<T>;
}

export const PromoItemSelect = <T extends FieldValues>({ name, control }: Props<T>) => {
  const { items } = usePromoData();
  
  return (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <div className="space-y-2">
        <Label>Select Item</Label>
        <Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select an item" />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item._id} value={item._id!}>
                {item.name} ({item.category})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {fieldState.error && (
          <p className="text-sm text-red-500">{fieldState.error.message}</p>
        )}
      </div>
    )}
  />
  );
};
