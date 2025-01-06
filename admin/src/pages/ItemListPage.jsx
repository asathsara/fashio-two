import React, { useState, useEffect } from "react";
import { deleteItem, fetchItems } from "../api/ItemApi";
import { FaTrash } from "react-icons/fa";

const ItemListPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch items from the API
    const loadItems = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
      } catch (err) {
        setError("Failed to fetch items");
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  const handleDelete = async (id) => {
    // Delete the item with the given ID
    try {
      await deleteItem(id);
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (err) {
      setError("Failed to delete item");
    }
  };

  return (
    <>
      <h1 className="font-poppins text-3xl font-semibold mb-6">Items List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="w-full mt-8">
          <div className="grid grid-cols-8 gap-4 text-left font-semibold text-gray-700 px-4 py-4 bg-gray-100 rounded-md mb-2 font-poppins ">
            <span>Image</span>
            <span>Name</span>
            <span>Price</span>
            <span>Stock</span>
            <span>Category</span>
            <span>Subcategory</span>
            <span>Sizes</span>
            <span>Delete</span>
          </div>
          {items.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-8 gap-4 items-center text-left text-gray-800 px-4 py-4 hover:bg-gray-50 border-b border-gray-200 font-poppins"
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
              <span>Rs. {(Math.round(item.price * 100) / 100).toFixed(2)}</span>
              <span>{item.stock}</span>
              <span>{item.category}</span>
              <span>{item.subCategory}</span>
              <span>{item.sizes.join(", ")}</span>
              <FaTrash
                className="cursor-pointer "
                onClick={(e) => {
                  handleDelete(item._id);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ItemListPage;
