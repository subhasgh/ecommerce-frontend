

{/* import React, { useContext } from "react";
import Header from "../components/Header";
import { UserContext } from "../context/UserContext"; // 👈 Assuming you already have this

const AdminPage = () => {
  const { user } = useContext(UserContext); // user = { name, role, email, etc. }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 p-8">
        {/* ✅ Welcome message 
        <h1 className="text-4xl m-6 font-bold text-center text-pink-700 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-center m-6 text-gray-600 mb-8">
          Welcome {user?.name || "Admin"} 👋
        </p>

        {/* ✅ Dashboard Cards 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 m-8 shadow rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-2">Manage Products</h2>
            <button className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">
              Go
            </button>
          </div>

          <div className="bg-white p-6 m-8 shadow rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-2">View Orders</h2>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Go
            </button>
          </div>

          <div className="bg-white p-6 m-8 shadow rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-2">Customer Support</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Go
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;

*/}

// src/pages/AdminPage.jsx correct code snippet for admin page for postman
 import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext.jsx";

const AdminPage = () => {
  const { isAdminLoggedIn, adminData } = useContext(AdminContext);
  const navigate = useNavigate();

  // ✅ Protect route
  {/*useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [isAdminLoggedIn, navigate]);
*/}

useEffect(() => {
  const checkAdmin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/dashboard", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        console.log("✅ Admin verified:", data);
      } else {
        navigate("/admin/login");
      }
    } catch (err) {
      navigate("/admin/login");
    }
  };

  checkAdmin();
}, [navigate]);


  return (
    <div className="p-6">
      {/* ✅ Welcome (uses your adminData if available) */}
      <h1 className="text-2xl font-bold mb-6">
        Welcome, {adminData?.name || "Admin"} 🎉 
        
      </h1>

      {/* ✅ Keep your same UI here, just replace with these cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="p-6 bg-white rounded-2xl shadow hover:shadow-lg cursor-pointer"
          onClick={() => navigate("/admin/products")}
        >
          <h2 className="text-lg font-semibold">Manage Products</h2>
          <p className="text-gray-600 mt-2">Add, update, or remove products.</p>
        </div>

        <div
          className="p-6 bg-white rounded-2xl shadow hover:shadow-lg cursor-pointer"
          onClick={() => navigate("/admin/orders")}
        >
          <h2 className="text-lg font-semibold">View Orders</h2>
          <p className="text-gray-600 mt-2">Track and manage customer orders.</p>
        </div>

        <div
          className="p-6 bg-white rounded-2xl shadow hover:shadow-lg cursor-pointer"
          onClick={() => navigate("/admin/support")}
        >
          <h2 className="text-lg font-semibold">Customer Support</h2>
          <p className="text-gray-600 mt-2">Handle customer queries.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;  


