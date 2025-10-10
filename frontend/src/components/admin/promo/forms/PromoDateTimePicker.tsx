import { Controller } from "react-hook-form";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

interface Props {
  name: string;
  label: string;
  control: any;
}

export const PromoDateTimePicker = ({ name, label, control }: Props) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <div className="space-y-2">
        <label className="text-sm font-medium">{label}</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-between w-full"
            >
              {field.value ? field.value.toLocaleString() : "Pick date & time"}
              <CalendarIcon className="w-4 h-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
        {fieldState.error && (
          <p className="text-sm text-red-500">{fieldState.error.message}</p>
        )}
      </div>
    )}
  />
);
