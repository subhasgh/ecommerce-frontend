import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { HiTrash } from "react-icons/hi2";
import Header from "../components/Header";
import { motion } from "framer-motion";

const CartPage = () => {
  const { cartItems, removeFromCart, updateItemQuantity } =
    useContext(CartContext);
  const { isLoggedIn, authFetch } = useContext(AuthContext);
  const navigate = useNavigate();

  // Proceed button handler
  const handleProceed = async () => {
    if (!isLoggedIn) {
      alert("Please log in to continue.");
      navigate("/login", { state: { from: "/checkout" } });
    } else {
      // ✅ Optional: Verify session with backend before checkout
      try {
        const res = await authFetch("http://localhost:5000/auth/verify", {
          method: "GET",
        });

        if (res.status === 401) {
          alert("Session expired, please log in again.");
          navigate("/login", { state: { from: "/checkout" } });
        } else {
          navigate("/checkout");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        alert("Something went wrong. Please log in again.");
        navigate("/login", { state: { from: "/checkout" } });
      }
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen p-6 bg-gradient-to-br from-pink-50 to-pink-100">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-pink-900 tracking-tight">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-600 mt-20">
            <p className="text-lg">🛒 Your cart is empty</p>
            <button
              onClick={() => navigate("/products")}
              className="mt-4 bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cartItems.map((item, index) => {
                const price = parseInt(item.price.replace(/[$,]/g, "")) || 0;
                const qty = item.quantity || 1;

                return (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl p-4 transition relative"
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Product Image */}
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-52 object-cover rounded-lg"
                      />
                      <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs px-2 py-1 rounded-full shadow">
                        Bestseller
                      </span>
                    </div>

                    {/* Product Details */}
                    <div className="mt-3">
                      <h2 className="text-lg font-semibold text-gray-800 truncate">
                        {item.name}
                      </h2>
                      <p className="text-pink-700 font-bold mt-1">${price}</p>
                      <p className="text-gray-500 text-sm">
                        Free returns • In stock
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3 mt-3">
                        <button
                          onClick={() =>
                            updateItemQuantity(item.id, qty > 1 ? qty - 1 : 1)
                          }
                          className="bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300"
                        >
                          −
                        </button>
                        <span className="px-2 font-medium">{qty}</span>
                        <button
                          onClick={() =>
                            updateItemQuantity(item.id, qty + 1)
                          }
                          className="bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove / Wishlist */}
                      <div className="flex justify-between items-center mt-4">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center text-red-500 hover:text-red-700 text-sm"
                        >
                          <HiTrash className="mr-1" /> Remove
                        </button>
                        <button className="text-pink-600 hover:underline text-sm">
                          ❤️ Save for Later
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Action Bar */}
            <div className="mt-10 flex justify-between items-center bg-white shadow-inner rounded-xl p-4 sticky bottom-0">
              <span className="text-lg font-semibold text-gray-700">
                {cartItems.length} item(s) in cart
              </span>
              <button
                onClick={handleProceed}
                className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
              >
                Proceed to Checkout →
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
