import React, { useState, useEffect, useRef } from "react";
import { fetchItems } from "../api/ItemApi";
import FormInput from "../components/FormInput ";

const PromoAddPge = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [startDate, setStartDate] = useState(""); // Start date
  const [startTime, setStartTime] = useState(""); // Start time
  const [endDate, setEndDate] = useState(""); // End date
  const [endTime, setEndTime] = useState(""); // End time
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Using useRef for input fields
  const discountRef = useRef();

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

  const handleItemsChange = (e) => {
    setSelectedItem(e.target.value); // Store the item's ID
    console.log("Selected Item ID:", e.target.value);
  };

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleStartTimeChange = (e) => setStartTime(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);
  const handleEndTimeChange = (e) => setEndTime(e.target.value);

  const handleSubmit = () => {
    console.log("Promo Details:");
    console.log("Item ID:", selectedItem);
    console.log("Start Date-Time:", `${startDate} ${startTime}`);
    console.log("End Date-Time:", `${endDate} ${endTime}`);
  };

  return (
    <>
      <h1 className="font-poppins text-3xl font-semibold mb-6 mx-auto md:items-start">Promo Item</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Item Dropdown */}
        <div>
          <p className="font-poppins text-lg mt-4">Item</p>
          {!loading && (
            <select
              className="w-3/4 border-1 border-gray-300 outline-none rounded-md px-4 py-2 bg-white cursor-pointer mt-2"
              value={selectedItem || ""}
              onChange={handleItemsChange}
              disabled={!items.length}
            >
              <option value="" disabled>
                Select an option
              </option>
              {items.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          )}
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {/* Start Date-Time */}
          <p className=" font-poppins text-lg mt-4">Start Date Time</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-3/4 mt-2">
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="w-full border-1 border-gray-300 outline-none rounded-md px-4 py-2 bg-white"
            />
            <input
              type="time"
              value={startTime}
              onChange={handleStartTimeChange}
              className="w-full border-1 border-gray-300 outline-none rounded-md px-4 py-2 bg-white"
            />
          </div>
          {/* End Date-Time */}
          <p className="font-poppins text-lg mt-4">End Date Time</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-3/4 mt-2">
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="w-full border-1 border-gray-300 outline-none rounded-md px-4 py-2 bg-white"
            />
            <input
              type="time"
              value={endTime}
              onChange={handleEndTimeChange}
              className="w-full border-1 border-gray-300 outline-none rounded-md px-4 py-2 bg-white"
            />
          </div>{" "}
          <FormInput label="Discount" type="text" inputRef={discountRef}className="min-w-56" />
          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="bg-black text-backgroundGray px-8 py-2 rounded-full font-semibold font-poppins w-3/4 mt-8"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default PromoAddPge;
