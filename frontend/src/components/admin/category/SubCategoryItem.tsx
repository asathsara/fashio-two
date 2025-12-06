import { useState, memo } from "react";
import { Trash2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { Badge } from "@/components/ui/badge";
import type { SubCategory } from "@/types/category";
import { toast } from "sonner";

type SubCategoryItemProps = {
  subCategory: SubCategory;
  onDeleteSubCategory: () => void;
};

const SubCategoryItem = memo(({ subCategory, onDeleteSubCategory }: SubCategoryItemProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const isProtected = Boolean(subCategory.hasAssignedItems);

  const handleDeleteAttempt = () => {
    if (isProtected) {
      toast.error(
        `Cannot delete ${subCategory.name} because items are assigned to this subcategory.`
      );
      return;
    }
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    onDeleteSubCategory();
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors group">
        <div className="flex items-center gap-2">
          <Tag className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground flex items-center gap-2">
            {subCategory.name}
            {isProtected && <Badge variant="outline">In Use</Badge>}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDeleteAttempt}
          aria-disabled={isProtected}
          className={`h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10 ${isProtected ? "opacity-100" : ""
            }`}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Subcategory"
        description={`Are you sure you want to delete "${subCategory.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        confirmLabel="Delete"
      />
    </>
  );
});

export default SubCategoryItem;
