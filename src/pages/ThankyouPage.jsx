import React from 'react';
import Header from '../components/Header';

const ThankyouPage = () => {
  return (
     <>
       <Header />
          <div className="min-h-screen max-w-4xl mx-auto p-6 flex flex-col items-center justify-center bg-white p-6">
             <h1 className="text-4xl font-bold text-green-700 mb-4">Thank You!!</h1>
             <p className="text-lg text-gray-700 mb-6">
                Your order has been placed successfully. We will notify you when its shipped
             </p>
             <a href="/products" className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700">
                Continue Shopping
             </a>
          </div>
     </>
   );
};

export default ThankyouPage;  
