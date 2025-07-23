import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import Header from '../components/Header.jsx';

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
         <h1 className="text-5xl md:text=5xl font-bold text-center text-pink-800 leading-snug">Step into our <span className="font-bold text-6xl text-yellow-600">Nutmeg Bijoux</span> Collection<br /> where every jewel
                 whispers timeless stories of <br /><span className="text-purple-800"> grace</span> and <span className="text-purple-800"> confidence</span></h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-20">
               {testproducts.map((product) => ( 
                  <div key={product.id} className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center hover:shadow-2xl transition-all duration-300">
                     <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />
                         <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                           <p className="text-xl text-pink-700 font-bold">{product.price}</p>
                            <button onClick={() => addToCart(product)} className="text-lg font-semibold bg-yellow-400 text-black px-6 py-2 round hover:bg-pink-600">
                                                   Add to Cart</button>
                  </div>
                ))}
            </div>
      </div>
    </>
        );
};

export default ProductListPage;               

