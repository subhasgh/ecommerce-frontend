import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const HomePage = () => { 
    return (
      <>
        <Header />
           <div className="bg-gradient-to-br from-yellow-50 to-pink-50 min-h-screen p-6">
             <div className="text-center py-12">
               <h1 className="text-5xl font-extrabold text-pink-700 mb-4">Welcome to Nutmeg Bijoux</h1>
                 <p className="text-lg text-gray-600 mb-6">From everyday grace to grand celebrations, find your shine here!!</p>
                   <Link to="/products" className="px-6 py-2 bg-pink-700 text-white rounded hover:bg-pink-800">
                     Explore your shine here
                   </Link>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
               <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                 <img src="https://via.placeholder.com/600x300?text=His+Collection" alt="His Collection" className="w-full h-60 object-cover" />
                   <div className="p-4">
                     <h2 className="text-2xl font-semibold mb-2">His</h2>
                       <p className="text-gray-600 mb-4">Elegant and bold style for him</p>
                         <Link to="/products" className="text-pink-600 hover:underline font-medium"> Shop Now
                         </Link>
                   </div>
               </div>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src="https://via.placeholder.com/600x300?text=Her+Collection" alt="Her Collection" className="w-full h-60 object-cover" />
                   <div className="p-4">
                     <h2 className="text-2xl font-semibold mb-2">Hers</h2>
                       <p className="text-gray-600 mb-4">Graceful and timeless designs for her</p>
                         <Link to="/products" className="text-pink-600 hover:underline font-medium">Shop Now 
                         </Link>
                   </div>
               </div>
             </div>

            <div className="text-center py-8">
              <h2 className="text-3xl font-bold text-pink-700 mb-6">Today's Special Offer</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {[1,2,3].map((offer) => (
                      <div key={offer} className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition">
                        <img src={`https://via.placeholder.com/400x200?text=Offer+${offer}`} alt={`Offer ${offer}`} className="w-full h-40 object-cover
                         rounded mb-4" />
                          <h3 className="text-xl font-semibold">Special Deal {offer}</h3>
                            <p className="text-gray-600 text-sm mb-2"> Don't miss this limited time offer</p>
                              <Link to="/products" className="text-pink-600 hover:underline">Explore Products</Link>
                      </div>
                    ))}
                 </div>
             </div>
          </div>
        </>
);
};

export default HomePage;        
                                     
