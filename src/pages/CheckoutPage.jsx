import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import Header from '../components/Header.jsx';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => 
{
  const { cartItems } = useContext(CartContext);
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
              {/* optional gstin input */}
                {/* <div className="mt-6 text-right">
                <label htmlFor="gstin" className="block text-sm font-medium text-gray-700 mb-1">GSTIN (optional)</label>
                <input
                  type="text"
                  id="gstin"
                  name="gstin"
                  placeholder="Enter GSTIN for invoice"
                  className="border rounded px-3 py-2 text-sm w-64"
                />
              </div> */}
  {/* total price */}
  {/* <div className="text-right mt-6 text-xl font-bold text-pink-800">
    Total: ${total.toLocaleString()}
  </div> */}

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
                    {/* <ul> {cartItems.map((item, index) => (  
                      <li key={index} className="mb-4 border-b pb-4 flex items-center justify-between">
                        <div>
                           <h2 className="text-xl font-semibold">{item.name}</h2>
                           <p className="text-base text-gray-500">{item.price}</p>
                        </div>
                           <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      </li>
                     ))}
                   </ul> */}
              {/* <div className="mt-6 text-right text-xl font-bold text-pink-800">
                 Total: ${total.toLocaleString()}
              </div>
              <div className="mt-4 text-right">
                 <button onClick={handlePlaceOrder} className="bg-green-600  text-white px-6 py-2 rounded hover:bg-green-700">
                   Place Order
                 </button>                
              </div> */}
                  </div>
              )}
          </div>
     </>
   );
};

export default CheckoutPage;

