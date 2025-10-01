import { useState, useEffect, useRef } from "react";
import { fetchItems } from "../api/ItemApi";
import { fetchPromos, insertPromo } from "../api/PromoApi";
import FormInput from "../components/FormInput ";
import Dialog from "../components/Dialog";
import { FaTrash } from "react-icons/fa";
import type { Promo } from "../types/api/promo";

// Example types (adjust to your real backend)
interface Item {
  _id: string;
  name: string;
  category: string;
}


interface DialogContent {
  title: string;
  subText: string;
}

const PromoAddPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [promos, setPromos] = useState<Promo[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<DialogContent | null>(null);

  const discountRef = useRef<HTMLInputElement | null>(null);

  // Load items
  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
      } catch {
        setError("Failed to fetch items");
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  // Load promos
  useEffect(() => {
    const loadPromos = async () => {
      try {
        const data = await fetchPromos();
        setPromos(data);
      } catch {
        setError("Failed to fetch promos");
      } finally {
        setLoading(false);
      }
    };
    loadPromos();
  }, []);

  const handleSubmit = async () => {
    if (!selectedItem || !discountRef.current) return;

    const promo: Promo = {
      item: selectedItem!,
      startDate,
      startTime,
      endDate,
      endTime,
      discount: discountRef.current?.value || "0",
    };

    try {
      await insertPromo(promo);
      setDialogContent({ title: "Success", subText: "Promo added successfully!" });
      setIsDialogOpen(true);

      // Reset
      setSelectedItem(null);
      setStartDate("");
      setStartTime("");
      setEndDate("");
      setEndTime("");
      discountRef.current.value = "";
    } catch (err) {
      console.error(err);
      setDialogContent({ title: "Error", subText: "Failed to add promo" });
      setIsDialogOpen(true);
    }
  };

  return (
    <>
      <h1 className="font-poppins text-3xl font-semibold mb-6">Promo Item</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left form */}
        <div>
          <p className="font-poppins text-lg mt-4">Item</p>
          {!loading && (
            <select
              className="w-3/4 border border-gray-300 outline-none rounded-md px-4 py-2 bg-white cursor-pointer mt-2"
              value={selectedItem || ""}
              onChange={(e) => setSelectedItem(e.target.value)}
              disabled={!items.length}
            >
              <option value="" disabled>
                Select an option
              </option>
              {items.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name} ({item.category})
                </option>
              ))}
            </select>
          )}
          {error && <p className="text-red-500 mt-2">{error}</p>}

          {/* Start Date-Time */}
          <p className="font-poppins text-lg mt-4">Start Date Time</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-3/4 mt-2">
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input" />
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="input" />
          </div>

          {/* End Date-Time */}
          <p className="font-poppins text-lg mt-4">End Date Time</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-3/4 mt-2">
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="input" />
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="input" />
          </div>

          <FormInput label="Discount" type="text" inputRef={discountRef} className="min-w-56" />

          <button onClick={handleSubmit} className="bg-black text-white px-8 py-2 rounded-full font-semibold font-poppins w-3/4 mt-8">
            Submit
          </button>
        </div>

        {/* Right promos list */}
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="w-full mt-8 overflow-x-auto">
              <div className="min-w-[800px] grid grid-cols-5 gap-4 text-center font-semibold text-gray-700 px-4 py-4 bg-gray-100 rounded-md mb-2 font-poppins">
                <span>Item</span>
                <span>Start Date & Time</span>
                <span>End Date & Time</span>
                <span>Discount</span>
                <span>Delete</span>
              </div>
              {promos.map((promo) => (
                <div key={promo._id} className="min-w-[800px] grid grid-cols-5 gap-4 text-center items-center text-gray-800 px-4 py-4 border-b border-gray-200 font-poppins">
                  <span>{promo.item}</span>
                  <span>{promo.startDate} {promo.startTime}</span>
                  <span>{promo.endDate} {promo.endTime}</span>
                  <span>{promo.discount}</span>
                  <FaTrash className="cursor-pointer text-red-500 hover:text-red-700 transition duration-200" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {dialogContent && (
        <Dialog
          isOpen={isDialogOpen}
          title={dialogContent.title}
          subText={dialogContent.subText}
          onOk={() => setIsDialogOpen(false)}
          onCancel={() => setIsDialogOpen(false)}
        />
      )}
    </>
  );
};

export default PromoAddPage;
