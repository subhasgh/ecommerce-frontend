import React from 'react';

const HeroBanner = () => {
   return (
     <div className="bg-black text-white px-8 py-16 relative overfolw-hidden">
        <div className="max-w-6xl mx-auto flex flwx-col md:flex-row items-center justify-between space-y-10 md:space-y-0">
          <div className="md:w-1/2">
             <h1 className="text-4xl c md:text-5xl font-extrabold text-yellow-400 mb-4">40% off your entire order</h1>
               <p className="text-sm text-gray-300 mb-6">
                   Lorem ipsum doler
               </p>
               <button className="bg-yellow-400 text-black px-6 py-3 rounded hover:bg-yellow-300 transition">
                Order Now
               </button>
          </div>
          <div className="md:w-1/2 flex justify-center">
             <img src="https://i.imgur.com/n5fhhzN.png" alt="Jewelry" className="w-80 h-80 object-contain" />
          </div>
      </div>
          <div className="absolute bottom-4 left-8 text-sm text-yellow-400">
             <p><span className="mr-2">flower pic </span>123 Aywhere st., Any City</p>
          </div>
   </div>
);
};

export default HeroBanner;
