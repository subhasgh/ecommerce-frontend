import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
{/* import { UserContext } from '../context/UserContext'; */}  
import { useNavigate } from 'react-router-dom';        
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header.jsx';
import { HiTrash } from 'react-icons/hi2'; 


const CartPage = () => {
  const { cartItems, removeFromCart, updateItemQuantity } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);      // Use user login state
  console.log("isLoggedIn:", isLoggedIn);
  const navigate = useNavigate();                    

useEffect(() => {
  console.log("cartpage - isLoggedIn:", isLoggedIn); }, [isLoggedIn]);

  const handleProceed = () => {
   console.log("Proceed clicked. Logged in:", isLoggedIn);
    if (!isLoggedIn) {
      alert("Please log in to continue.");
      navigate('/login', {state: {from: '/checkout' }}); // Redirect to login page
    } else {
      navigate('/checkout');
    }
  };

  const total = cartItems.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[$,]/g, '')) || 0;
    return sum + price * (item.quantity || 1)
  
  }, 0);

  return (
    <>
      <Header />
      <div className="min-h-screen p-6" style={{backgroundColor:'#fef6e4'}}>
        <h1 className="text-3xl font-bold mb-6 text-center text-pink-800">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {cartItems.map((item, index) => {
                const price = parseInt(item.price.replace(/[$,]/g, '')) || 0;
                const qty = item.quantity || 1;
                return (

                  <div key={index} className="bg-white shadow-md rounded-lg p-4 text-center">
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded mb-2" />
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-pink-700">${price}</p>
                      <div className="flex flex-col justify-center items-center mt-3">
                        <div className='flex items-center space-x-2'>
          <button
            onClick={() => updateItemQuantity(item.id, qty - 1)}
            className="bg-gray-200 px-2 py-1 rounded"
          >
            −
          </button>
          <span>{qty}</span>
          <button
            onClick={() => updateItemQuantity(item.id, qty + 1)}
            className="bg-gray-200 px-2 py-1 rounded"
          >
            +
          </button>
        </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="mt-2 text-red-500 text-sm flex items-center space-x-1  "
          >
            {/* <span >🗑️</span> */}
            <HiTrash className='w-4 h-4 text-black'/>
            <span className='hover:underline'>Remove</span>
            
          </button>
                    </div>
                  </div>
                  </div>
                );
              })}
            </div>

            {/*  Total and Proceed to Buy */}
            <div className="mt-6 text-right">
              <p className="text-lg font-bold text-pink-800">Total: ${total.toLocaleString()}</p>
              <button
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                onClick={handleProceed}
              >
                Proceed to Buy
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
