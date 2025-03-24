import React from "react";

const HeaderComponent = () => {
  return (
    <div className="mb-8">
      <h1 className="text-5xl font-bold mb-3 tracking-tight pt-2">
        Reserve Your Ideal Holiday
      </h1>
      <div className="flex items-center">
        <p className="text-gray-500 text-sm mb-2">Let's get acquainted!</p>
        <p className="text-gray-500 text-sm mb-2 w-2/3 h-0.5 bg-gray-200 ml-4 mr-2"></p>
      </div>
      <p className="text-gray-500 text-sm mb-6 leading-relaxed">
        We specialize in curating exceptional villa rentals, providing an
        unparalleled level of comfort, privacy, and convenience for your dream
        vacation.
      </p>
      <button className="bg-black text-white text-sm font-medium px-6 py-2 rounded-full flex items-center hover:bg-gray-800 transition">
        MORE
        <svg
          className="w-5 h-5 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default HeaderComponent;
