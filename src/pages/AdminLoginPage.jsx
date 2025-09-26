

// src/pages/AdminLoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (!email && !password) {
       setError("Email and Password are required");
      return;
    }
    if (!email) {
       setError("Email is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }

    // Check if max attempts exceeded
    if (attempts >= 3) {
      toast.error("🚫 3 attempts over, try again after sometime");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

        if (data.success) {
        console.log("✅ Admin logged in:", data.admin);
         toast.success("Welcome back, Admin 🚀");
  

  // Delay navigation slightly so toast can show
  setTimeout(() => {
    navigate("/admin");
  }, 500); // half a second delay

        //toast.success(`Welcome back, ${data.admin} 🚀`);
        navigate("/admin"); 
      } 
       
        
      else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (data.message === "Admin not found") {
          toast.error("❌ Admin not found");
        } else {
          toast.error(`Login failed ❌ ${data.message || "Invalid credentials"}`);
        }

        if (newAttempts >= 3) {
          toast.error("🚫 3 attempts over, try again after sometime");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
              autoComplete="off"
              disabled={attempts >= 3}
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded pr-10"
              autoComplete="new-password"
              disabled={attempts >= 3}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 cursor-pointer text-gray-500 select-none"
            >
              {showPassword ? "👁️" : "🙈"}
            </span>
          </div>

          <button
            type="submit"
            disabled={attempts >= 3}
            className={`w-full p-2 rounded text-white ${
              attempts >= 3
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {attempts >= 3 ? "Locked (3 attempts)" : "Login"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminLoginPage;




