import React, { useState } from "react";

const TabButtons = () => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="flex items-center justify-center space-x-4 mt-6">
      {/* Product Details */}
      <button
        onClick={() => setActiveTab("details")}
        className={`px-6 py-2 rounded-full text-white font-medium shadow-lg transition-all duration-300 
        ${activeTab === "details"
            ? "bg-gradient-to-r from-pink-500 to-orange-500 shadow-pink-200"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
      >
        Product Details
      </button>

      {/* Price Breakup */}
      <button
        onClick={() => setActiveTab("price")}
        className={`px-6 py-2 rounded-full text-white font-medium shadow-lg transition-all duration-300
        ${activeTab === "price"
            ? "bg-gradient-to-r from-pink-500 to-orange-500 shadow-orange-200"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
      >
        Price Breakup
      </button>
    </div>
  );
};

export default TabButtons;
