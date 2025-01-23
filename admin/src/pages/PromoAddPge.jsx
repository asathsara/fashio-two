import React, { useState, useEffect, useRef } from "react";
import { fetchItems } from "../api/ItemApi";
import { fetchPromos, insertPromo } from "../api/PromoApi";
import FormInput from "../components/FormInput ";
import Dialog from "../components/Dialog";

const PromoAddPge = () => {
  const [items, setItems] = useState([]);
  const [promos, setPromos] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [startDate, setStartDate] = useState(""); // Start date
  const [startTime, setStartTime] = useState(""); // Start time
  const [endDate, setEndDate] = useState(""); // End date
  const [endTime, setEndTime] = useState(""); // End time
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState([])

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

  useEffect(() => {
    const loadPromos = async () => {
      try {
        const data = await fetchPromos();
        setPromos(data);
      } catch (err) {
        setError("Failed to fetch promos");
      } finally {
        setLoading(false);
      }
    };

    loadPromos();
  }, []);

  const handleItemsChange = (e) => {
    setSelectedItem(e.target.value); // Store the item's ID
    console.log("Selected Item ID:", e.target.value);
  };

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleStartTimeChange = (e) => setStartTime(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);
  const handleEndTimeChange = (e) => setEndTime(e.target.value);

  const handleSubmit = async () => {

    const formData = new FormData();
    formData.append("item", selectedItem);
    formData.append("startDate", startDate);
    formData.append("startTime", startTime);
    formData.append("endDate", endDate);
    formData.append("endTime", endTime);
    formData.append("discount", discountRef.current.value);

    try {
      const response = await insertPromo(formData);
      setDialogContent({
        title: "Success",
        subText: "Promo added successfully!",
      });
      setIsDialogOpen(true);

      // Clear fields after successful submission
      setSelectedItem(null);
      setStartDate("");
      setStartTime("");
      setEndDate("");
      setEndTime("");
      discountRef.current.value = "";
    } catch (error) {
      console.error(error);
      setDialogContent({ title: "Error", subText: "Failed to add promo" });
      setIsDialogOpen(true);
    }
   
  };

  const handleOk = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  const handleCancel = () => {
    setIsDialogOpen(false); // Just close the dialog
  };

  return (
    <>
      <h1 className="font-poppins text-3xl font-semibold mb-6 mx-auto md:items-start">
        Promo Item
      </h1>
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
                  {item.name + " (" + item.category + ") "}
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
          <FormInput
            label="Discount"
            type="text"
            inputRef={discountRef}
            className="min-w-56"
          />
          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="bg-black text-backgroundGray px-8 py-2 rounded-full font-semibold font-poppins w-3/4 mt-8"
          >
            Submit
          </button>
        </div>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="w-full mt-8 overflow-x-auto">
              <div className="min-w-[800px] grid grid-cols-5 gap-4 text-center font-semibold text-gray-700 px-4 py-4 bg-gray-100 rounded-md mb-2 font-poppins ">
                <span>Item</span>
                <span>
                  Start 
                  <br />Data & Time
                </span>
                <span>
                  End
                  <br />Data & Time
                </span>
                <span>Discount</span>
                <span>Delete</span>
              </div>
              {promos.map((promo) => (
                <div
                  key={promo._id}
                  className="min-w-[800px] grid grid-cols-8 gap-4 items-center text-left text-gray-800 px-4 py-4 hover:bg-gray-50 border-b border-gray-200 font-poppins"
                >
                  <span>{promo.item.name}</span>
                  <span>
                    {promo.startDate}{promo.startTime}
                  </span>
                  <span>
                    {promo.endDate}
                    <br />
                    {promo.endTime}
                  </span>
                  <span>{promo.discount}</span>
                  <FaTrash
                    className="cursor-pointer text-red-500 hover:text-red-700 transition duration-200"
                    onClick={() => openDeleteDialog(promo)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Dialog
        isOpen={isDialogOpen}
        title={dialogContent.title}
        subText={dialogContent.subText}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </>
  );
};

export default PromoAddPge;
