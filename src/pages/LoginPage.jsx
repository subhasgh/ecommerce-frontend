// src/pages/LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Header from "../components/Header.jsx";
import nutmegLogo from "../assets/nutmeg-logo.png";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/products";
  const { loginComplete } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const base = import.meta.env.VITE_API_URL || "http://localhost:5000";

      // First: login request
      const res = await axios.post(
        `${base}/login`,
        { email: email.trim().toLowerCase(), password },
        { withCredentials: true }
      );

      if (res.data?.success) {
        // Second: fetch logged-in user info with cookie
        const meRes = await axios.get(`${base}/me`, {
          withCredentials: true,
        });

        if (meRes.data?.success) {
          await loginComplete(meRes.data.user); // pass user into context
        }

        setErrors({});
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
          navigate(from);
        }, 1000);
      } else {
        // API responded but not success
        setErrors({
          email: res.data.message?.toLowerCase().includes("email")
            ? res.data.message
            : undefined,
          password: res.data.message?.toLowerCase().includes("password")
            ? res.data.message
            : undefined,
        });
        setShowError(true);
        setTimeout(() => setShowError(false), 1600);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      const lower = String(msg).toLowerCase();
      setErrors({
        email: lower.includes("email") ? msg : undefined,
        password: lower.includes("password") ? msg : undefined,
      });
      setShowError(true);
      setTimeout(() => setShowError(false), 1600);
    }
  };

  return (
    <>
      <Header />

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-5 right-5 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg w-72">
          ✅ Login successful!
          <div className="h-1 bg-green-300 mt-2">
            <div className="h-1 bg-green-500 animate-progress"></div>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {showError && (
        <div className="fixed top-5 right-5 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg w-72">
          ❌ Login failed
          <div className="h-1 bg-red-300 mt-2">
            <div className="h-1 bg-red-500 animate-progress"></div>
          </div>
        </div>
      )}

      <div
        className="min-h-screen flex flex-col justify-start pt-32 items-center"
        style={{ backgroundColor: "#fef6e4" }}
      >
        <div className="text-6xl font-bold text-pink-1000 flex items-end justify-start mb-10 ml-1">
          NutMe
          <span className="relative inline-block">
            <img
              src={nutmegLogo}
              alt="Nutmeg Logo"
              className="w-30 absolute -top-7 left-3/2 -translate-x-3/2"
            />
            g
          </span>
        </div>
        <p className="text-lg md:text-xl font-medium text-pink-700 mb-6">
          Ecomm version 1.0
        </p>

        <form
          onSubmit={handleLogin}
          autoComplete="off"
          className="flex flex-col gap-4 w-full max-w-sm bg-white p-6 rounded shadow"
        >
          <input
            type="text"
            name="fakeuser"
            style={{ display: "none" }}
            autoComplete="new-password"
          />
          <input
            type="password"
            name="fakepass"
            style={{ display: "none" }}
            autoComplete="new-password"
          />

          <input
            type="email"
            name="user_email"
            autoComplete="new-password"
            placeholder="Enter your email"
            className="border p-2 rounded-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="user_password"
              autoComplete="new-password"
              placeholder="Enter your password"
              className="border p-2 rounded-full w-full pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-2 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <p className="text-sm text-right text-blue-600 hover:underline cursor-pointer">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>

          <button
            type="submit"
            className="block w-1/2 mx-auto bg-gradient-to-r from-pink-400 to-rose-500 text-white py-2 rounded-full hover:opacity-90"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-sm text-center">
          <span className="text-gray-700">New User?</span>{" "}
          <Link
            to="/register"
            className="font-semibold underline transition-colors duration-200"
            style={{ color: "#9b1c1c" }}
          >
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
