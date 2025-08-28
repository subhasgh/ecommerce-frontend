import React, { useState } from "react";
import nutmegLogo from "../assets/nutmeg-logo.png";
import { Gem, ShieldCheck, RefreshCw } from "lucide-react";
import ChatBot from "../components/ChatBot.jsx"; // keep your chatbot component

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

  const totalInvoice = productItems
    .map((it) => calculatePrice(it).total)
    .reduce((a, b) => a + b, 0);

  // Keep your original zoom calculation & cursor tracking logic — unchanged behavior
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
    // placeholder — integrate to backend
    alert(pincode ? `Checking delivery for ${pincode}...` : "Please enter pincode");
  };

  const addToBag = () => {
    setCartSelected(true);
    // Hook up to backend/cart later
    alert("Added to cart (UI only).");
  };

  const buyNow = () => {
    // Hook up to checkout later
    alert("Proceeding to Buy Now (UI only).");
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="text-center py-6 border-b">
        <h1 className="text-4xl font-medium font-serif text-yellow-800 tracking-wide">Bijoux</h1>
        <div className="flex items-center justify-center gap-2 mt-2 text-gray-600">
          <span className="text-sm">A Nutmeg Product</span>
          <img src={nutmegLogo} alt="Nutmeg Logo" className="h-5 w-5 object-contain" />
        </div>
      </header>

      {/* Product section: top-aligned so thumbnails/main/right-panel line up */}
      <div className="flex flex-col md:flex-row items-start px-10 py-8 gap-8">
        {/* LEFT column: thumbnails + try-on link + main image + pill buttons */}
        <div className="flex items-start space-x-4">
          {/* thumbnails (vertical) */}
          <div className="flex flex-col py-10 space-y-4">
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

          {/* main image + try-on + pill buttons (main column) */}
          <div className="flex flex-col items-center mt-2">
            {/* Try On link (outside image, centered) */}
            <div className="w-full flex justify-center mb-1">
              <a
                href="/try-on"
                className="text-sm text-pink-600 hover:underline cursor-pointer"
                onClick={(e) => {
                  /* keep link behavior — route /try-on or open modal */
                }}
              >
                Try On
              </a>
            </div>

            {/* main image (unchanged zoom behavior) */}
            <div
              className="relative w-[450px] h-[450px] border  rounded-md overflow-hidden"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
            >
              <img src={selectedImage} alt="main product" className="w-full h-full object-cover" />

              {/* inline circular zoom overlay (kept as before) */}
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

            {/* Pill-style Add to Bag / Buy Now container — full rounded pill */}
            <div className="mt-4 w-full max-w-[450px]">
              <div className="rounded-full overflow-hidden shadow-sm border" style={{ display: "flex" }}>
                {/* Add to Bag (gradient, left) */}
                <button
                  onClick={addToBag}
                  className={`flex-1 py-3 text-white font-medium transition ${
                    cartSelected ? "bg-gradient-to-r from-pink-600 to-pink-700" : "bg-gradient-to-r from-pink-500 to-pink-700"
                  }`}
                  style={{ borderRadius: 9999 }}
                >
                  {cartSelected ? "Added ✓" : "Add to Bag"}
                </button>

                {/* Buy Now (plain/bordered right) */}
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
        </div>

        {/* RIGHT column: zoom full view or details/tabs */}
        <div className="flex-1 py-10">
          {/* Show the big zoom panel (right panel) when hovering — unchanged behavior */}
          {showZoom ? (
            <div
              className="w-full max-w-[650px] h-[650px] border  rounded-md bg-no-repeat shadow-md"
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
                <p className="text-sm text-gray-500 mb-4">PRODUCT ID: ZLWT22HBNAAA00</p>
              </div>

              {/* Tabs header (keeps your pill/tab look) */}
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
                  {/* DETAILS tab */}
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

                  {/* PRICE tab */}
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

              {/* PINCODE - placed outside tabs and before shipping */}
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
            <div className="flex justify-center mb-4"><img src={nutmegLogo} alt="Nutmeg Logo" className="h-8 w-8 object-contain" /></div>
            <p className="text-sm text-gray-600">Nutmeg Product</p>
          </div>
        </div>
      </div>

      {/* Chat Bot (imported component) */}
      <div className="fixed bottom-4 right-4 z-50">
        <ChatBot />
      </div>
    </div>
  );
};

export default ProductDetailPage;

//complete code with chatbot 
{/*
import React, { useState } from "react";
import nutmegLogo from "../assets/nutmeg-logo.png";
import { Gem, ShieldCheck, RefreshCw } from "lucide-react";
import ChatBot from "../components/ChatBot.jsx";

const images = [
  "/images/jewel1.jpg",
  "/images/jewel2.jpg",
  "/images/jewel3.jpg",
];

const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [zoomStyle, setZoomStyle] = useState({});
  const [showZoom, setShowZoom] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [pincode, setPincode] = useState("");
  const [deliveryMsg, setDeliveryMsg] = useState("");

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
    });
  };

  const checkDelivery = () => {
    // Placeholder logic for demo
    if (pincode.length === 6) {
      setDeliveryMsg(`Delivery available at ${pincode}`);
    } else {
      setDeliveryMsg("Please enter a valid 6-digit pincode");
    }
  };

  return (
    <div className="bg-white min-h-screen">
      * ---- Header Branding ---- *
      <header className="text-center py-6 border-b">
        <h1 className="text-4xl font-medium font-serif text-yellow-800 tracking-wide">
          Bijoux
        </h1>
        <div className="flex items-center justify-center gap-2 mt-2 text-gray-600">
          <span className="text-sm">A Nutmeg Product</span>
          <img
            src={nutmegLogo}
            alt="Nutmeg Logo"
            className="h-5 w-5 object-contain"
          />
        </div>
      </header>

      * --- Product Section (Left + Right Panel) --- *
      <div className="flex flex-col md:flex-row px-10 py-8">
        * Left thumbnails + main image *
        <div className="flex space-x-4 items-start">
          * Thumbnails *
          <div className="flex flex-col space-y-2">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="thumbnail"
                className={`w-20 h-20 object-cover cursor-pointer rounded-md border ${
                  selectedImage === img ? "border-gray-800" : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

          * Main image wrapper *
          <div className="relative">
            * Try On link (top center) *
            <a
              href="/tryon"
              className="absolute top-[-30px] left-1/2 -translate-x-1/2 text-sm 
              text-pink-600 hover:text-pink-800 bg-white/70 backdrop-blur-sm px-3 py-1 rounded-md shadow-sm z-10"
            >
              ✨ Try On
            </a>

            * Main Image *
            <div
              className="w-[450px] h-[450px] border rounded-md overflow-hidden"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
            >
              <img
                src={selectedImage}
                alt="main product"
                className="w-full h-full object-cover"
              />

              * Inline zoom overlay *
              {showZoom && (
                <div
                  className="absolute w-40 h-40 border-2 border-pink-500 rounded-full pointer-events-none bg-no-repeat"
                  style={{
                    backgroundImage: zoomStyle.backgroundImage,
                    backgroundPosition: zoomStyle.backgroundPosition,
                    backgroundSize: zoomStyle.backgroundSize,
                    left: `${zoomStyle.cursorX - 80}px`,
                    top: `${zoomStyle.cursorY - 80}px`,
                  }}
                />
              )}
            </div>
          </div>
        </div>

        * Right panel *
        <div className="ml-10 flex-1">
          {showZoom ? (
            <div
              className="w-[650px] h-[650px] border rounded-md bg-no-repeat shadow-md"
              style={{ ...zoomStyle, backgroundSize: "180%" }}
            />
          ) : (
            <>
              * Product details *
              <div>
                <h2 className="text-xl font-medium text-pink-800 mb-2">
                  Entwined in Neck & Earrings
                </h2>
                <p className="text-gray-700 text-sm mb-4">
                  She embraces synergy for the sense of unity and accomplishment it exudes.
                </p>
                <p className="text-xl font-bold text-gray-900 mb-2">₹ 201039</p>
                <p className="text-sm text-gray-500 mb-4">
                  PRODUCT ID: ZLWT22HBNAAA00
                </p>
              </div>

              * --- Tabs Container --- *
              <div className="border rounded-2xl shadow-sm">
                * Tab Buttons *
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

               * Tab Content *
                <div className="p-6">
                  {activeTab === "details" && (
                    <div>
                      <h2 className="text-lg font-semibold mb-2">
                        Product Details
                      </h2>
                      <ul className="text-gray-600 list-disc pl-5 space-y-1">
                        <li>Metal: 22KT Yellow Gold</li>
                        <li>Weight: 10.5 grams</li>
                        <li>Stone: Diamonds (0.45ct)</li>
                        <li>Hallmark Certified</li>
                      </ul>
                    </div>
                  )}

                  {activeTab === "price" && (
                    <div>
                      <h2 className="text-lg font-semibold mb-4">Price Breakup</h2>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-3 py-2 border">Component</th>
                              <th className="px-3 py-2 border">Rate</th>
                              <th className="px-3 py-2 border">Weight</th>
                              <th className="px-3 py-2 border">Value</th>
                              <th className="px-3 py-2 border">Discount</th>
                              <th className="px-3 py-2 border">Final Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="px-3 py-1 border">18kt Gold</td>
                              <td className="px-3 py-1 border">7660</td>
                              <td className="px-3 py-1 border">2.963</td>
                              <td className="px-3 py-1 border">₹22,697</td>
                              <td className="px-3 py-1 border">₹0</td>
                              <td className="px-3 py-1 border">₹22,697</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-1 border">Diamond 1 GH-GH SI ROUND-10 Nos</td>
                              <td className="px-3 py-1 border">-</td>
                              <td className="px-3 py-1 border">0.075</td>
                              <td className="px-3 py-1 border">₹5,138</td>
                              <td className="px-3 py-1 border">₹771</td>
                              <td className="px-3 py-1 border">₹4,367</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-1 border">Diamond 1 GH-GH SI ROUND-8 Nos</td>
                              <td className="px-3 py-1 border">-</td>
                              <td className="px-3 py-1 border">0.069</td>
                              <td className="px-3 py-1 border">₹4,727</td>
                              <td className="px-3 py-1 border">₹709</td>
                              <td className="px-3 py-1 border">₹4,018</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-1 border font-medium">Total Diamond Value</td>
                              <td className="px-3 py-1 border">-</td>
                              <td className="px-3 py-1 border">-</td>
                              <td className="px-3 py-1 border">₹9,864</td>
                              <td className="px-3 py-1 border">₹1,480</td>
                              <td className="px-3 py-1 border">₹8,384</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-1 border font-medium">Making Charges</td>
                              <td className="px-3 py-1 border">-</td>
                              <td className="px-3 py-1 border">-</td>
                              <td className="px-3 py-1 border">₹8,766</td>
                              <td className="px-3 py-1 border">-</td>
                              <td className="px-3 py-1 border">₹8,766</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-1 border font-medium">Total</td>
                              <td className="px-3 py-1 border">-</td>
                              <td className="px-3 py-1 border">-</td>
                              <td className="px-3 py-1 border">₹41,327</td>
                              <td className="px-3 py-1 border">₹1,480</td>
                              <td className="px-3 py-1 border">₹39,847</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-1 border font-medium">GST (3%)</td>
                              <td className="px-3 py-1 border">-</td>
                              <td className="px-3 py-1 border">-</td>
                              <td className="px-3 py-1 border">₹1,240</td>
                              <td className="px-3 py-1 border">-</td>
                              <td className="px-3 py-1 border">₹1,195</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-1 border font-bold">Grand Total</td>
                              <td className="px-3 py-1 border">-</td>
                              <td className="px-3 py-1 border">-</td>
                              <td className="px-3 py-1 border">₹42,567</td>
                              <td className="px-3 py-1 border">-</td>
                              <td className="px-3 py-1 border font-bold">₹41,043</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              * --- Delivery / Pincode Check --- *
              <div className="mt-6 border rounded-2xl p-4 shadow-sm">
                <h3 className="text-sm font-medium mb-2">Check Delivery Availability</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="border px-3 py-2 rounded-md w-40 text-sm"
                  />
                  <button
                    onClick={checkDelivery}
                    className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Check
                  </button>
                </div>
                {deliveryMsg && <p className="mt-2 text-sm text-gray-700">{deliveryMsg}</p>}
              </div>

              * --- Shipping & Return Policy --- *
              <div className="mt-6 border-t">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer py-3 text-gray-800 font-medium">
                    <span>Shipping & Return Policy</span>
                    <svg
                      className="w-5 h-5 text-gray-600 transform group-open:rotate-90 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
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

      * --- The Bijoux Promise Section --- *
      <div className="mt-20 border-t pt-10 px-10">
        <h2 className="text-2xl font-serif text-center mb-10">
          The Bijoux Promise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 text-center gap-8 text-gray-800">
          * Ethically Sourced *
          <div className="md:border-r md:border-gray-200">
            <div className="flex justify-center mb-4">
              <Gem className="h-6 w-6 text-green-800" />
            </div>
            <p className="text-sm text-gray-600">Ethically Sourced</p>
          </div>

          * Sealed Assurance *
          <div className="md:border-r md:border-gray-200">
            <div className="flex justify-center mb-4">
              <ShieldCheck className="h-6 w-6 text-green-800" />
            </div>
            <p className="text-sm text-gray-600">Sealed Assurance</p>
          </div>

          * Upgrade Your Jewellery *
          <div className="md:border-r md:border-gray-200">
            <div className="flex justify-center mb-4">
              <RefreshCw className="h-6 w-6 text-green-800" />
            </div>
            <p className="text-sm text-gray-600">Upgrade Your Jewellery</p>
          </div>

          * Nutmeg Product *
          <div>
            <div className="flex justify-center mb-4">
              <img
                src={nutmegLogo}
                alt="Nutmeg Logo"
                className="h-8 w-8 object-contain"
              />
            </div>
            <p className="text-sm text-gray-600">Nutmeg Product</p>
          </div>
        </div>
      </div>
< ChatBot />
    </div>
  );
};

export default ProductDetailPage;

*/}
