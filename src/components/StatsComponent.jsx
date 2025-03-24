import React from "react";

const StatsComponent = () => {
  return (
    <div className="flex justify-between mb-8">
      <div>
        <p className="text-3xl font-bold text-gray-900">115K+</p>
        <p className="text-gray-500 text-sm">Capital Raised</p>
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-900">70K+</p>
        <p className="text-gray-500 text-sm">Happy Customers</p>
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-900">4-7K+</p>
        <p className="text-gray-500 text-sm">Property Options</p>
      </div>
    </div>
  );
};

export default StatsComponent;
