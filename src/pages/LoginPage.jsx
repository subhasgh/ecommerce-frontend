

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Header from "../components/Header.jsx";
import nutmegLogo from "../assets/nutmeg-logo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/products";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

{/*  // Password strength checker
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { strength: "", color: "" };
    if (pwd.length < 6) return { strength: "Weak", color: "bg-red-500" };
    if (pwd.match(/[A-Z]/) && pwd.match(/[0-9]/) && pwd.length >= 8)
      return { strength: "Strong", color: "bg-green-500" };
    return { strength: "Medium", color: "bg-orange-400" };
  };

  const { strength, color } = getPasswordStrength(password);
*/}
  // Validation
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
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth"}/login`,
        { email, password }
      );

      if (res.data?.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setErrors({});
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate(from);
        }, 1200);
      } else {
        setErrors({
          email: res.data.message.toLowerCase().includes("email")
            ? "Please enter registered email address"
            : undefined,
          password: res.data.message.toLowerCase().includes("password")
            ? "Invalid password"
            : undefined,
        });
        setShowError(true);
        setTimeout(() => setShowError(false), 1200);
      }
    } catch (err) {
      setErrors({
        email: err.response?.data?.message?.toLowerCase().includes("email")
          ? "Please enter registered email address"
          : undefined,
        password: err.response?.data?.message?.toLowerCase().includes("password")
          ? "Invalid password"
          : "Login failed",
      });
      setShowError(true);
      setTimeout(() => setShowError(false), 1200);
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

      <div className="min-h-screen flex flex-col justify-start pt-32 items-center" style={{ backgroundColor: "#fef6e4" }}>
        <div className="text-6xl font-bold text-pink-1000 flex items-end justify-start mb-10 ml-1">
          NutMe
          <span className="relative inline-block">
            <img src={nutmegLogo} alt="Nutmeg Logo" className="w-30 absolute -top-7 left-3/2 -translate-x-3/2" />
            g
          </span>
        </div>
        <p className="text-lg md:text-xl font-medium text-pink-700 mb-6">Ecomm version 1.0</p>

        <form
          onSubmit={handleLogin}
          autoComplete="off"
          className="flex flex-col gap-4 w-full max-w-sm bg-white p-6 rounded shadow"
        > 
          {/* Hidden fake inputs */}
          <input type="text" name="fakeuser" style={{ display: "none" }} autoComplete="new-password" />
          <input type="password" name="fakepass" style={{ display: "none" }} autoComplete="new-password" />

          <input
            type="email"
            name="user_email"
            autoComplete="new-password"
            placeholder="Enter your email"
            className="border p-2 rounded-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

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
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>} 

{/*           Password Strength Indicator 
          {password && (
            <div className="flex items-center gap-2">
              <div className={`h-2 w-full rounded ${color}`}></div>
              <span className="text-sm text-gray-600">{strength}</span>
            </div>
          )} */} 

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
          <Link to="/register" className="font-semibold underline transition-colors duration-200" style={{ color: "#9b1c1c" }}>
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;


