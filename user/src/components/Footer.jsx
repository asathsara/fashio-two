import React from "react";

const Footer = ({ onSelect, footerItems }) => {
  return (
    <footer className="bg-navbarGray text-white py-8 font-poppins mt-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">About Us</h2>
          <p className="text-sm">
            We are a leading e-commerce platform providing the best products at
            the best prices. Your satisfaction is our priority.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="list-none gap-5 flex ml-3 mr-5 font-poppins cursor-pointer flex-col text-sm  text-backgroundGray">
            {footerItems.map((item) => (
              <li
                key={item.id}
                className={`
            }`}
                onClick={() => {
                  onSelect(item.label);
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Subscribe Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Subscribe to Our Newsletter
          </h2>
         
            <div className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded bg-backgroundGray  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                className="bg-darkGray hover:bg-black text-white py-2 px-4 rounded"
              >
                Subscribe
              </button>
            </div>
         
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-sm text-gray-400">
          &copy; 2025 Fashio Inc. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
