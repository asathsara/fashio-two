import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { Item } from "../../types/item";
import { useDeleteItem, useItems } from "@/hooks/useItems";
import { Spinner } from "@/components/common/Spinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";


const ItemListPage = () => {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);

  const { data: items = [], isLoading, error } = useItems();
  const deleteMutation = useDeleteItem();


  const openDeleteDialog = (item: Item) => {
    setItemToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  const handleEdit = (item: Item) => {
    navigate(`/admin/items/insert/${item._id}`);
  };

  const handleDelete = async () => {
    if (!itemToDelete?._id) return;

    deleteMutation.mutate(itemToDelete._id, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        setItemToDelete(null);
      }
    });
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Items List</h1>
        <p className="text-sm text-gray-500">Manage your inventory by editing or deleting items below.</p>
      </div>

      {isLoading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <Spinner />
        </div>
      ) : error ? (
        <ErrorMessage message="Failed to load items." />
      ) : (
        <div className="rounded-xl border bg-white shadow-sm">
          <div className="border-b px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              Items
              <span className="px-2 py-0.5 text-sm rounded-full bg-gray-200 text-gray-700">
                {items.length}
              </span>
            </h3>
            <p className="text-sm text-gray-500">Total items in inventory</p>
          </div>

          {items.length === 0 ? (
            <div className="py-16 text-center text-gray-500">No items found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="px-6 py-3">Image</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Stock</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Subcategory</th>
                    <th className="px-6 py-3">Sizes</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item._id} className="border-b last:border-0">
                      <td className="px-6 py-4">
                        {item.images && item.images.length > 0 ? (
                          <img
                            src={`${import.meta.env.VITE_API_BASE_URL}/items/${item._id}/image/0`}
                            alt={item.images[0].filename}
                            className="h-16 w-16 rounded-md object-cover"
                          />
                        ) : (
                          <span className="text-xs text-gray-500">No Image</span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        Rs. {(Math.round(item.price * 100) / 100).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{item.stock}</td>
                      <td className="px-6 py-4 text-gray-700">{item.category.name}</td>
                      <td className="px-6 py-4 text-gray-700">{item.category.subCategory?.name || 'N/A'}</td>
                      <td className="px-6 py-4 text-gray-700">{item.sizes.join(", ")}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          <button
                            type="button"
                            aria-label="Edit item"
                            title="Edit item"
                            className="p-0 bg-transparent border-none cursor-pointer text-blue-500 transition duration-200 hover:text-blue-700 focus:outline-none"
                            onClick={() => handleEdit(item)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            type="button"
                            aria-label="Delete item"
                            title="Delete item"
                            className="p-0 bg-transparent border-none cursor-pointer text-red-500 transition duration-200 hover:text-red-700 focus:outline-none"
                            onClick={() => openDeleteDialog(item)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