{/* 
// src/pages/LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Header from "../components/Header.jsx";
import nutmegLogo from "../assets/nutmeg-logo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/products";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required"; // empty email
    } else if (!/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email)) {
      newErrors.email = "Please enter a valid email address"; // invalid format
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth"}/login`,
        { email, password }
      );

      if (res.data?.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate(from);
        }, 1200);
      } else {
        // Map server error messages to fields
        setErrors({
          email: res.data?.message?.toLowerCase().includes("email") ? res.data.message : undefined,
          password: res.data?.message?.toLowerCase().includes("password") ? res.data.message : undefined,
        });
      }
    } catch (err) {
      setErrors({
        email: err.response?.data?.message?.toLowerCase().includes("email") ? err.response.data.message : undefined,
        password: err.response?.data?.message?.toLowerCase().includes("password") ? err.response.data.message : "Login failed",
      });
    }
  };

  return (
    <>
      <Header />

      {showSuccess && (
        <div className="fixed top-5 right-5 z-50 animate-slide-in flex flex-col bg-green-100 border border-green-300 text-green-800
          rounded-lg shadow-lg w-72">
          <div className="flex items-center gap-2 px-4 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L9 14.414 5.293 10.707a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
               clipRule="evenodd" />
            </svg>
            <span className="font-medium">Login successful!</span>
          </div>
          <div className="h-1 bg-green-300">
            <div className="h-1 bg-green-500 animate-progress"></div>
          </div>
        </div>
      )}

      <div className="min-h-screen flex flex-col justify-start pt-32 items-center" style={{ backgroundColor: "#fef6e4" }}>
        <div className="text-6xl font-bold text-pink-1000 flex items-end justify-start mb-10 ml-1">
          NutMe
          <span className="relative inline-block">
            <img src={nutmegLogo} alt="Nutmeg Logo" className="w-30 absolute -top-7 left-3/2 -translate-x-3/2" />
            g
          </span>
        </div>
        <p className="text-lg md:text-xl font-medium text-pink-700 mb-6">Ecomm version 1.0</p>

        <form onSubmit={handleLogin} autoComplete="off" className="flex flex-col gap-4 w-full max-w-sm bg-white p-6 rounded shadow"> */}
          {/* Hidden inputs to prevent autofill */}
         {/*  <input type="text" name="fakeusernameremembered" style={{ display: "none" }} />
          <input type="password" name="fakepasswordremembered" style={{ display: "none" }} />

          <input
            type="email"
            name="user_email"
            autoComplete="username"
            placeholder="Enter your email"
            className="border p-2 rounded-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input
            type="password"
            name="user_password"
            autoComplete="current-password"
            placeholder="Enter your password"
            className="border p-2 rounded-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <p className="text-sm text-right text-blue-600 hover:underline cursor-pointer">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>

          <button type="submit"
 // className="block w-1/2 mx-auto bg-gradient-to-r from-pink-300 to-rose-400
// text-white font-medium py-2 rounded-full shadow-md hover:shadow-lg transition">
 
                              className=" block w-1/2 mx-auto bg-gradient-to-r from-pink-400 to-rose-500 text-white py-2 rounded-full hover:opacity-90">
 
            Login
          </button>
        </form>

        <div className="mt-6 text-sm text-center">
          <span className="text-gray-700">New User?</span>{" "}
          <Link to="/register" className="font-semibold underline transition-colors duration-200" style={{ color: "#9b1c1c" }}>
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage; */}



//Without nm logo

 // src/pages/LoginPage.jsx
{/* import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on typing
  };

  // 🔹 Validation function
  const validate = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);

      if (res.data.success) {
        toast.success("Login successful!", { position: "top-right" });
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;

        if (message === "Email does not exist") {
          setErrors({ email: "Email does not exist" });
        } else if (message === "Invalid password") {
          setErrors({ password: "Invalid password" });
        } else {
          toast.error("Something went wrong", { position: "top-right" });
        }
      } else {
        toast.error("Server not responding", { position: "top-right" });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form autoComplete="off" noValidate onSubmit={handleSubmit}> */} 
      {/* Email Input */}
          {/* <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off" 
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500" : "border-gray-300 focus:ring-pink-400"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>*/} 
        {/* Password Input */}
         {/* <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500" : "border-gray-300 focus:ring-pink-400"
              }`}
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div> */}

         {/* Login Button */}
     {/* <button
            type="submit"
           // className="w-full py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-pink-500 to-red-400 hover:opacity-90 transition"
            className=" w-full bg-gradient-to-r from-pink-400 to-rose-500 text-white py-2 rounded-full hover:opacity-90"
            >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

*/}

{/* // src/pages/LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // client-side validation
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        alert("Login successful ✅");
        // navigate("/dashboard");
      }
    } catch (err) {
      if (err.response) {
        const { message } = err.response.data;

        // backend error handling
        if (message === "Email not registered") {
          setErrors({ email: "This email is not registered" });
        } else if (message === "Invalid password") {
          setErrors({ password: "Invalid password" });
        } else {
          setErrors({ email: "Invalid email or password" });
        }
      } else {
        setErrors({ email: "Something went wrong. Try again later." });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-rose-50">
      <form
        onSubmit={handleLogin}
        autoComplete="off"
        noValidate
        className="flex flex-col gap-4 w-full max-w-sm bg-white p-6 rounded-xl shadow"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        * Email field *
        <div className="flex flex-col gap-1">
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            className="border p-2 rounded-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        * Password field *
        <div className="flex flex-col gap-1">
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            className="border p-2 rounded-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-pink-400 to-rose-500 text-white py-2 rounded-full hover:opacity-90"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
*/}

