{/* import React, { useState } from "react";

const DeliveryCheck = () => {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState("");

  const checkDelivery = () => {
    // Replace with backend pincode check
    if (pincode === "600001") {
      setResult("Delivery available in 2-3 days ✅");
    } else {
      setResult("Delivery available in 5-7 days 🚚");
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="font-semibold text-lg mb-2">Delivery Check</h2>
      <div className="flex gap-2">
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter Pincode"
          className="border rounded-lg p-2 w-full"
        />
        <button
          onClick={checkDelivery}
          className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
        >
          Check
        </button>
      </div>
      {result && <p className="mt-2 text-gray-700">{result}</p>}
    </div>
  );
};

export default DeliveryCheck;
*/}