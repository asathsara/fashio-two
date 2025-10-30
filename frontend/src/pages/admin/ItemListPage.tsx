import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import type { Item } from "../../types/item";
import { useDeleteItem, useItems } from "@/hooks/useItems";
import { Spinner } from "@/components/common/Spinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { toast } from "sonner";


const ItemListPage = () => {

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);

  const { data: items = [], isLoading, error } = useItems();
  const deleteMutation = useDeleteItem();

  const openDeleteDialog = (item: Item) => {
    setItemToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete?._id) return;

    deleteMutation.mutate(itemToDelete._id, {
      onSuccess: () => {
        toast.success(`Item "${itemToDelete.name}" deleted successfully`);
        setIsDeleteDialogOpen(false);
        setItemToDelete(null);
      },
      onError: (error) => {
        toast.error(`Failed to delete item: ${error.message || "Unknown error"}`);
      }
    });
  };



  return (
    <>
      <h1 className="font-poppins text-3xl font-semibold mb-6">Items List</h1>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <ErrorMessage message="Failed to load items." />
      ) : (
        <div className="w-full mt-8">
          {/* Header Row */}
          <div className="min-w-[1000px] grid grid-cols-8 gap-4 text-left font-semibold text-gray-700 px-4 py-4 bg-gray-100 rounded-md mb-2 font-poppins">
            <span>Image</span>
            <span>Name</span>
            <span>Price</span>
            <span>Stock</span>
            <span>Category</span>
            <span>Subcategory</span>
            <span>Sizes</span>
            <span>Delete</span>
          </div>

          {/* Items Rows */}
          {items.map((item) => (
            <div
              key={item._id}
              className="min-w-[1000px] grid grid-cols-8 gap-4 items-center text-left text-gray-800 px-4 py-4 hover:bg-gray-50 border-b border-gray-200 font-poppins"
            >
              <div className="flex items-center">
                {item.images && item.images.length > 0 ? (
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/items/${item._id}/image/0`}
                    alt={item.images[0].filename}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                ) : (
                  <span className="text-sm text-gray-500">No Image</span>
                )}
              </div>
              <span>{item.name}</span>
              <span>
                Rs. {(Math.round(item.price * 100) / 100).toFixed(2)}
              </span>
              <span>{item.stock}</span>
              <span>{item.category.name}</span>
              <span>{item.subCategoryName}</span>
              <span>{item.sizes.join(", ")}</span>
              <FaTrash
                className="cursor-pointer text-red-500 hover:text-red-700 transition duration-200"
                onClick={() => openDeleteDialog(item)}
              />
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Item"
        description={`Are you sure you want to delete "${itemToDelete?.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        confirmLabel="Delete"
      />


    </>
  );
};

export default ItemListPage;
