// Correct code for full functionality forgot-password, otp, reset-password flow
// src/pages/OtpVerification.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {  useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

   useEffect(() => {
    // ✅ Get email from navigation state
    const stateEmail = location.state?.email || "";
    if (!stateEmail) {
      setMessage("Email not found. Please go back and try again.");
    }
    setEmail(stateEmail);
  }, [location.state]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const maskEmail = (email) => {
    if (!email) return "";
    const [user, domain] = email.split("@");
    if (user.length <= 5) {
      const first = user.slice(0, 1);
      const last = user.slice(-1);
      return `${first}***${last}@${domain}`;
    }
    const first = user.slice(0, 2);
    const last = user.slice(-3);
    return `${first}***${last}@${domain}`;
  };

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");
    if (!value) return;
    const newOtp = [...otp];
    newOtp[index] = value[0];
    setOtp(newOtp);
    if (index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setMessage("Please enter a 6-digit OTP.");
      return;
    }
    try {
      setLoading(true);
      setMessage("");
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp: otpCode });
      if (res.data.success) {
        setMessage("✅ OTP Verified Successfully!");
        navigate("/reset-password", { state: { email, otp: otpCode } });
      } else {
        setMessage("❌ Invalid or Expired OTP.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setMessage("");
      await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setMessage("📩 OTP resent to your email.");
      setTimer(60);
      setOtp(Array(6).fill(""));
      inputsRef.current[0].focus();
    } catch (err) {
      console.error(err);
      setMessage("Error resending OTP. Please try later.");
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-200 to-blue-200">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <img src="https://cdn-icons-png.flaticon.com/512/295/295128.png" alt="Email OTP" className="w-20 h-20" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>
        <p className="text-gray-500 mb-6">
          We’ve sent a 6-digit code to <br />
          <span className="font-semibold">{maskEmail(email)}</span>
        </p>
        <div className="flex justify-between mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength="1"
              ref={(el) => (inputsRef.current[index] = el)}
              className="w-12 h-12 text-center text-xl border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            />
          ))}
        </div>
        <button
          onClick={handleVerify}
          disabled={loading || otp.join("").length !== 6}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
        {message && <p className="mt-4 text-sm text-red-500 font-medium">{message}</p>}
        <div className="mt-6 text-gray-600">
          Didn’t receive the code?{" "}
          {timer > 0 ? (
            <span className="text-gray-400">Resend in {timer}s</span>
          ) : (
            <button onClick={handleResend} className="text-purple-600 font-semibold hover:underline">Resend OTP</button>
          )}
        </div>
        <div className="mt-4">
          <a href="/forgot-password" className="text-sm text-gray-500 hover:underline">← Back to Forgot Password</a>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;




