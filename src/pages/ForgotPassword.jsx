// Correct code for full functionality forgot-password, otp, reset-password flow
// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import nutmegLogo from "../assets/nutmeg-logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
        if (res.data.success) {
        setMessage(res.data.message || "OTP sent successfully!");
        // navigate(`/otp`, { state: { email } });
        navigate(`/otp`, { state: { email } });
      } else {
        setMessage(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-400">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-2">Forgot Password</h2>
        <p className="text-gray-600 mb-4">
          Enter your registered email address. We’ll send you an OTP to reset your password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage("");
            }}
            placeholder="Enter registered email"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            disabled={loading || !isValidEmail(email)}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            ) : (
              "Send"
            )}
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center text-sm ${message.toLowerCase().includes("success") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
        <div className="mt-4 text-center">
          <button onClick={handleBack} className="text-blue-600 hover:underline text-sm">Back to Login</button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;


