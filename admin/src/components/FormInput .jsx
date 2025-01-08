import React from "react";

const FormInput = ({ label, type, inputRef, ...props }) => (
  <div>
    <p className="font-poppins text-lg mt-4">{label}</p>
    <input
      ref={inputRef}
      type={type}
      className="border-1 border-gray-300 outline-none rounded-md px-4 py-2 mt-1 w-3/4 min-w-96"
      {...props}
    />
  </div>
);

export default FormInput;
