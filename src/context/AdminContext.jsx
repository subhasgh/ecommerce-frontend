
// src/context/AdminContext.jsx
import React, { createContext, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminData, setAdminData] = useState(null);

  return (
    <AdminContext.Provider
      value={{ isAdminLoggedIn, setIsAdminLoggedIn, adminData, setAdminData }}
    >
      {children}
    </AdminContext.Provider>
  );
};
