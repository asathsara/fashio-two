import { useState, useEffect } from "react";
import { deleteItem, fetchItems } from "../../services/itemService";
import { FaTrash } from "react-icons/fa";
import Dialog from "../../components/admin/Dialog";
import type { Item } from "../../types/item";



const ItemListPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null); // Track the item to delete

  const handleOk = () => {
    if (itemToDelete) {
      handleDelete(itemToDelete._id!);
      setIsDialogOpen(false); // Close the dialog
      setItemToDelete(null); // Reset itemToDelete
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false); // Just close the dialog
    setItemToDelete(null); // Reset itemToDelete
  };

  useEffect(() => {
    // Fetch items from the API
    const loadItems = async () => {
      try {
        const data: Item[] = await fetchItems();
        setItems(data);
      } catch {
        setError("Failed to fetch items");
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch {
      setError("Failed to delete item");
    }
  };

  const openDeleteDialog = (item: Item) => {
    setItemToDelete(item);
    setIsDialogOpen(true);
  };

  return (
    <>
      <h1 className="font-poppins text-3xl font-semibold mb-6">Items List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="w-full mt-8 overflow-x-auto">
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
                {item.urls && item.urls.length > 0 ? (
                  <img
                    src={
                      import.meta.env.VITE_API_UPLOAD_IMAGES_URL + item.urls[0]
                    }
                    alt={item.name}
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
              <span>{item.category}</span>
              <span>{item.subCategory}</span>
              <span>{item.sizes.join(", ")}</span>
              <FaTrash
                className="cursor-pointer text-red-500 hover:text-red-700 transition duration-200"
                onClick={() => openDeleteDialog(item)}
              />
            </div>
          ))}
        </div>
      )}

      <Dialog
        isOpen={isDialogOpen}
        title="Delete"
        subText={`Are you sure you want to delete the item "${itemToDelete?.name}"?`}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </>
  );
};

export default ItemListPage;
