

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // 👇 make sure this URL points to your backend
      const res = await axios.post("http://localhost:5000/auth/send-otp", {
        email,
      });

      // ✅ Only redirect if backend says success
      if (res.data.success) {
        setMessage(res.data.message || "OTP sent successfully!");
        navigate("/otp", { state: { email } });
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-500">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Forgot Password?</h2>
        <p className="text-gray-600 mb-4">
          Enter your registered email address. We’ll send you an OTP.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter registered email"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />

          <button
            type="submit"
            disabled={!email || loading}
            className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50 flex justify-center items-center"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              "Next"
            )}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

{/* import { useState } from "react";
import axios from "axios";

export default function ForgotPassword({ onNext }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/forgot-password", { email });
      setSuccess(res.data.message);
      onNext(email); // go to OTP page
    } catch (err) {
      setError(err.response?.data?.message || "Error sending OTP");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-500">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Forgot Password?</h2>
        <p className="text-gray-600 mb-4">Enter your registered email address. We’ll send you an OTP.</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="w-full p-2 border rounded mb-3"
        />
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button
          disabled={!email}
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
*/}

{/* // correct UI 
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        navigate("/verify-otp", { state: { email } });
      } else {
        const data = await res.json();
        setError(data.message || "Email not registered");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-200 via-white to-purple-100">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">
          Forgot Password?
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your registered email address. We’ll send you an OTP to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={!/\S+@\S+\.\S+/.test(email)}
            className="w-full py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            Next
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-purple-600 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
*/}






{/* // src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/send-otp", { email });
      setMessage(res.data.message);
      navigate("/otp", { state: { email } }); // go to verify page with email
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
  <>
   <Header />
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-blue-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">Forgot Password</h2>
        <form onSubmit={handleSendOtp} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700"
          >
            Send OTP
          </button>
        </form>
        {message && <p className="text-center text-sm text-gray-600 mt-4">{message}</p>}
      </div>
    </div>
</>
  );
};

export default ForgotPassword;
*/}


{/* // src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth"}/forgot-password`, {
        email,
        newPassword,
      });
      setMessage(res.data?.message || "Password updated");
      alert("Password updated successfully");
    } catch (err) {
      console.error("Forgot password error:", err);
      setMessage(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-72 bg-white p-6 rounded shadow">
          <input type="email" placeholder="Enter your email" className="border p-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="New Password" className="border p-2 rounded" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold p-2 rounded">Reset Password</button>
          {message && <p className="mt-2 text-center text-sm">{message}</p>}
        </form>
      </div>
    </>
  );
};

export default ForgotPassword; */}


