import React from "react";
import Detail from "./Detail";
import { FaTruck, FaExchangeAlt, FaLock } from "react-icons/fa";

const Detailsbar = ({className}) => {
  return (
      <div className={`${className} flex space-x-6 p-6 justify-center`}>
      <Detail
        icon={FaTruck}
        heading="Free Shipping Island-wide"
        subheading="Enjoy free delivery on all orders across the island."
      />
      <Detail
        icon={FaExchangeAlt}
        heading="Returns & Exchanges"
        subheading="Easily return or exchange items within 30 days."
      />
      <Detail
        icon={FaLock}
        heading="Secure Payments"
        subheading="We ensure your transactions are safe and protected."
      />
    </div>
  );
};

export default Detailsbar;
