import React from "react";

const Dialog = ({ isOpen, title, subText, onOk, onCancel }) => {
  if (!isOpen) return null; // Don't render if the dialog isn't open

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          onCancel(); // Close the dialog when clicking the backdrop
        }
      }}
    >
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{subText}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onOk}
            className="px-4 py-2 bg-navbarGray text-white rounded-md hover:bg-black"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
