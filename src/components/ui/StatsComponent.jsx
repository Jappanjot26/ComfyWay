import React from "react";

const StatsComponent = () => {
  return (
    <div className="flex justify-between items-center mb-12 pr-2">
      <div>
        <p className="text-3xl font-bold text-gray-900">115K+</p>
        <p className="text-gray-500 text-sm">Capital Raised</p>
      </div>
      <div className="w-1 h-12 bg-gray-200"></div>
      <div>
        <p className="text-3xl font-bold text-gray-900">10K+</p>
        <p className="text-gray-500 text-sm">Happy Customers</p>
      </div>
      <div className="w-1 h-12 bg-gray-200"></div>

      <div>
        <p className="text-3xl font-bold text-gray-900">4K+</p>
        <p className="text-gray-500 text-sm">Property Options</p>
      </div>
    </div>
  );
};

export default StatsComponent;
