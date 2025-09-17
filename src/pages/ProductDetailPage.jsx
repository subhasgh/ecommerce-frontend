



// Realtime pincode checker with all other static 
import React, { useState } from "react";
import nutmegLogo from "../assets/nutmeg-logo.png";
import { Gem, Star, ShieldCheck, RefreshCw, Heart, Bell, Share2, ShoppingCart } from "lucide-react";
import ChatBot from "../components/ChatBot.jsx"; // keep your chatbot component
import Footer from "../components/Footer.jsx";
import CheckDelivery from "../components/CheckDelivery.jsx";

const images = [
  "/images/jewel1.jpg",
  "/images/jewel2.jpg",
  "/images/jewel3.jpg",
];

const productItems = [
  {
    name: "Necklace",
    weight: 8, // grams
    goldType: "22KT",
    goldRate: 7660, // ₹/g
    stoneCost: 10000,
    makingPercent: 10,
    wastagePercent: 2,
  },
  {
    name: "Earrings",
    weight: 4,
    goldType: "22KT",
    goldRate: 7660,
    stoneCost: 5000,
    makingPercent: 8,
    wastagePercent: 1.5,
  },
  {
    name: "Ring",
    weight: 3,
    goldType: "22KT",
    goldRate: 7660,
    stoneCost: 2000,
    makingPercent: 7,
    wastagePercent: 1,
  },
];

const calculatePrice = (item) => {
  const goldValue = item.weight * item.goldRate;
  const makingCharges = (item.makingPercent / 100) * goldValue;
  const wastageCharges = (item.wastagePercent / 100) * goldValue;
  const gstGold = goldValue * 0.03; // 3% on gold
  const gstMaking = makingCharges * 0.05; // 5% on making
  const gstTotal = gstGold + gstMaking;
  const total = goldValue + makingCharges + wastageCharges + item.stoneCost + gstTotal;
  return {
    goldValue,
    makingCharges,
    wastageCharges,
    gstGold,
    gstMaking,
    gstTotal,
    total,
  };
};

