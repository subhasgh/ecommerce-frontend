import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext.jsx";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";
import { CreditCard, Landmark, Smartphone, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, MapPin, Building, Globe, Truck } from "lucide-react";


const CheckoutPage = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const [showSuccess, setShowSuccess] = useState(false);
  // const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postal: "",
    country: "",
  });
 

  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("card");

  const options = [
    { id: "card", label: "Card", icon: CreditCard },
    { id: "upi", label: "UPI", icon: Smartphone },
    { id: "netbanking", label: "Net Banking", icon: Landmark },
  ];

  // Calculate totals with GST & Making charges
  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const gst = (item.gst_rate || 0) / 100;
    const making = (item.making_rate || 0) / 100;
    const qty = item.quantity || 1;
    return sum + (price + price * gst + price * making) * qty;
  }, 0);

  const shippingBase = total > 500 ? 0 : 20;
  const shipping = delivery === "express" ? shippingBase + 40 : shippingBase;

  // const handleApplyCoupon = () => {
  //   if (coupon.toLowerCase() === "save10") {
  //     setDiscount(total * 0.1);
  //   } else {
  //     setDiscount(0);
  //     alert("Invalid coupon code");
  //   }
  // };

  const grandTotal = total + shipping - discount;

  const handlePlaceOrder = async () => {
    if (!formData.name || !formData.email || !formData.address) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const userId = "5c607a3d-a9e5-4c4b-bacc-132c96e4e2cd"; // example user
      const orderData = {
        userId,
        cartItems: cartItems.map((item) => ({
          product_id: item.id,
          price: parseFloat(item.price),
          quantity: item.quantity || 1,
        })),
        paymentMethod: payment,
      };
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (!res.ok) throw new Error("Failed to place order");

      const data = await res.json();
      const orderId = data.orderId;

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate(`/order-confirmation/${orderId}`);
      }, 2000);
    } catch (error) {
      console.error("❌ Error placing order:", error);
      alert("Something went wrong while placing the order.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step indicator
  const StepIndicator = () => (
    <div className="flex justify-center items-center mb-8">
      {[1, 2].map((num) => (
        <div key={num} className="flex items-center">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all duration-300 shadow-md ${
              step >= num
                ? "bg-pink-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {num}
          </div>
          {num < 2 && (
            <div
              className={`w-12 h-1 mx-2 transition-colors ${
                step > num ? "bg-pink-600" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Header />

      {/* Success Toast */}
      <AnimatePresence>
       
        {showSuccess && (
        <div className="fixed top-5 right-5 z-50 animate-slide-in bg-green-100 border border-green-300 text-green-800 rounded-lg shadow-lg w-72">
          <div className="flex items-center gap-2 px-4 py-3">
            ✅ <span className="font-medium">Order placed successfully!</span>
          </div>
        </div>
      )}
      </AnimatePresence>

      <div className="min-h-screen py-12 px-6 bg-gradient-to-br from-pink-100 via-rose-50 to-yellow-100">
        <h1 className="text-4xl font-serif font-bold mb-6 text-center text-pink-900">
          Checkout
        </h1>

        <StepIndicator />

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">
            Your cart is empty. Please add items before checking out.
          </p>
        ) : (
          <div className="max-w-6xl mx-auto flex flex-col gap-10">
            {/* STEP 1: Order Summary */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-pink-100 max-w-xl mx-auto w-full hover:shadow-2xl transition"
              >
                <h2 className="text-2xl font-serif text-pink-900 mb-4">
                  Your Order
                </h2>

                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  {cartItems.map((item, index) => {
                    const qty = item.quantity || 1;
                    const price = parseFloat(item.price) || 0;
                    const gstAmount = price * ((item.gst_rate || 0) / 100);
                    const makingAmount = price * ((item.making_rate || 0) / 100);
                    const subtotal = (price + gstAmount + makingAmount) * qty;

                    return (
                      <div
                        key={index}
                        className="border-b border-pink-200 pb-2 flex flex-col gap-1 hover:bg-pink-50/40 rounded-lg p-2 transition"
                      >
                        <div className="flex justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-14 h-14 object-cover rounded-lg shadow-md"
                            />
                            <span>{item.name} × {qty}</span>
                          </div>
                          <span className="font-medium text-pink-900">
                            ${subtotal.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 ml-2">
                          <span>Price:</span>
                          <span>${price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 ml-2">
                          <span>GST ({item.gst_rate || 0}%):</span>
                          <span>${gstAmount.toFixed(2)}</span>
                        </div>
                        {item.making_rate ? (
                          <div className="flex justify-between text-sm text-gray-600 ml-2">
                            <span>Making Charges ({item.making_rate}%):</span>
                            <span>${makingAmount.toFixed(2)}</span>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>

                {/* Totals */}
                <div className="mt-6 space-y-1 text-gray-800">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping:</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount:</span>
                      <span>- ${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold text-pink-900 mt-2">
                    <span>Total:</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Coupon Input */}
                {/* <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="flex-1 border rounded-xl px-4 py-2 bg-white/70 focus:ring-2 focus:ring-pink-400 outline-none"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition"
                  >
                    Apply
                  </button>
                </div> */}

                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => setStep(2)}
                    className="w-48 mt-6 bg-gradient-to-r from-pink-500 to-rose-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    Next <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            

                {/* step 2 new */}
                {step === 2 && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-pink-100 space-y-8 max-w-2xl mx-auto w-full hover:shadow-2xl transition"
  >
    {/* Personal Info */}
    <div>
      <h2 className="text-xl font-semibold text-pink-900 mb-3 flex items-center gap-2">
        🧍 Personal Info
      </h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500 w-5 h-5" />
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            autoComplete="new-password"
            className="w-full pl-10 border rounded-xl px-4 py-3 bg-white/70 focus:ring-2 focus:ring-pink-400 outline-none"
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500 w-5 h-5" />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            autoComplete="new-password"
            className="w-full pl-10 border rounded-xl px-4 py-3 bg-white/70 focus:ring-2 focus:ring-pink-400 outline-none"
          />
        </div>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500 w-5 h-5" />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            autoComplete="new-password"
            className="w-full pl-10 border rounded-xl px-4 py-3 bg-white/70 focus:ring-2 focus:ring-pink-400 outline-none"
          />
        </div>
      </div>
    </div>

    {/* Address Info */}
    <div>
      <h2 className="text-xl font-semibold text-pink-900 mb-3 flex items-center gap-2">
        📍 Address Info
      </h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500 w-5 h-5" />
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Street Address"
            autoComplete="new-password"
            className="w-full pl-10 border rounded-xl px-4 py-3 bg-white/70 focus:ring-2 focus:ring-pink-400 outline-none"
          />
        </div>
        <div className="flex gap-3">
          <div className="relative w-1/2">
            <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500 w-5 h-5" />
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              autoComplete="new-password"
              className="w-full pl-10 border rounded-xl px-4 py-3 bg-white/70 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>
          <div className="relative w-1/2">
            <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500 w-5 h-5" />
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              autoComplete="new-password"
              className="w-full pl-10 border rounded-xl px-4 py-3 bg-white/70 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="relative w-1/2">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500 w-5 h-5" />
            <input
              name="postal"
              value={formData.postal}
              onChange={handleChange}
              placeholder="Postal Code"
              autoComplete="new-password"
              className="w-full pl-10 border rounded-xl px-4 py-3 bg-white/70 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>
          <div className="relative w-1/2">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500 w-5 h-5" />
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              autoComplete="new-password"
              className="w-full pl-10 border rounded-xl px-4 py-3 bg-white/70 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>
        </div>
      </div>
    </div>

    {/* Delivery Method */}
    <div>
      <h2 className="text-xl font-semibold text-pink-900 mb-3">🚚 Delivery Method</h2>
      <div className="space-y-3">
        <motion.div
          whileTap={{ scale: 0.97 }}
          onClick={() => setDelivery("standard")}
          className={`cursor-pointer p-4 rounded-xl border flex items-center gap-3 transition ${
            delivery === "standard"
              ? "border-pink-500 bg-pink-50 shadow-md"
              : "border-gray-300 bg-white"
          }`}
        >
          <span className="text-2xl">🚚</span>
          <span className="font-medium">Standard (3-5 days) - ${shippingBase.toFixed(2)}</span>
        </motion.div>

        <motion.div
          whileTap={{ scale: 0.97 }}
          onClick={() => setDelivery("express")}
          className={`cursor-pointer p-4 rounded-xl border flex items-center gap-3 transition ${
            delivery === "express"
              ? "border-pink-500 bg-pink-50 shadow-md"
              : "border-gray-300 bg-white"
          }`}
        >
          <span className="text-2xl">⚡</span>
          <span className="font-medium">Express (1-2 days) - ${(shippingBase + 40).toFixed(2)}</span>
        </motion.div>
      </div>
    </div>

              
               
                {/* payment */}
                
                <h2 className="text-2xl font-serif text-pink-900 mt-6">Payment Method</h2>
                <div className="space-y-4">
                  {options.map(({ id, label, icon: Icon }) => (
                    <motion.div key={id} onClick={() => setPayment(id)} whileTap={{ scale: 0.95 }} animate={{ backgroundColor: payment === id ? "#fdf2f8" : "#ffffff", borderColor: payment === id ? "#ec4899" : "#e5e7eb" }} transition={{ duration: 0.2 }} className="cursor-pointer flex items-center gap-4 p-4 border rounded-2xl shadow-sm transition">
                      <Icon className={`w-8 h-8 ${payment === id ? "text-pink-600" : "text-gray-500"}`} />
                      <span className={`mt-2 text-sm font-medium ${payment === id ? "text-pink-900" : "text-gray-700"}`}>{label}</span>
                    </motion.div>
                  ))}

                  {payment === "card" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-4 space-y-2">
                      <input type="text" placeholder="Card Number" className="w-full border px-3 py-2 rounded"/>
                      <div className="flex gap-2">
                        <input type="text" placeholder="MM/YY" className="w-1/2 border px-3 py-2 rounded"/>
                        <input type="text" placeholder="CVV" className="w-1/2 border px-3 py-2 rounded"/>
                      </div>
                    </motion.div>
                  )}

                  {payment === "upi" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-4 space-y-2">
                      <input type="text" placeholder="Enter UPI ID (e.g. name@upi)" className="w-full border px-3 py-2 rounded"/>
                    </motion.div>
                  )}

                  {payment === "netbanking" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-4 space-y-2">
                      <select className="w-full border px-3 py-2 rounded">
                        <option>Select Bank</option>
                        <option>SBI</option>
                        <option>HDFC</option>
                        <option>ICICI</option>
                        <option>Axis</option>
                        <option>Other</option>
                      </select>
                    </motion.div>
                  )}
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <button onClick={() => setStep(1)} className="flex items-center text-pink-700 hover:text-pink-900 font-medium">
                    ← Back
                  </button>
                  <button onClick={handlePlaceOrder} className="w-48 bg-gradient-to-r from-pink-500 to-rose-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-xl transition-all">
                    Place Order
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default CheckoutPage;

