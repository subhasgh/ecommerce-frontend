{/* import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // ✅ On app load, restore from localStorage
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing stored user:", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // ✅ Login function
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token
        setToken(data.token);
        localStorage.setItem("token", data.token);

        // Save user only if backend sends it
        if (data.user) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        // Optional: save refresh token if backend provides
        if (data.refreshToken) {
          localStorage.setItem("refreshToken", data.refreshToken);
        }

        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Server error" };
    }
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
  };

  // ✅ Authenticated fetch wrapper
  const authFetch = async (url, options = {}) => {
    const storedToken = localStorage.getItem("token");

    const headers = {
      ...(options.headers || {}),
      Authorization: storedToken ? `Bearer ${storedToken}` : "",
      "Content-Type": "application/json",
    };

    const response = await fetch(url, { ...options, headers });
    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        authFetch,
        isLoggedIn: !!token, // ✅ use token, not user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; export default AuthContext;

// Hook to easily consume AuthContext
export const useAuth = () => React.useContext(AuthContext);

*/}

// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const base = import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth";

  const loginComplete = async () => {
    try {
      const res = await axios.get(`${base}/me`, { withCredentials: true });
      if (res.data?.success) {
        setUser(res.data.user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch {
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    loginComplete();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, loginComplete }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


// ✅ Added default export so you can use `import AuthContext, { useAuth } ...`
export default AuthContext;