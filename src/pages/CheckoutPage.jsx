import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import Header from '../components/Header.jsx';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => 
{
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => 
     {
        const price = parseInt(item.price.replace(/[$,]/g, '')) || 0;
           return sum + price;
     }, 0);
  const handlePlaceOrder = () =>
     {
        alert("Order placed successfully!!");
        navigate('/thankyou');
     };
  return (
     <>
       <Header />
         <div className="min-h-screen p-6 bg-white">
         <h1 className="text-3xl font-bold mb-6 text-center text-pink-800">Checkout</h1>
            {cartItems.length ===0 ? (
               <p className="text-center text-gray-600">Your cart is empty. Please add items before checking out.</p>
                   ) : (
                  <div className="max-w-4xl mx-auto bg-gray-50 p-6 rounded shadow-md">
                    <ul> {cartItems.map((item, index) => (  
                      <li key={index} className="mb-4 border-b pb-4 flex items-center justify-between">
                        <div>
                           <h2 className="text-xl font-semibold">{item.name}</h2>
                           <p className="text-base text-gray-500">{item.price}</p>
                        </div>
                           <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      </li>
                     ))}
                   </ul>
              <div className="mt-6 text-right text-xl font-bold text-pink-800">
                 Total: ${total.toLocaleString()}
              </div>
              <div className="mt-4 text-right">
                 <button onClick={handlePlaceOrder} className="bg-green-600  text-white px-6 py-2 rounded hover:bg-green-700">
                   Place Order
                 </button>                
              </div>
                  </div>
              )}
          </div>
     </>
   );
};

export default CheckoutPage;

