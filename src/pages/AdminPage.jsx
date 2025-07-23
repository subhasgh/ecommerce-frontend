import React from 'react';
import Header from '../components/Header';

const AdminPage = () => {
  return (
    <>
      <Header />
        <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-4xl font-bold text-center text-pink-700 mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <div className="bg-white p-6 shadow rounded-lg text-center">
                 <h2 className="text-xl font-semibold mb-2">Manage Products</h2>
                    <button className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">Go</button>
               </div>
               <div className="bg-white p-6 shadow rounded-lg text-center">
               <h2 className="text-xl font-semibold mb-2">View Orders</h2>
               <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-pink-700">Go</button>
               </div>
               <div className="bg-white p-6 shadow rounded-lg text-center">
               <h2 className="text-xl font-semibold mb-2">Customer Support</h2>
               <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-pink-700">Go</button>
               </div>
            </div>
        </div>
     </>
   );
};
 

export default AdminPage;

