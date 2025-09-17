
//// Correct code for full functionality forgot-password, otp, reset-password flow
// src/pages/ResetPasswordPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const otp = location.state?.otp;

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      setMessage(res.data.message);
      toast.success("Password reset successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to reset password");
      toast.error(err.response?.data?.message || "Failed to reset password", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Password strength logic
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    if (strength <= 1) return { width: "33%", color: "bg-red-500" };
    if (strength === 2 || strength === 3) return { width: "66%", color: "bg-orange-500" };
    if (strength >= 4) return { width: "100%", color: "bg-green-500" };
    return { width: "0", color: "bg-gray-200" };
  };

  const strength = getPasswordStrength(newPassword);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-black-600 mb-4">Reset Password</h2>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2/4 transform -translate-y-2/4 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} /> }
            </button>
          </div>

          {/* Password Strength Bar */}
          {newPassword && (
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div
                className={`${strength.color} h-2 rounded-full transition-all duration-300`}
                style={{ width: strength.width }}
              ></div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Reset Password
          </button>
        </form>
        {/* {message && <p className="text-center text-sm text-gray-600 mt-4">{message}</p>}*/}
      </div>
    </div>
  );
};

export default ResetPasswordPage;





