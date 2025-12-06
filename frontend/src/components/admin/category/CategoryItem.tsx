import { useState, useRef } from "react";
import { Trash2, ChevronDown, ChevronUp, Plus, FolderOpen, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import SubCategoryItem from "./SubCategoryItem";
import type { Category } from "../../../types/category";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { toast } from "sonner";

interface CategoryItemProps {
  category: Category;
  onAddSubItem: (categoryId: string, subItemName: string) => void;
  onDelete: (categoryId: string) => void;
  onDeleteSubCategory: (categoryId: string, subCategoryId: string) => void;
  isAddingSubCategory?: boolean;
}

const CategoryItem = ({
  category,
  onAddSubItem,
  onDelete,
  onDeleteSubCategory,
  isAddingSubCategory = false,
}: CategoryItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [subItemValue, setSubItemValue] = useState("");
  const subItemRef = useRef<HTMLInputElement | null>(null);
  const hasAssignedItems = Boolean(category.hasAssignedItems);

  const handleAddSubItem = () => {
    const subItemName = subItemValue.trim();
    if (subItemName) {
      onAddSubItem(category._id, subItemName);
      setSubItemValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddSubItem();
    }
  };

  const handleDeleteCategoryClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (hasAssignedItems) {
      toast.error(
        `Cannot delete ${category.name} because items are assigned to this category.`
      );
      return;
    }
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCategory = () => {
    onDelete(category._id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <Card className="bg-card border-border hover:border-primary/50 transition-all duration-200 mb-2">
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CardContent className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <CollapsibleTrigger asChild>
                <div className="flex items-center gap-3 flex-1 cursor-pointer group">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <FolderOpen className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <h3 className="font-semibold text-foreground text-lg flex items-center gap-2">
                      {category.name}
                      {hasAssignedItems && (
                        <Badge variant="outline">In Use</Badge>
                      )}
                    </h3>
                    <Badge variant="secondary" className="ml-2">
                      {category.subCategories?.length || 0}
                    </Badge>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground transition-transform" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform" />
                  )}
                </div>
              </CollapsibleTrigger>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleDeleteCategoryClick}
                aria-disabled={hasAssignedItems}
                className={`ml-2 text-destructive hover:text-destructive hover:bg-destructive/10 ${hasAssignedItems ? "opacity-50" : ""
                  }`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Expanded Content */}
            <CollapsibleContent className="mt-4">
              <div className="space-y-2">
                {/* Sub-categories List */}
                {category.subCategories && category.subCategories.length > 0 ? (
                  <div className="space-y-2 mb-4">
                    {category.subCategories.map((subItem) => (
                      <SubCategoryItem
                        key={subItem._id}
                        subCategory={subItem}
                        onDeleteSubCategory={() =>
                          onDeleteSubCategory(category._id, subItem._id)
                        }
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground text-sm border border-dashed rounded-lg mb-4">
                    No subcategories yet. Add one below.
                  </div>
                )}

                {/* Add Sub-item Input */}
                <div className="flex gap-2 pt-2 border-t border-border">
                  <Input
                    ref={subItemRef}
                    type="text"
                    value={subItemValue}
                    onChange={(e) => setSubItemValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a subcategory..."
                    className="flex-1"
                    onClick={(e) => e.stopPropagation()}
                    disabled={isAddingSubCategory}
                  />
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddSubItem();
                    }}
                    disabled={!subItemValue.trim() || isAddingSubCategory}
                    className="gap-2"
                  >
                    {isAddingSubCategory ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                    Add
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </CardContent>
        </Collapsible>
      </Card>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title={`Delete Category`}
        description={`Are you sure you want to delete ${category.name}? This will also delete all subcategories.`}
        onConfirm={handleDeleteCategory}
      />
    </>
  );
};

export default CategoryItem;
