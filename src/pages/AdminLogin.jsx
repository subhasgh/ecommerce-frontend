import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = () => {
    if (adminUsername === 'admin' && adminPassword === 'admin123') {
       alert('Admin login successful');
       navigate('/admindashboard');
        }
       else
        {
        alert('Invalid credentials');
        }
     };
  return (
     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-pink-700">Admin Login</h1>
           <div className="bg-white p-6 rounded shadow-md w-96">
             <input type="text" placeholder="AdminUsername" value={adminUsername} onChange={(e) => setAdminUsername(e.target.value)} 
               className="w-full mb-4 px-4 py-2 border-rounded" />
             <input type="password" placeholder="Password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)}      
               className="w-full mb-4 px-4 py-2 border-rounded" />
             <button onClick={handleLogin} className="w-full bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">Login</button>
           </div>
    </div>
  );
};

export default AdminLogin; 
  