const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [zoomStyle, setZoomStyle] = useState({});
  const [showZoom, setShowZoom] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [pincode, setPincode] = useState("");
  const [cartSelected, setCartSelected] = useState(false); // visual state for pill (optional)
  const [error, setError] = useState(null);
  const [deliveryMsg, setDeliveryMsg] = useState("");

  const stockQuantity = 0; // change to a dynamic value if available

  const totalInvoice = productItems
    .map((it) => calculatePrice(it).total)
    .reduce((a, b) => a + b, 0);

  // Zoom / cursor tracking logic
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomStyle({
      backgroundImage: `url(${selectedImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "220%",
      cursorX: e.pageX - left,
      cursorY: e.pageY - top,
      boxWidth: width,
      boxHeight: height,
    });
  };

  // Pincode Checker
   const checkDelivery = async () => {
    setError(null);
    setDeliveryMsg("");

    if (!pincode) {
      setError("Please enter a pincode");
      return;
    }

    if (!/^[1-9][0-9]{5}$/.test(pincode)) {
      setError("Enter a valid 6-digit Indian pincode");
      return;
    }

    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await res.json();

      if (data && data[0].Status === "Success") {
        const postOffice = data[0].PostOffice?.[0];
        setDeliveryMsg(
          `✅ Delivery available in ${postOffice?.District}, ${postOffice?.State}`
        );
      } else {
        setError("❌ Delivery not available for this pincode");
      }
    } catch (err) {
      setError("⚠️ Something went wrong. Try again later.");
    }
  };  

  const addToBag = () => {
    setCartSelected(true);
    alert("Added to cart (UI only).");
  };

  const buyNow = () => {
    alert("Proceeding to Buy Now (UI only).");
  };

  const handleWishlist = () => {
    alert("Added to wishlist ❤️");
  };

  const handleNotifyMe = () => {
    alert("You’ll be notified when back in stock 🔔");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this product!",
        text: "Take a look at this beautiful product.",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard");
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header  */}
      <header className="text-center py-6 border-b">
        <h1 className="text-4xl font-medium font-serif text-yellow-800 tracking-wide">Bijoux</h1>
        <div className="flex items-center justify-center mt-2 text-gray-600">
          <span className="text-sm">
            <img src={nutmegLogo} alt="Nutmeg Logo" className="h-5 w-40 object-contain" /> A Nutmeg Product
          </span>
        </div>

        {/* Top-right icons */}
        <div className="absolute top-60 right-20 flex space-x-3">
          <button onClick={handleWishlist} title="Add to Wishlist" disabled={stockQuantity <= 0}>
            <Heart className={`w-6 h-4 ${stockQuantity > 0 ? "text-gray-700 hover:text-red-500" : "text-gray-400"}`} />
          </button>
          <button onClick={handleNotifyMe} title="Notify Me" disabled={stockQuantity > 0}>
            <Bell className={`w-6 h-4 ${stockQuantity <= 0 ? "text-gray-700 hover:text-yellow-500" : "text-gray-400"}`} />
          </button>
          <button onClick={handleShare} title="Share">
            <Share2 className="w-6 h-4 text-gray-700 hover:text-green-600" />
          </button>
          <button onClick={() => alert("Navigate to cart")} title="Cart">
            <ShoppingCart className="w-6 h-4 text-gray-700 hover:text-blue-600" />
          </button>
        </div>
      </header>

      {/* Product section */}
      <div className="flex flex-col md:flex-row items-start px-10 py-8 gap-8">
        {/* LEFT column: thumbnails */}
        <div className="flex flex-col py-8 space-y-4">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`thumb-${idx}`}
              className={`w-20 h-20 object-cover cursor-pointer rounded-md border ${
                selectedImage === img ? "border-gray-800" : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        {/* MAIN column: image + buttons */}
        <div className="flex flex-col items-center mt-2">
          {/* Try On link */}
          <div className="w-full flex justify-center mb-1">
            <a
              href="/try-on"
              className="text-sm text-pink-600 hover:underline cursor-pointer"
            >
              Try On
            </a>
          </div>

          {/* main image */}
          <div
            className="relative w-[450px] h-[450px] border rounded-md overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setShowZoom(true)}
            onMouseLeave={() => setShowZoom(false)}
          >
            <img src={selectedImage} alt="main product" className="w-full h-full object-cover" />
            {/* Zoom overlay */}
            {showZoom && (
              <div
                className="absolute w-40 h-40 border-2 border-pink-500 rounded-full pointer-events-none bg-no-repeat"
                style={{
                  backgroundImage: zoomStyle.backgroundImage,
                  backgroundPosition: zoomStyle.backgroundPosition,
                  backgroundSize: zoomStyle.backgroundSize,
                  left: zoomStyle.cursorX - 80,
                  top: zoomStyle.cursorY - 80,
                }}
              />
            )}
          </div>

          {/* Add to Bag / Buy Now */}
          <div className="mt-4 w-full max-w-[450px]">
            <div className="rounded-full overflow-hidden shadow-sm border flex">
              <button
                onClick={addToBag}
                className={`flex-1 py-3 text-white font-medium transition ${
                  cartSelected
                    ? "bg-gradient-to-r from-pink-600 to-pink-700"
                    : "bg-gradient-to-r from-pink-500 to-pink-700"
                }`}
                style={{ borderRadius: 9999 }}
              >
                {cartSelected ? "Added ✓" : "Add to Bag"}
              </button>

              <button
                onClick={buyNow}
                className="flex-1 py-3 bg-white text-pink-600 font-medium border-l"
                style={{ borderLeft: "1px solid rgba(0,0,0,0.06)" }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT column: tabs / zoom panel */}
        <div className="flex-1 py-8">
          {showZoom ? (
            <div
              className="w-full max-w-[850px] h-[650px] border rounded-md bg-no-repeat shadow-md"
              style={{
                backgroundImage: zoomStyle.backgroundImage,
                backgroundPosition: zoomStyle.backgroundPosition,
                backgroundSize: "180%",
              }}
            />
          ) : (
            <>
              {/* Product info */}
              <div>
                <h2 className="text-xl font-medium text-pink-800 mb-2">Necklace + Earrings</h2>
                <p className="text-gray-700 text-sm mb-4">Elegant long stud hang necklace with matching earrings.</p>
                <p className="text-xl font-bold text-gray-900 mb-2">₹ {totalInvoice.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mb-4">PRODUCT Id: ZLWT22HBNAAA00</p>
              </div>

              {/* Tabs */}
              <div className="border rounded-2xl shadow-sm">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab("details")}
                    className={`flex-1 px-6 py-3 rounded-tl-2xl text-sm font-medium transition-all duration-300 ${
                      activeTab === "details"
                        ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Product Details
                  </button>
                  <button
                    onClick={() => setActiveTab("price")}
                    className={`flex-1 px-6 py-3 rounded-tr-2xl text-sm font-medium transition-all duration-300 ${
                      activeTab === "price"
                        ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Price Breakup
                  </button>
                </div>

                <div className="p-6">
                  {activeTab === "details" && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                      <ul className="text-gray-600 list-disc pl-5 space-y-1">
                        <li>Metal: 22KT Yellow Gold</li>
                        <li>Weight: 8g (Necklace), 4g (Earrings), 3g (Ring)</li>
                        <li>Stones: Diamonds / Studded</li>
                        <li>Hallmark Certified</li>
                      </ul>
                    </div>
                  )}

                  {activeTab === "price" && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Price Breakup</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-gray-700 border-collapse">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-3 py-2 border text-left">Item</th>
                              <th className="px-3 py-2 border text-center">Weight (g)</th>
                              <th className="px-3 py-2 border text-center">Rate/Gram (₹)</th>
                              <th className="px-3 py-2 border text-center">Making %</th>
                              <th className="px-3 py-2 border text-center">Wastage %</th>
                              <th className="px-3 py-2 border text-right">Gold Value (₹)</th>
                              <th className="px-3 py-2 border text-right">Making (₹)</th>
                              <th className="px-3 py-2 border text-right">GST (₹)</th>
                              <th className="px-3 py-2 border text-right">Total (₹)</th>
                            </tr>
                          </thead>

                          <tbody>
                            {productItems.map((it, i) => {
                              const c = calculatePrice(it);
                              return (
                                <tr key={i} className="even:bg-gray-50">
                                  <td className="px-3 py-2 border">{it.name}</td>
                                  <td className="px-3 py-2 border text-center">{it.weight}</td>
                                  <td className="px-3 py-2 border text-center">{it.goldRate.toLocaleString()}</td>
                                  <td className="px-3 py-2 border text-center">{it.makingPercent}%</td>
                                  <td className="px-3 py-2 border text-center">{it.wastagePercent}%</td>
                                  <td className="px-3 py-2 border text-right">{c.goldValue.toFixed(0).toLocaleString()}</td>
                                  <td className="px-3 py-2 border text-right">{c.makingCharges.toFixed(0).toLocaleString()}</td>
                                  <td className="px-3 py-2 border text-right">{c.gstTotal.toFixed(0).toLocaleString()}</td>
                                  <td className="px-3 py-2 border text-right font-semibold">{c.total.toFixed(0).toLocaleString()}</td>
                                </tr>
                              );
                            })}
                          </tbody>

                          <tfoot className="bg-gray-100 font-semibold">
                            <tr>
                              <td colSpan={8} className="px-3 py-2 border text-right">Grand Total (₹)</td>
                              <td className="px-3 py-2 border text-right">{totalInvoice.toFixed(0).toLocaleString()}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Pincode */}
              <div className="mt-6 px-6 py-4 border rounded-md shadow-sm w-full max-w-md">
                <h4 className="font-semibold text-gray-700 mb-2">Check Delivery Availability</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="border px-2 py-1 rounded-md flex-1"
                  />
                  <button onClick={checkDelivery} className="bg-pink-600 text-white px-4 py-1 rounded-md">
                    Check
                  </button>
                </div>

                {/* Error / Success Messages */}
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                {deliveryMsg && <p className="text-green-700 text-sm mt-2">{deliveryMsg}</p>}
              </div>  

              

              {/* Shipping & Return */}
              <div className="mt-6 border-t">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer py-3 text-gray-800 font-medium">
                    <span>Shipping & Return Policy</span>
                    <svg className="w-5 h-5 text-gray-600 transform group-open:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </summary>
                  <div className="pl-1 pr-2 pb-3 text-gray-600 text-sm space-y-2">
                    <p>✔ Free insured shipping across India.</p>
                    <p>✔ Easy 15-day return & exchange policy.</p>
                    <p>✔ Lifetime buyback & authenticity guarantee.</p>
                  </div>
                </details>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bijoux Promise */}
      <div className="mt-20 border-t pt-10 px-10">
        <h2 className="text-2xl font-serif text-center mb-10">The Bijoux Promise</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 text-center gap-8 text-gray-800">
          <div className="flex flex-col items-center">
            <Star className="w-8 h-8 text-yellow-500 mb-2" />
            <p>100% Hallmarked & Certified</p>
          </div>
          <div className="flex flex-col items-center">
            <Gem className="w-8 h-8 text-blue-500 mb-2" />
            <p>Conflict-free Diamonds</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-8 h-8 text-green-500 mb-2" />
            <p>Insured & Free Shipping</p>
          </div>
          <div className="flex flex-col items-center">
            <RefreshCw className="w-8 h-8 text-purple-500 mb-2" />
            <p>15-Day Return & Lifetime Buyback</p>
          </div>
        </div>
      </div>

      {/* ChatBot */}
      <div className="mt-12">
        <ChatBot />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductDetailPage;





// Complete correct static code  
{/*
import React, { useState } from "react";
import nutmegLogo from "../assets/nutmeg-logo.png";
import { Gem, Star, ShieldCheck, RefreshCw, Heart, Bell, Share2, ShoppingCart } from "lucide-react";
import ChatBot from "../components/ChatBot.jsx"; // keep your chatbot component
import Footer from "../components/Footer.jsx"; 

const images = [
  "/images/jewel1.jpg",
  "/images/jewel2.jpg",
  "/images/jewel3.jpg",
];

const productItems = [
  {
    name: "Necklace",
    weight: 8, // grams
    goldType: "22KT",
    goldRate: 7660, // ₹/g
    stoneCost: 10000,
    makingPercent: 10,
    wastagePercent: 2,
  },
  {
    name: "Earrings",
    weight: 4,
    goldType: "22KT",
    goldRate: 7660,
    stoneCost: 5000,
    makingPercent: 8,
    wastagePercent: 1.5,
  },
  {
    name: "Ring",
    weight: 3,
    goldType: "22KT",
    goldRate: 7660,
    stoneCost: 2000,
    makingPercent: 7,
    wastagePercent: 1,
  },
];

const calculatePrice = (item) => {
  const goldValue = item.weight * item.goldRate;
  const makingCharges = (item.makingPercent / 100) * goldValue;
  const wastageCharges = (item.wastagePercent / 100) * goldValue;
  const gstGold = goldValue * 0.03; // 3% on gold
  const gstMaking = makingCharges * 0.05; // 5% on making
  const gstTotal = gstGold + gstMaking;
  const total = goldValue + makingCharges + wastageCharges + item.stoneCost + gstTotal;
  return {
    goldValue,
    makingCharges,
    wastageCharges,
    gstGold,
    gstMaking,
    gstTotal,
    total,
  };
};

const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [zoomStyle, setZoomStyle] = useState({});
  const [showZoom, setShowZoom] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [pincode, setPincode] = useState("");
  const [cartSelected, setCartSelected] = useState(false); // visual state for pill (optional)

  const stockQuantity = 0; // change to a dynamic value if available

  const totalInvoice = productItems
    .map((it) => calculatePrice(it).total)
    .reduce((a, b) => a + b, 0);

  // Zoom / cursor tracking logic
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomStyle({
      backgroundImage: `url(${selectedImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "220%",
      cursorX: e.pageX - left,
      cursorY: e.pageY - top,
      boxWidth: width,
      boxHeight: height,
    });
  };

   const checkDelivery = () => {
    alert(pincode ? `Checking delivery for ${pincode}...` : "Please enter pincode");
  };

   const [error, setError] = useState(null);

    const addToBag = () => {
    setCartSelected(true);
    alert("Added to cart (UI only).");
  };

  const buyNow = () => {
    alert("Proceeding to Buy Now (UI only).");
  };

  const handleWishlist = () => {
    alert("Added to wishlist ❤️");
  };

  const handleNotifyMe = () => {
    alert("You’ll be notified when back in stock 🔔");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this product!",
        text: "Take a look at this beautiful product.",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard");
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header  
      <header className="text-center py-6 border-b">
        <h1 className="text-4xl font-medium font-serif text-yellow-800 tracking-wide">Bijoux</h1>
        <div className="flex items-center justify-center mt-2 text-gray-600">
          <span className="text-sm">
            <img src={nutmegLogo} alt="Nutmeg Logo" className="h-5 w-40 object-contain" /> A Nutmeg Product
          </span>
        </div>

        {/* Top-right icons  
        <div className="absolute top-60 right-20 flex space-x-3">
          <button onClick={handleWishlist} title="Add to Wishlist" disabled={stockQuantity <= 0}>
            <Heart className={`w-6 h-4 ${stockQuantity > 0 ? "text-gray-700 hover:text-red-500" : "text-gray-400"}`} />
          </button>
          <button onClick={handleNotifyMe} title="Notify Me" disabled={stockQuantity > 0}>
            <Bell className={`w-6 h-4 ${stockQuantity <= 0 ? "text-gray-700 hover:text-yellow-500" : "text-gray-400"}`} />
          </button>
          <button onClick={handleShare} title="Share">
            <Share2 className="w-6 h-4 text-gray-700 hover:text-green-600" />
          </button>
          <button onClick={() => alert("Navigate to cart")} title="Cart">
            <ShoppingCart className="w-6 h-4 text-gray-700 hover:text-blue-600" />
          </button>
        </div>
      </header> 

      {/* Product section  
      <div className="flex flex-col md:flex-row items-start px-10 py-8 gap-8">
        {/* LEFT column: thumbnails    
        <div className="flex flex-col py-8 space-y-4">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`thumb-${idx}`}
              className={`w-20 h-20 object-cover cursor-pointer rounded-md border ${
                selectedImage === img ? "border-gray-800" : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        {/* MAIN column: image + buttons  
        <div className="flex flex-col items-center mt-2">
          {/* Try On link 
          <div className="w-full flex justify-center mb-1">
            <a
              href="/try-on"
              className="text-sm text-pink-600 hover:underline cursor-pointer"
            >
              Try On
            </a>
          </div>

          {/* main image 
          <div
            className="relative w-[450px] h-[450px] border rounded-md overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setShowZoom(true)}
            onMouseLeave={() => setShowZoom(false)}
          >
            <img src={selectedImage} alt="main product" className="w-full h-full object-cover" />
            {/* Zoom overlay  
            {showZoom && (
              <div
                className="absolute w-40 h-40 border-2 border-pink-500 rounded-full pointer-events-none bg-no-repeat"
                style={{
                  backgroundImage: zoomStyle.backgroundImage,
                  backgroundPosition: zoomStyle.backgroundPosition,
                  backgroundSize: zoomStyle.backgroundSize,
                  left: zoomStyle.cursorX - 80,
                  top: zoomStyle.cursorY - 80,
                }}
              />
            )}
          </div>

          {/* Add to Bag / Buy Now    
          <div className="mt-4 w-full max-w-[450px]">
            <div className="rounded-full overflow-hidden shadow-sm border flex">
              <button
                onClick={addToBag}
                className={`flex-1 py-3 text-white font-medium transition ${
                  cartSelected
                    ? "bg-gradient-to-r from-pink-600 to-pink-700"
                    : "bg-gradient-to-r from-pink-500 to-pink-700"
                }`}
                style={{ borderRadius: 9999 }}
              >
                {cartSelected ? "Added ✓" : "Add to Bag"}
              </button>

              <button
                onClick={buyNow}
                className="flex-1 py-3 bg-white text-pink-600 font-medium border-l"
                style={{ borderLeft: "1px solid rgba(0,0,0,0.06)" }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT column: tabs / zoom panel   
        <div className="flex-1 py-8">
          {showZoom ? (
            <div
              className="w-full max-w-[850px] h-[650px] border rounded-md bg-no-repeat shadow-md"
              style={{
                backgroundImage: zoomStyle.backgroundImage,
                backgroundPosition: zoomStyle.backgroundPosition,
                backgroundSize: "180%",
              }}
            />
          ) : (
            <>
              {/* Product info 
              <div>
                <h2 className="text-xl font-medium text-pink-800 mb-2">Necklace + Earrings</h2>
                <p className="text-gray-700 text-sm mb-4">Elegant long stud hang necklace with matching earrings.</p>
                <p className="text-xl font-bold text-gray-900 mb-2">₹ {totalInvoice.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mb-4">PRODUCT Id: ZLWT22HBNAAA00</p>
              </div>

              {/* Tabs 
              <div className="border rounded-2xl shadow-sm">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab("details")}
                    className={`flex-1 px-6 py-3 rounded-tl-2xl text-sm font-medium transition-all duration-300 ${
                      activeTab === "details"
                        ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Product Details
                  </button>
                  <button
                    onClick={() => setActiveTab("price")}
                    className={`flex-1 px-6 py-3 rounded-tr-2xl text-sm font-medium transition-all duration-300 ${
                      activeTab === "price"
                        ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Price Breakup
                  </button>
                </div>

                <div className="p-6">
                  {activeTab === "details" && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                      <ul className="text-gray-600 list-disc pl-5 space-y-1">
                        <li>Metal: 22KT Yellow Gold</li>
                        <li>Weight: 8g (Necklace), 4g (Earrings), 3g (Ring)</li>
                        <li>Stones: Diamonds / Studded</li>
                        <li>Hallmark Certified</li>
                      </ul>
                    </div>
                  )}

                  {activeTab === "price" && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Price Breakup</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-gray-700 border-collapse">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-3 py-2 border text-left">Item</th>
                              <th className="px-3 py-2 border text-center">Weight (g)</th>
                              <th className="px-3 py-2 border text-center">Rate/Gram (₹)</th>
                              <th className="px-3 py-2 border text-center">Making %</th>
                              <th className="px-3 py-2 border text-center">Wastage %</th>
                              <th className="px-3 py-2 border text-right">Gold Value (₹)</th>
                              <th className="px-3 py-2 border text-right">Making (₹)</th>
                              <th className="px-3 py-2 border text-right">GST (₹)</th>
                              <th className="px-3 py-2 border text-right">Total (₹)</th>
                            </tr>
                          </thead>

                          <tbody>
                            {productItems.map((it, i) => {
                              const c = calculatePrice(it);
                              return (
                                <tr key={i} className="even:bg-gray-50">
                                  <td className="px-3 py-2 border">{it.name}</td>
                                  <td className="px-3 py-2 border text-center">{it.weight}</td>
                                  <td className="px-3 py-2 border text-center">{it.goldRate.toLocaleString()}</td>
                                  <td className="px-3 py-2 border text-center">{it.makingPercent}%</td>
                                  <td className="px-3 py-2 border text-center">{it.wastagePercent}%</td>
                                  <td className="px-3 py-2 border text-right">{c.goldValue.toFixed(0).toLocaleString()}</td>
                                  <td className="px-3 py-2 border text-right">{c.makingCharges.toFixed(0).toLocaleString()}</td>
                                  <td className="px-3 py-2 border text-right">{c.gstTotal.toFixed(0).toLocaleString()}</td>
                                  <td className="px-3 py-2 border text-right font-semibold">{c.total.toFixed(0).toLocaleString()}</td>
                                </tr>
                              );
                            })}
                          </tbody>

                          <tfoot className="bg-gray-100 font-semibold">
                            <tr>
                              <td colSpan={8} className="px-3 py-2 border text-right">Grand Total (₹)</td>
                              <td className="px-3 py-2 border text-right">{totalInvoice.toFixed(0).toLocaleString()}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Pincode 
              <div className="mt-6 px-6 py-4 border rounded-md shadow-sm w-full max-w-md">
                <h4 className="font-semibold text-gray-700 mb-2">Check Delivery Availability</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="border px-2 py-1 rounded-md flex-1"
                  />
                  <button onClick={checkDelivery} className="bg-pink-600 text-white px-4 py-1 rounded-md">
                    Check
                  </button>
                </div>
              </div> 

            {/* Shipping & Return   
              <div className="mt-6 border-t">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer py-3 text-gray-800 font-medium">
                    <span>Shipping & Return Policy</span>
                    <svg className="w-5 h-5 text-gray-600 transform group-open:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </summary>
                  <div className="pl-1 pr-2 pb-3 text-gray-600 text-sm space-y-2">
                    <p>✔ Free insured shipping across India.</p>
                    <p>✔ Easy 15-day return & exchange policy.</p>
                    <p>✔ Lifetime buyback & authenticity guarantee.</p>
                  </div>
                </details>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bijoux Promise 
      <div className="mt-20 border-t pt-10 px-10">
        <h2 className="text-2xl font-serif text-center mb-10">The Bijoux Promise</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 text-center gap-8 text-gray-800">
          <div className="md:border-r md:border-gray-200">
            <div className="flex justify-center mb-4"><Gem className="h-6 w-6 text-green-800" /></div>
            <p className="text-sm text-gray-600">Ethically Sourced</p>
          </div>
          <div className="md:border-r md:border-gray-200">
            <div className="flex justify-center mb-4"><ShieldCheck className="h-6 w-6 text-green-800" /></div>
            <p className="text-sm text-gray-600">Sealed Assurance</p>
          </div>
          <div className="md:border-r md:border-gray-200">
            <div className="flex justify-center mb-4"><RefreshCw className="h-6 w-6 text-green-800" /></div>
            <p className="text-sm text-gray-600">Upgrade Your Jewellery</p>
          </div>
          <div>
            <div className="md:border-r md:border-gray-200">
              <div className="flex justify-center mb-4"><Star className="h-6 w-6 text-green-800" /></div>
              <p className="text-sm text-gray-600">Expertly Designed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Bot 
      <div className="fixed bottom-4 right-4 z-50">
        <ChatBot />
      </div>
       <Footer />
    </div>
    
  );
};

export default ProductDetailPage;

*/}


// http://localhost:5000/api/products/97f82dbd-20ae-42c5-a8e3-9663cdec7bb2    can run directly in browser by giving product id and return product details

/*
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import Header from "../components/Header.jsx";
import { toast } from "react-toastify";
import {
  Heart,
  Bell,
  Share2,
  ShoppingCart,
  Gem,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import ChatBot from "../components/ChatBot.jsx";
import nutmegLogo from "../assets/nutmeg-logo.png";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useContext(AuthContext);
  const { cartItems, setCartItems } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [productItems, setProductItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomStyle, setZoomStyle] = useState({});
  const [showZoom, setShowZoom] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [pincode, setPincode] = useState("");
  const [cartSelected, setCartSelected] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/products/${id}`,
          { withCredentials: true }
        );
        const data = res.data.data || res.data.product;
        if (!data) throw new Error("Product not found");

        setProduct(data);
        if (data.images && data.images.length > 0)
          setSelectedImage(data.images[0]);

        if (data.items && data.items.length > 0) {
          setProductItems(data.items);
        } else {
          setProductItems([data]);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          toast.info("Please login to continue");
          navigate("/login", { state: { from: location.pathname } });
        } else {
          console.error("Error fetching product:", err.message);
          toast.error("Failed to load product");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate, location]);

  const requireLogin = () => {
    if (!isLoggedIn) {
      toast.info("Please login to continue");
      navigate("/login", { state: { from: `/product/${id}` } });
      return false;
    }
    return true;
  };

  const handleAddToCart = () => {
    if (!requireLogin()) return;
    if (product.stock_quantity <= 0) {
      toast.error("Out of stock");
      return;
    }
    setCartItems([...cartItems, product]);
    setCartSelected(true);
    toast.success("Added to cart");
  };

  const handleBuyNow = () => {
    if (!requireLogin()) return;
    if (product.stock_quantity <= 0) {
      toast.error("Out of stock");
      return;
    }
    navigate("/checkout", { state: { product } });
  };

  const handleWishlist = () => {
    if (!requireLogin()) return;
    toast.success("Added to wishlist ❤️");
  };

  const handleNotifyMe = () => {
    if (!requireLogin()) return;
    toast.success("You’ll be notified when back in stock 🔔");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: "Check out this product!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.info("Product link copied!");
    }
  };

  const calculatePrice = (item) => {
    const goldValue = (item.weight || 0) * (item.goldRate || 0);
    const makingCharges = ((item.makingPercent || 0) / 100) * goldValue;
    const wastageCharges = ((item.wastagePercent || 0) / 100) * goldValue;
    const gstGold = goldValue * 0.03;
    const gstMaking = makingCharges * 0.05;
    const gstTotal = gstGold + gstMaking;
    const total =
      goldValue + makingCharges + wastageCharges + (item.stoneCost || 0) + gstTotal;
    return { goldValue, makingCharges, wastageCharges, gstGold, gstMaking, gstTotal, total };
  };

  const totalInvoice = productItems
    .map((it) => calculatePrice(it).total)
    .reduce((a, b) => a + b, 0);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomStyle({
      backgroundImage: `url(${selectedImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "220%",
      cursorX: e.pageX - left,
      cursorY: e.pageY - top,
      boxWidth: width,
      boxHeight: height,
    });
  };

  const checkDelivery = () => {
    if (!pincode.trim()) {
      alert("Please enter pincode");
      return;
    }
    alert(`Checking delivery for ${pincode}...`);
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!product) return <p className="text-center py-10">Product not found</p>;

  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Top-right icons 
      <div className="relative">
        <div className="absolute top-4 right-6 flex gap-4 z-10">
          <button onClick={handleWishlist} disabled={product.stock_quantity <= 0} title="Wishlist">
            <Heart className={`w-6 h-6 ${product.stock_quantity > 0 ? "text-gray-700 hover:text-red-500" : "text-gray-400"}`} />
          </button>
          <button onClick={handleNotifyMe} disabled={product.stock_quantity > 0} title="Notify Me">
            <Bell className={`w-6 h-6 ${product.stock_quantity <= 0 ? "text-gray-700 hover:text-yellow-500" : "text-gray-400"}`} />
          </button>
          <button onClick={handleShare} title="Share">
            <Share2 className="w-6 h-6 text-gray-700 hover:text-green-600" />
          </button>
          <button onClick={() => navigate("/cart")} title="Cart">
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600" />
          </button>
        </div>
      </div>

      {/* Main content 
      <div className="flex flex-col md:flex-row items-start px-10 py-8 gap-8">
        {/* Left column 
        <div className="flex items-start space-x-4">
          <div className="flex flex-col py-10 space-y-4">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className={`w-20 h-20 object-cover cursor-pointer rounded-md border ${selectedImage === img ? "border-gray-800" : "border-gray-300"}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

          <div className="flex flex-col items-center mt-2">
            <div className="w-full flex justify-center mb-1">
              <a href="/try-on" className="text-sm text-pink-600 hover:underline cursor-pointer">Try On</a>
            </div>

            <div className="relative w-[450px] h-[450px] border rounded-md overflow-hidden"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
            >
              <img src={selectedImage} alt="main product" className="w-full h-full object-cover" />
              {showZoom && (
                <div className="absolute w-40 h-40 border-2 border-pink-500 rounded-full pointer-events-none bg-no-repeat"
                  style={{
                    backgroundImage: zoomStyle.backgroundImage,
                    backgroundPosition: zoomStyle.backgroundPosition,
                    backgroundSize: zoomStyle.backgroundSize,
                    left: zoomStyle.cursorX - 80,
                    top: zoomStyle.cursorY - 80,
                  }}
                />
              )}
            </div>

            <div className="mt-4 w-full max-w-[450px]">
              <div className="rounded-full overflow-hidden shadow-sm border flex">
                <button onClick={handleAddToCart} disabled={product.stock_quantity <= 0}
                  className={`flex-1 py-3 font-medium transition ${cartSelected ? "bg-gradient-to-r from-pink-600 to-pink-700 text-white" : "bg-gradient-to-r from-pink-500 to-pink-700 text-white"}`}
                  style={{ borderRadius: 9999 }}
                >
                  {cartSelected ? "Added ✓" : "Add to Bag"}
                </button>
                <button onClick={handleBuyNow} disabled={product.stock_quantity <= 0}
                  className="flex-1 py-3 bg-white text-pink-600 font-medium border-l"
                  style={{ borderLeft: "1px solid rgba(0,0,0,0.06)" }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right column  
        <div className="flex-1 py-10 relative">
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-gray-600 mt-2">{product.description || "No description"}</p>
          <p className="text-pink-700 font-bold text-xl mt-4">₹{product.price}</p>
          <p className="text-gray-500">Material: {product.material || "N/A"}</p>
          <p className="text-gray-500">Weight: {product.weight || "N/A"}</p>
          <p className={`mt-2 font-semibold ${product.stock_quantity > 0 ? "text-green-600" : "text-red-600"}`}>
            {product.stock_quantity > 0 ? `In Stock (${product.stock_quantity})` : "Out of Stock"}
          </p>

          <div className="border rounded-2xl shadow-sm mt-6">
            <div className="flex">
              <button onClick={() => setActiveTab("details")}
                className={`flex-1 px-6 py-3 rounded-tl-2xl text-sm font-medium transition-all duration-300 ${activeTab === "details" ? "bg-pink-50 text-pink-700" : "text-gray-600 hover:bg-gray-50"}`}
              >
                Product Details
              </button>
              <button onClick={() => setActiveTab("delivery")}
                className={`flex-1 px-6 py-3 rounded-tr-2xl text-sm font-medium transition-all duration-300 ${activeTab === "delivery" ? "bg-pink-50 text-pink-700" : "text-gray-600 hover:bg-gray-50"}`}
              >
                Delivery
              </button>
            </div>

            <div className="p-6 text-gray-600 text-sm space-y-4">
              {activeTab === "details" && (
                <div>
                  <p>{product.description || "No additional details available."}</p>
                </div>
              )}
              {activeTab === "delivery" && (
                <div>
                  <div className="flex space-x-2 items-center">
                    <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)}
                      className="border rounded px-3 py-2 flex-1 text-sm" placeholder="Enter Pincode" />
                    <button onClick={checkDelivery}
                      className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 text-sm"
                    >
                      Check
                    </button>
                  </div>
                  <p className="mt-2 text-gray-500">Delivery options for {pincode || "____"}</p>
                  <div className="flex items-center space-x-2 mt-4 text-sm">
                    <Gem className="w-4 h-4 text-pink-600" />
                    <span>Bijoux Promise: Authenticity guaranteed</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <ShieldCheck className="w-4 h-4 text-pink-600" />
                    <span>Secure payments and safe delivery</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <RefreshCw className="w-4 h-4 text-pink-600" />
                    <span>Easy returns and exchange policy</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
*/




















































