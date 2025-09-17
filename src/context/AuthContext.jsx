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


// src/context/AuthContext.jsx
/* import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // call /api/auth/me to verify cookie on app load
  useEffect(() => {
    const init = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/auth/me`, {
          withCredentials: true,
        });
        if (res.data?.success) {
          setIsLoggedIn(true);
          setUser(res.data.user);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (err) {
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setIsInitialized(true);
      }
    };
    init();
  }, []);

  // After login request succeeds, server sets cookie; we still call /me to get user
  const loginComplete = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/auth/me`, {
        withCredentials: true,
      });
      if (res.data?.success) {
        setIsLoggedIn(true);
        setUser(res.data.user);
      }
    } catch (err) {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/auth/logout`, {}, { withCredentials: true });
    } catch (err) {
      // ignore
    } finally {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isInitialized, isLoggedIn, user, loginComplete, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
*/



