import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { formatDisplayDateTime, padZero } from "@/utils/datetime";

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
      const date = field.value ? new Date(field.value) : new Date();

      const updateDate = (d: Date) => {
        const newDate = new Date(d);
        newDate.setSeconds(0, 0); // reset seconds and milliseconds
        field.onChange(newDate);
      };

      return (
        <div className="space-y-2">
          <label className="text-sm font-medium">{label}</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-between w-full">
                {formatDisplayDateTime(date)}
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
                  updateDate(newDate);
                }}
                disabled={(d) => d < new Date()}
              />
              <div className="mt-2 flex items-center space-x-2">
                <ClockIcon className="w-4 h-4" />
                <input
                  type="number"
                  min={0}
                  max={23}
                  value={padZero(date.getHours())}
                  onChange={(e) => {
                    const newDate = new Date(date);
                    newDate.setHours(Number(e.target.value));
                    updateDate(newDate);
                  }}
                  className="w-14 border rounded px-2 py-1 text-sm text-center"
                />
                <span className="font-semibold">:</span>
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={padZero(date.getMinutes())}
                  onChange={(e) => {
                    const newDate = new Date(date);
                    newDate.setMinutes(Number(e.target.value));
                    updateDate(newDate);
                  }}
                  className="w-14 border rounded px-2 py-1 text-sm text-center"
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
