import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon } from "lucide-react";

interface Props<T extends FieldValues> {
  name: Path<T>; 
  label: string;
  control: Control<T>;
}

export const PromoDateTimePicker = <T extends FieldValues>({
  name,
  label,
  control,
}: Props<T>) => (
  
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => {
      const date = field.value ?? new Date();

      return (
        <div className="space-y-2">
          <label className="text-sm font-medium">{label}</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-between w-full">
                {date.toLocaleString()}
                <CalendarIcon className="w-4 h-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => {
                  if (!d) return;
                  const newDate = new Date(date);
                  newDate.setFullYear(d.getFullYear(), d.getMonth(), d.getDate());
                  field.onChange(newDate);
                }}
                disabled={(d) => d < new Date()}
              />
              <div className="mt-2 flex items-center space-x-2">
                <ClockIcon className="w-4 h-4" />
                <input
                  type="number"
                  min={0}
                  max={23}
                  value={date.getHours()}
                  onChange={(e) => {
                    const newDate = new Date(date);
                    newDate.setHours(Number(e.target.value));
                    field.onChange(newDate);
                  }}
                  className="w-12 border rounded px-1 py-0.5 text-sm"
                />
                :
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={date.getMinutes()}
                  onChange={(e) => {
                    const newDate = new Date(date);
                    newDate.setMinutes(Number(e.target.value));
                    field.onChange(newDate);
                  }}
                  className="w-12 border rounded px-1 py-0.5 text-sm"
                />
              </div>
            </PopoverContent>
          </Popover>
          {fieldState.error && (
            <p className="text-sm text-red-500">{fieldState.error.message}</p>
          )}
        </div>
      );
    }}
  />
);
