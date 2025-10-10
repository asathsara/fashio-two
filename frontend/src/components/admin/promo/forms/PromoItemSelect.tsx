import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import type { PromoSelectableItem } from "@/types/promo";


interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  items: PromoSelectableItem[];
}

export const PromoItemSelect = ({ control, items }: Props) => (
  <Controller
    name="item"
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
