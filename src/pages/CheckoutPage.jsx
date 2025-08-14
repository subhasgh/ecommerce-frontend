import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import Header from '../components/Header.jsx';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => 
{
  const { cartItems } = useContext(CartContext);
  const [showSuccess, setShowSuccess] = useState(false)
  const navigate = useNavigate();
// calculate subtotal
 const total = cartItems.reduce((sum, item) => 
     {
        
        const price = parseInt((item.price || "0").replace(/[$,]/g, '')) || 0;
        const quantity = item.quantity || 1;

           return sum + (price*quantity);
     }, 0);
    //  gst calculations
     const gstRate = 0.03;
  const gstAmount = total * gstRate;
  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;
  const grandTotal = total + gstAmount;


  const handlePlaceOrder = () =>
     {
      setShowSuccess(true);
      setTimeout(()=> {
        setShowSuccess(false);
},5000)

 
}

  return (
     <>
       <Header />
       {/* alert model */}
       {showSuccess && (
        <div className="fixed top-5 right-5 z-50 animate-slide-in flex flex-col bg-green-100 border border-green-300 text-green-800 rounded-lg shadow-lg w-72 overflow-hidden">
    
    {/* Message Row */}
    <div className="flex items-center gap-2 px-4 py-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-green-600"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414L9 14.414 5.293 10.707a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      <span className="font-medium">Order placed successfully!</span>
      
    </div>

    {/* Progress Bar */}
    <div className="h-1 bg-green-300">
      <div className="h-1 bg-green-500 animate-progress"></div>
    </div>
  </div>
)}
         <div className="min-h-screen p-6" style={{backgroundColor:'#fef6e4'}}>
         <h1 className="text-3xl font-bold mb-6 text-center text-pink-800">Checkout</h1>
            {cartItems.length ===0 ? (
               <p className="text-center text-gray-600">Your cart is empty. Please add items before checking out.</p>
                   ) : (
                  <div className="max-w-4xl mx-auto bg-gray-50 p-6 rounded shadow-md">
                     <div className="max-w-6xl mx-auto  p-6 rounded shadow-md overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200 border rounded">
    <thead className="bg-gray-100">
      <tr>
        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Image</th>
        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Product Name</th>
        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Price</th>
        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Quantity</th>
        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Subtotal</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-100">
      {cartItems.map((item, index) => {
        const price = parseInt(item.price.replace(/[$,]/g, '')) || 0;
        const qty = item.quantity || 1;
        const subtotal = price * qty;

        return (
          <tr key={index}>
            <td className="px-4 py-3">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
            </td>
            <td className="px-4 py-3">{item.name}</td>
            <td className="px-4 py-3">${price.toLocaleString()}</td>
            <td className="px-4 py-3">{qty}</td>
            <td className="px-4 py-3 font-semibold">${subtotal.toLocaleString()}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
  {/* gst breakdown */}
  <div className="text-right mt-6 space-y-1 text-gray-800">
                <div className="text-lg">Subtotal: ${total.toLocaleString()}</div>
                <div className="text-sm text-gray-600">CGST (9%): ${cgst.toFixed(2)}</div>
                <div className="text-sm text-gray-600">SGST (9%): ${sgst.toFixed(2)}</div>
                <div className="text-xl font-bold text-pink-800 mt-2">
                  Grand Total: ${grandTotal.toFixed(2)}
                </div>
              </div>
             
                

  {/* Place Order Button */}
  <div className="mt-4 text-right">
    <button
      onClick={handlePlaceOrder}
      className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
    >
      Place Order
    </button>
  </div>
</div>
                  </div>
              )}
          </div>
     </>
   );
};

export default CheckoutPage;

