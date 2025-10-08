import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, Clock, Percent, AlertCircle } from "lucide-react";
import type { Promo } from "../../../types/promo";

interface Item {
  _id: string;
  name: string;
  category: string;
}

interface PromoFormProps {
  items: Item[];
  loading: boolean;
  onSubmit: (promo: Omit<Promo, "_id">) => Promise<void>;
  onSuccess: () => void;
  onError: (message: string) => void;
}

export const PromoForm = ({ items, loading, onSubmit, onSuccess, onError }: PromoFormProps) => {
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [discount, setDiscount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string>("");

  const validateForm = (): boolean => {
    if (!selectedItem) {
      setValidationError("Please select an item");
      return false;
    }
    if (!startDate || !startTime) {
      setValidationError("Please set start date and time");
      return false;
    }
    if (!endDate || !endTime) {
      setValidationError("Please set end date and time");
      return false;
    }
    if (!discount || parseFloat(discount) <= 0 || parseFloat(discount) > 100) {
      setValidationError("Please enter a valid discount percentage (1-100)");
      return false;
    }

    // Check if end date is after start date
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);
    
    if (end <= start) {
      setValidationError("End date/time must be after start date/time");
      return false;
    }

    // Check if start date is not in the past
    const now = new Date();
    if (start < now) {
      setValidationError("Start date/time cannot be in the past");
      return false;
    }

    setValidationError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        item: selectedItem,
        startDate,
        startTime,
        endDate,
        endTime,
        discount,
      });

      // Reset form
      setSelectedItem("");
      setStartDate("");
      setStartTime("");
      setEndDate("");
      setEndTime("");
      setDiscount("");
      setValidationError("");
      
      onSuccess();
    } catch {
      onError("Failed to create promotion");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Promotion</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {validationError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{validationError}</AlertDescription>
          </Alert>
        )}

        {/* Item Selection */}
        <div className="space-y-2">
          <Label htmlFor="item">Select Item</Label>
          <Select
            value={selectedItem}
            onValueChange={setSelectedItem}
            disabled={loading || !items.length}
          >
            <SelectTrigger id="item">
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
        </div>

        {/* Start Date & Time */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Start Date & Time
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
        </div>

        {/* End Date & Time */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            End Date & Time
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>

        {/* Discount */}
        <div className="space-y-2">
          <Label htmlFor="discount" className="flex items-center gap-2">
            <Percent className="w-4 h-4" />
            Discount Percentage
          </Label>
          <Input
            id="discount"
            type="number"
            min="1"
            max="100"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Enter discount (1-100)"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || loading}
          className="w-full"
        >
          {isSubmitting ? "Creating..." : "Create Promotion"}
        </Button>
      </CardContent>
    </Card>
  );
};