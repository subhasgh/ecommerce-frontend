

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';
import Header from '../components/Header.jsx';

import ha1 from "../assets/ha1.jpeg";
import ha2 from "../assets/ha2.jpeg";
import ha3 from "../assets/ha3.jpeg";
import ne1 from "../assets/ne1.jpeg";
import ne2 from "../assets/ne2.jpeg";
import ne3 from "../assets/ne3.jpeg";

const ProductListPage = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const addToCart = (product) => {
    if (!isLoggedIn) {
      alert("Please login to add items to your cart");
      navigate('/login', { state: { from: '/products' } });
      return;
    }
    setCartItems([...cartItems, product]);
  };

  const testproducts = [
    {
      id: 1,
      name: 'Small piece, Big charm',
      price: '$2000',
      weight: '25g',
      material: '22K Gold',
     // description: 'Intricately designed to grace your neckline with unmatched elegance.',
      image: ne1,
    },
    {
      id: 2,
      name: 'Sparkle with every turn',
      price: '$50',
      weight: '5g',
      material: 'Sterling Silver',
      //description: 'Minimalist charm that shines with every movement.',
      image: ha1,
    },
    {
      id: 3,
      name: 'Beauty in every circle',
      price: '$100',
      weight: '3g',
      material: '18K Gold with Diamonds',
     // description: 'A sparkling promise of love and luxury.',
      image: ha2,
    },
 {
      id: 4,
      name: 'Intricately designed to grace your neckline with unmatched elegance.',
      price: '$2000',
      weight: '25g',
      material: '22K Gold',
     // description: 'Intricately designed to grace your neckline with unmatched elegance.',
      image: ne2,
    },
    {
      id: 5,
      name: 'Royal Elegance',
      price: '$50',
      weight: '5g',
      material: 'Sterling Silver',
     // description: 'Minimalist charm that shines with every movement.',
      image: ne3,
    },
 {
      id: 6,
      name: 'Minimalist charm that shines with every movement',
      price: '$50',
      weight: '5g',
      material: 'Sterling Silver',
      //description: 'Minimalist charm that shines with every movement.',
      image: ha3,
    },

  ];

  return (
    <>
      <Header />

      {/* Scrolling Banner under Header */}
      <div className="overflow-hidden bg-gradient-to-r from-amber-50 via-pink-50 to-amber-50 py-3 border-y border-amber-200 shadow-inner">
        <div className="whitespace-nowrap animate-scroll font-[cursive] text-lg text-rose-700 font-semibold tracking-wide drop-shadow-md">
          ✨ Discover Timeless Elegance • Crafted for Precious Moments • Luxury You Deserve ✨
        </div>
      </div>

{/*      <div className="min-h-screen p-8 bg-gradient-to-br from-yellow-50 to-pink-50">
        <h2 className="text-4xl md:text-5xl font-[cursive] font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-fuchsia-500 to-amber-500 drop-shadow-lg">
          Crafted to Make You Feel Precious
        </h2>
*/}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16">
          {testproducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg mb-4" />
              
              <h2 className="text-sm text-green-800">{product.name}</h2>
              <p className="text-sm italic text-gray-500">{product.material} • {product.weight}</p>
              <p className="text-pink-700 font-bold text-xl">{product.price}</p>
             {/* <p className="text-gray-600 text-center text-sm mt-2">{product.description}</p> */}

             {/*  <button 
                onClick={() => addToCart(product)}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-[#4B1E00] font-bold rounded-full shadow-[0_4px_15px_rgba(255,200,0,0.5)] hover:scale-105 hover:shadow-[0_6px_20px_rgba(255,215,0,0.7)] transition-all"
              >
                Add to Cart
              </button> */}

<button onClick={() => addToCart(product)}  className="bg-gradient-to-r from-yellow-500 to-orange-500
 font-semibold text-[#480E1E] text-center px-4 py-2 rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
  Add to Cart
</button> 

            </motion.div>
          ))}
        </div>


      {/* CSS for scrolling */}
      <style>
        {`
          @keyframes scrollText {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-scroll {
            display: inline-block;
            animation: scrollText 20s linear infinite;
          }
        `}
      </style>
    </>
  );
};

export default ProductListPage;





{/*  import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import Header from '../components/Header.jsx';

import ha1 from "../assets/ha1.jpeg";
import ha2 from "../assets/ha2.jpeg";
import ha3 from "../assets/ha3.jpeg";
import ne1 from "../assets/ne1.jpeg";
import ne2 from "../assets/ne2.jpeg";
import ne3 from "../assets/ne3.jpeg";

const image = [ ha1, ha2, ha3, ne1, ne2, ne3 ]

   const ProductListPage = () => {
   const { cartItems, setCartItems } = useContext(CartContext);
   const { isLoggedIn } = useContext(AuthContext);
   const navigate = useNavigate();
   const addToCart = (product) => {
         if (!isLoggedIn) {
         alert("Please login to add items to your cart");
         navigate('/login', { state: { from: '/products' } });  
         return;
           } 
         setCartItems([...cartItems, product]);
};

const testproducts = [
  
  {
    id: 1,
    name: 'Gold Necklace',
    price: '$2000',
     image: 'https://via.placeholder.com/300x200?text=Necklace', 
  },
  {
    id: 2,
    name:  'Silver Earrings',
    price: '$50',
    image: 'https://via.placeholder.com/300x200?text=Earringse',
  },
  {
    id: 3,
    name: 'Ring',
    price: '$100',
    image: 'https://via.placeholder.com/300x200?text=Ring',
  },
  {
    id: 4,
    name: 'Bracelet',
    price: '$100',
    image: 'https://via.placeholder.com/300x200?text=Bracelet',
  },
  {
    id: 5,
    name: 'Chain',
    price: '$1200',
    image: 'https://via.placeholder.com/300x200?text=Chain',
  },
  {
    id: 6,
    name: 'Haram',
    price: '$6000',
    image: 'https://via.placeholder.com/300x200?text=Haram',
  },
];

  return (
   <>  
      <Header />      
  
     <div className="min-h-screen p-8 bg-gradient-to-br from-yellow-50 to-pink-50 ">
              
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[cursive] font-semibold text-center
 text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-fuchsia-500 to-amber-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] animate-fadeIn">
  Crafted to Make You Feel Precious
</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-20">
               {testproducts.map((product) => ( 
                  <div key={product.id} className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center 
                       hover:shadow-2xl transition-all duration-300">
                     <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />
                         <h2 className="text-sm font-semibold text-gray-800 mb-2">{product.name}</h2>
                           <p className="text-lg text-pink-700 font-medium">{product.price}</p>
                             <button onClick={() => addToCart(product)}  className="bg-gradient-to-r from-yellow-500 to-orange-500
 font-semibold text-[#480E1E] text-center px-4 py-2 rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
  Add to Cart
</button> 


star <button onClick={() => addToCart(product)} className="bg-gradient-to-r from-yellow-500 to-orange-500 text-[#480E1E]  font-medium px-4 py-2
 rounded-md shadow-[0_4px_10px_rgba(255,140,0,0.5)] hover:brightness-110 transition">
  Add to Cart
</button> star
                  </div>
                ))}
            </div>
      </div>
    </>
        );
};

export default ProductListPage;               
*/}
