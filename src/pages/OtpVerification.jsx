

// src/pages/OtpVerification.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";


const OtpVerification = ({ email, onSuccess }) => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60); // 60 sec countdown for resend

  // Countdown for resend OTP
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  // Handle OTP input
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // allow only numbers
    if (value.length <= 6) setOtp(value);
  };

  // Verify OTP
  const handleVerify = async () => {
    if (otp.length !== 6) {
      setMessage("Please enter a 6-digit OTP");
      return;
    }
    try {
      setLoading(true);
      setMessage("");
      const res = await axios.post("http://localhost:5000/auth/verify-otp", {
        email,
        otp,
      });

      if (res.data.success) {
        setMessage("✅ OTP Verified Successfully!");
        onSuccess(); // navigate to Reset Password
      } else {
        setMessage("❌ Invalid or Expired OTP");
      }
    } catch (err) {
      setMessage("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    try {
      setMessage("");
      await axios.post("http://localhost:5000/auth/resend-otp", { email });
      setMessage("📩 OTP resent to your email");
      setTimer(60);
    } catch (err) {
      setMessage("Error resending OTP. Try later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-200 to-blue-200">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md text-center">
        {/* Illustration (instead of QR) */}
        <div className="flex justify-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
            alt="Email OTP"
            className="w-20 h-20"
          />
        </div>

        <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>
        <p className="text-gray-500 mb-6">
          We’ve sent a 6-digit code to <br />
          <span className="font-semibold">{email}</span>
        </p>

        {/* OTP Input */}
        <input
          type="text"
          value={otp}
          onChange={handleChange}
          maxLength="6"
          placeholder="Enter OTP"
          className="w-full text-center text-xl tracking-widest border rounded-lg p-3 focus:ring-2 focus:ring-purple-400 outline-none mb-4"
        />

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        {/* Message */}
        {message && (
          <p className="mt-4 text-sm text-red-500 font-medium">{message}</p>
        )}

        {/* Resend OTP */}
        <div className="mt-6 text-gray-600">
          Didn’t receive the code?{" "}
          {timer > 0 ? (
            <span className="text-gray-400">Resend in {timer}s</span>
          ) : (
            <button
              onClick={handleResend}
              className="text-purple-600 font-semibold hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>

        {/* Back to Forgot Password */}
        <div className="mt-4">
          <a
            href="/forgot-password"
            className="text-sm text-gray-500 hover:underline"
          >
            ← Back to Forgot Password
          </a>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
