import React from 'react';

const PromoBanner = () => {
  return (
    <div className="bg-black text-white px-8 py-12 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-t-full opacity-20 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
           <div className="b-10 md:mb-0">
              <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-yellow-500 to-yellow-300 flex items-center justify-center shadow-lg">
                 <img src="https://via.placeholder.com/150x150.png?text=Heart+Ring" alt="Promo Jewelry" className="w-40 h-40 object-cover rounded-full" />
              </div>
           </div>

           <div className="text-center md:text-left max-w-xl">
               <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">Luxury Jwelry</h2>
               <p className="text-xl text-white mb-4">40% off your entire order</p>
                <p className="text-sm text-gray-300 mb-6">
                   Discover timeless pieces crafted with elegance and care. Dont miss this golden oppurtunity!!</p>
                 <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-full font-semibold shadow-lg transition duration-300">
                   Order Now 
                 </button>
           </div>
           <div className="absolute bottom-4 left-8 flex items-center space-x-6 text-sm text-gray-300">
           <span> 123 Anywherest., Any city</span>
           <div className="flex space-x-3 text-lg">
             <i className="fab fa-whatsapp"></i>
             <i className="fas fa-globe"></i>
           </div>
           </div>
</div>
</div>

);
};
export default PromoBanner;


             
