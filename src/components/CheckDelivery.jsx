
// This code snippet is not used in this project now. In future, if we implement realtime pincode checker validation, that time if we use ShipRocket API ,  we can use this
import React, { useState } from "react";
import axios from "axios";

const CheckDelivery = () => {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [couriers, setCouriers] = useState([]);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    setError("");
    setMessage("");
    setCouriers([]);
    if (!/^[1-9][0-9]{5}$/.test(pincode)) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/delivery/check/${pincode}`
      );
      setMessage(res.data.message);
      setCouriers(res.data.couriers || []);
    } catch (err) {
      setError(err.response?.data?.message || "Error checking delivery");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Check Delivery Availability</h3>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="border rounded p-2 flex-1"
        />
        <button
          onClick={handleCheck}
          disabled={loading}
          className="bg-pink-600 text-white px-4 py-1 rounded-md hover:bg-orange-600 disabled:bg-gray-400"
        >
          {/*  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400" className="bg-pink-600 text-white px-4 py-1 rounded-md */}
          {loading ? "Checking..." : "Check"}
        </button>
      </div>

      {/* Error / Success */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {message && !error && <p className="text-green-600 text-sm mt-2">{message}</p>}

      {/* Courier list */}
      {couriers.length > 0 && (
        <div className="mt-3">
          <h4 className="font-semibold">Available Couriers:</h4>
          <ul className="list-disc ml-5 text-sm">
            {couriers.map((c, i) => (
              <li key={i}>
                {c.name} – {c.etd} days – {c.cod ? "COD ✅" : "Prepaid Only"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CheckDelivery;


// API with postal
{/* import React, { useState, useEffect } from "react";

const CheckDelivery = ({ isLoggedIn }) => {
  const [pincode, setPincode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [couriers, setCouriers] = useState([]);
  const [history, setHistory] = useState([]);

  // Fetch last 3 searched pincodes if logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetch("/api/delivery/history", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => setHistory(data.history || []))
        .catch(() => {});
    }
  }, [isLoggedIn]);

  // Validation
  const validatePincode = (pin) => {
    if (!pin) return "Enter pincode";
    if (!/^[1-9][0-9]{5}$/.test(pin)) return "Enter valid 6-digit pincode";
    return null;
  };

  // Calculate delivery date range
  const getDeliveryRange = (days) => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() + days);

    const options = { day: "numeric", month: "short" };
    return start.toLocaleDateString("en-IN", options);
  };

  // Handle check button click
  const handleCheck = async (selectedPin) => {
    const pin = selectedPin || pincode;
    const error = validatePincode(pin);
    if (error) {
      setMessage(error);
      setCouriers([]);
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setCouriers([]);

      const res = await fetch(`/api/delivery/check/${pin}`, {
        credentials: "include",
      });
      const data = await res.json();

      setMessage(data.message);
      setCouriers(data.couriers || []);
      setPincode(pin);
    } catch {
      setMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 p-4 border rounded-lg shadow-md max-w-sm bg-white">
      <h2 className="text-lg font-semibold mb-2">
        Check Delivery Availability
      </h2>

      {/* Input + Button 
      <div className="flex gap-2">
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter 6-digit pincode"
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={() => handleCheck()}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </div>

      {/* Result message 
      {message && (
        <p
          className={`mt-2 text-sm ${
            message.includes("available") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      {/* Courier list 
      {couriers.length > 0 && (
        <div className="mt-3 text-sm">
          <p className="font-medium">Available Couriers:</p>
          <ul className="list-disc pl-5">
            {couriers.map((c, i) => (
              <li key={i}>
                {c.name} – ETA: {c.etd} days (
                {getDeliveryRange(c.etd)})
                {c.cod ? " – COD ✅" : " – Prepaid only"}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* User history 
      {isLoggedIn && history.length > 0 && (
        <div className="mt-3">
          <p className="text-sm font-medium">Recently Checked:</p>
          <div className="flex gap-2 mt-1">
            {history.map((h, i) => (
              <button
                key={i}
                onClick={() => handleCheck(h.pincode)}
                className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
              >
                {h.pincode}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckDelivery;
*/}