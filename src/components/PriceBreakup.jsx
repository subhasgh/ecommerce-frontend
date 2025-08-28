import React from "react";

const PriceBreakup = ({ price }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="font-semibold text-lg mb-2">Price Breakup</h2>
      <ul className="text-gray-700 space-y-1">
        <li>Gold: ₹{price.gold}</li>
        <li>Stones: ₹{price.stones}</li>
        <li>Making Charges: ₹{price.making}</li>
        <li>GST: ₹{price.gst}</li>
      </ul>
      <p className="font-bold mt-3 text-pink-600">Total: ₹{price.total}</p>
    </div>
  );
};

export default PriceBreakup;
