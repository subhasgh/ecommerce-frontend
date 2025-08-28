

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import nutmegLogo from "../assets/nutmeg-logo.png";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "password") {
      checkPasswordStrength(e.target.value);
    }
  };

  // Password strength checker
  const checkPasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength("");
    } else if (password.length < 8) {
      setPasswordStrength("weak");
    } else if (
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      setPasswordStrength("strong");
    } else {
      setPasswordStrength("medium");
    }
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone) {
      newErrors.phone = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }


    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL.replace(
          "/api/auth",
          ""
        )}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate("/login");
        }, 1500);
      } else {
        const errorData = await res.json().catch(() => ({}));
        setErrors({
          email:
            errorData.message?.toLowerCase().includes("email") &&
            errorData.message,
        });
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-5 right-5 z-50 animate-slide-in flex flex-col bg-green-100 border border-green-300 text-green-800 rounded-lg shadow-lg w-72">
          <div className="flex items-center gap-2 px-4 py-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414L9 14.414 
                5.293 10.707a1 1 0 011.414-1.414L9 
                11.586l6.293-6.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Registration successful!</span>
          </div>
          <div className="h-1 bg-green-300">
            <div className="h-1 bg-green-500 animate-progress"></div>
          </div>
        </div>
      )}

      <div
        className="min-h-screen flex flex-col justify-start pt-32 items-center"
        style={{ backgroundColor: "#fef6e4" }}
      >
        {/* Logo */}
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
          Create Your Account
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          noValidate
          className="flex flex-col gap-4 w-full max-w-sm bg-white p-6 rounded shadow"
        >
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded-full"
            autoComplete="off"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded-full"
            autoComplete="off"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          {/* Mobile */}
          <input
            type="text"
            name="phone"
            placeholder="Mobile number"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded-full"
            autoComplete="off"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border p-2 rounded-full w-full pr-10"
              autoComplete="new-password"
            />
            {/* Eye icon */}
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "🙈"}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          {/* Password Strength */}
          {formData.password && (
            <>
              <div className="w-full h-2 rounded bg-gray-200">
                <div
                  className={`h-2 rounded ${
                    passwordStrength === "weak"
                      ? "bg-red-500 w-1/3"
                      : passwordStrength === "medium"
                      ? "bg-orange-500 w-2/3"
                      : passwordStrength === "strong"
                      ? "bg-green-500 w-full"
                      : ""
                  }`}
                ></div>
              </div>
              <p
                className={`text-sm ${
                  passwordStrength === "weak"
                    ? "text-red-500"
                    : passwordStrength === "medium"
                    ? "text-orange-500"
                    : "text-green-600"
                }`}
              >
                {passwordStrength.charAt(0).toUpperCase() +
                  passwordStrength.slice(1)}{" "}
                password
              </p>
            </>
          )}

          {/* Submit */}
          <button
            type="submit"  className="block w-1/2 mx-auto bg-gradient-to-r
             from-pink-400 to-rose-500 text-white font-medium py-2 rounded-full shadow-md hover:shadow-lg transition">
             Register
          </button>
        </form>

        <div className="mt-6 text-sm text-center">
          <span className="text-gray-700">Already have an account?</span>{" "}
          <Link
            to="/login"
            className="font-semibold underline transition-colors duration-200"
            style={{ color: "#9b1c1c" }}
          >
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;


