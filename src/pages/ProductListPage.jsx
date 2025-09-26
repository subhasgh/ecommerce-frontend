


// code for both dynamic if it fails static fallback
/* import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';
import Header from '../components/Header.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importing Heroicons
import { HeartIcon, ShareIcon } from '@heroicons/react/solid';

// Static images for fallback or demo purposes
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

  const [products, setProducts] = useState([]);

  // ✅ Use this static array as fallback/demo data
  const staticProducts = [
    {
      id: 1,
      name: 'Small piece, Big charm',
      price: '2000',
      weight: '25g',
      material: '22K Gold',
      image: ne1,
    },
    {
      id: 2,
      name: 'Sparkle with every turn',
      price: '50',
      weight: '5g',
      material: 'Sterling Silver',
      image: ha1,
    },
    {
      id: 3,
      name: 'Beauty in every circle',
      price: '100',
      weight: '3g',
      material: '18K Gold with Diamonds',
      image: ha2,
    },
    {
      id: 4,
      name: 'Grace your neckline with unmatched elegance',
      price: '2000',
      weight: '25g',
      material: '22K Gold',
      image: ne2,
    },
    {
      id: 5,
      name: 'Royal Elegance',
      price: '50',
      weight: '5g',
      material: 'Sterling Silver',
      image: ne3,
    },
    {
      id: 6,
      name: 'Minimalist charm that shines with every movement',
      price: '50',
      weight: '5g',
      material: 'Sterling Silver',
      image: ha3,
    },
  ];

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        if (data.status === "success") {
          setProducts(data.data);
        } else {
          setProducts(staticProducts); // fallback
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts(staticProducts); // fallback
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    if (!isLoggedIn) {
      toast.error("Please login to continue", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundColor: '#fce7f3',
          color: '#9d174d',
          fontWeight: 'bold',
          borderRadius: '8px',
          border: '2px solid #fbbf24',
        },
        progressStyle: {
          background: '#fbbf24',
        }
      });
      navigate('/login', { state: { from: '/products' } });
      return;
    }
    setCartItems([...cartItems, product]);
    toast.success("Added to cart", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <>
      <Header />

      {/* Scrolling Banner 
      <div className="overflow-hidden bg-gradient-to-r from-amber-50 via-pink-50 to-amber-50 py-3 border-y border-amber-200 shadow-inner">
        <div className="whitespace-nowrap animate-scroll font-[cursive] text-lg text-rose-700 font-semibold tracking-wide drop-shadow-md">
          ✨ Discover Timeless Elegance • Crafted for Precious Moments • Luxury You Deserve ✨
        </div>
      </div>

      {/* Product Grid 
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16 px-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center hover:shadow-2xl transition-all duration-300 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Link to={`/products/${product.id}`}>
              <img
                src={product.image || "https://via.placeholder.com/300"}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg mb-4"
              />
            </Link>
            <h2 className="text-sm text-green-800 text-center">{product.name}</h2>
            <p className="text-sm italic text-gray-500 text-center">
              {product.material} • {product.weight}
            </p>
            <p className="text-pink-700 font-bold text-xl">₹{product.price}</p>

            {/* Action Buttons 
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => addToCart(product)}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 font-semibold text-[#480E1E] px-4 py-2 rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform"
              >
                Add to Cart
              </button>

              <button
                onClick={() => toast.info("Added to wishlist")}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <HeartIcon className="h-5 w-5 text-red-500" />
              </button>

              <button
                onClick={() => toast.info("Share option clicked")}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ShareIcon className="h-5 w-5 text-blue-500" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CSS for scrolling text 
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

export default ProductListPage; */









// Correct coding with wishlist, share and all with dynamic connection

{/* import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext, { useAuth } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';
import Header from '../components/Header.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HeartIcon, ShareIcon } from '@heroicons/react/solid';
import productImages from '../assets/ProductImages.js';


const ProductListPage = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products"); // adjust if your backend runs elsewhere
        const data = await res.json();
        //console.log(data.data);  // ✅ Log the full product list
        if (data.status === "success") {
          setProducts(data.data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    if (!isLoggedIn) {
      toast.error("Please login to continue", {
        position: "top-right",
        autoClose: 3000,
        style: {
          backgroundColor: '#fce7f3',
          color: '#9d174d',
          fontWeight: 'bold',
          borderRadius: '8px',
          border: '2px solid #fbbf24',
        },
        progressStyle: { background: '#fbbf24' },
      });
      navigate('/login', { state: { from: '/products' } });
      return;
    }
    setCartItems([...cartItems, product]);
  };

  return (
    <>
      <Header />

      {/* Scrolling Banner 
      <div className="overflow-hidden bg-gradient-to-r frlom-amber-50linu via-pink-50 to-amber-50 py-3 border-y border-amber-200 shadow-inner">
        <div className="whitespace-nowrap animate-scroll font-[cursive] text-lg text-rose-700 font-semibold tracking-wide drop-shadow-md">
          ✨ Discover Timeless Elegance • Crafted for Precious Moments • Luxury You Deserve ✨
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            {/* ✅ Clickable image → navigates to product detail page  {/* src={product.image_url || "https://via.placeholder.com/200"}
            <Link to={`/products/${product.id}`}>
             {/*} <img
                
                       src={`http://localhost:5000${product.image_url}` || "https://via.placeholder.com/200"} 
                alt={product.name}
                className="w-full h-full object-cover rounded-lg mb-4"
              /> 
            <img src={productImages[product.image_url] || "https://via.placeholder.com/200"}
  alt={product.name}
  className="w-full h-96 object-cover rounded-lg mb-4"
/>

            </Link>

            <h2 className="text-sm text-green-800">{product.name}</h2>
            <p className="text-sm italic text-gray-500">
              {product.material} • {product.weight}
            </p>
            <p className="text-pink-700 font-bold text-xl">₹{product.price}</p>
            
             <div className="flex space-x-4 mt-4">
            <button
              onClick={() => addToCart(product)}
              disabled={product.stock_quantity <= 0}
              className={`mt-4 px-4 py-2 rounded-md font-semibold text-[#480E1E] text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]
                ${product.stock_quantity > 0
                  ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                  : "bg-gray-300 cursor-not-allowed"}
              `}
            >
              {product.stock_quantity > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
            
              <button
                onClick={() => toast.info("Added to wishlist")}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <HeartIcon className="h-5 w-5 text-red-500" />
              </button>

              <button
                onClick={() => toast.info("Share option clicked")}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ShareIcon className="h-5 w-5 text-blue-500" />
              </button>
            </div>
          
          </motion.div>
        ))}
      </div>

      {/* CSS for scrolling text 
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

export default ProductListPage; */}


{/* import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';
import Header from '../components/Header.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HeartIcon, ShareIcon } from '@heroicons/react/solid';
import productImages from '../assets/ProductImages.js';

const ProductListPage = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        if (data.status === "success") {
          setProducts(data.data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Generic login check helper
  const requireLogin = (callback) => {
    if (!isLoggedIn) {
      toast.error("Please login to continue", {
        position: "top-right",
        autoClose: 3000,
        style: {
          backgroundColor: '#fce7f3',
          color: '#9d174d',
          fontWeight: 'bold',
          borderRadius: '8px',
          border: '2px solid #fbbf24',
        },
        progressStyle: { background: '#fbbf24' },
      });
      navigate('/login', { state: { from: '/products' } });
      return false;
    }
    return true;
  };

  // Add to Cart
  const addToCart = (product) => {
    if (!requireLogin()) return;
    setCartItems([...cartItems, product]);
    toast.success("Added to cart", { position: "top-right", autoClose: 2000 });
  };

  // Wishlist
  const handleWishlist = (product) => {
    if (!requireLogin()) return;
    toast.success("Added to wishlist", { position: "top-right", autoClose: 2000 });
  };

  // Share
  const handleShare = (product) => {
    if (!requireLogin()) return;
    toast.info("Share option clicked", { position: "top-right", autoClose: 2000 });
  };

  return (
    <>
      <Header />

      {/* Scrolling Banner 
      <div className="overflow-hidden bg-gradient-to-r from-amber-50 via-pink-50 to-amber-50 py-3 border-y border-amber-200 shadow-inner">
        <div className="whitespace-nowrap animate-scroll font-[cursive] text-lg text-rose-700 font-semibold tracking-wide drop-shadow-md">
          ✨ Discover Timeless Elegance • Crafted for Precious Moments • Luxury You Deserve ✨
        </div>
      </div>

      {/* Product Grid 
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16 px-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            {/* Clickable Image 
            <Link to={`/products/${product.id}`}>
              <img
                src={productImages[product.image_url] || "https://via.placeholder.com/300"}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg mb-4"
              />
            </Link>

            <h2 className="text-sm text-green-800 text-center">{product.name}</h2>
            <p className="text-sm italic text-gray-500 text-center">
              {product.material} • {product.weight}
            </p>
            <p className="text-pink-700 font-bold text-xl">₹{product.price}</p>

            {/* Action Buttons 
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock_quantity <= 0}
                className={`mt-4 px-4 py-2 rounded-md font-semibold text-[#480E1E] text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]
                  ${product.stock_quantity > 0
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:scale-105 transition-transform"
                    : "bg-gray-300 cursor-not-allowed"}
                `}
              >
                {product.stock_quantity > 0 ? "Add to Cart" : "Out of Stock"}
              </button>

              <button
                onClick={() => handleWishlist(product)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <HeartIcon className="h-5 w-5 text-red-500" />
              </button>

              <button
                onClick={() => handleShare(product)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ShareIcon className="h-5 w-5 text-blue-500" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scrolling Text CSS }
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

export default ProductListPage; */}


import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';
import Header from '../components/Header.jsx';
import { HeartIcon, ShareIcon } from '@heroicons/react/solid';
import productImages from '../assets/ProductImages.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductListPage = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext); // should be true/false/null
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        if (data.status === "success") setProducts(data.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Login check helper
  const requireLogin = () => {
    if (isLoggedIn === null) {
      // still checking login state
      toast.info("Checking login status...");
      return false;
    }
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return false;
    }
    return true;
  };

  // Action handlers
  const addToCart = (product) => {
    if (!requireLogin()) return;
    setCartItems([...cartItems, product]);
    toast.success("Added to cart", { position: "top-right", autoClose: 2000 });
  };

  const handleWishlist = (product) => {
    if (!requireLogin()) return;
    toast.success("Added to wishlist", { position: "top-right", autoClose: 2000 });
  };

  const handleShare = (product) => {
    if (!requireLogin()) return;
    toast.info("Share option clicked", { position: "top-right", autoClose: 2000 });
  };

  return (
    <>
      <Header />

      {/* Scrolling Banner */}
      <div className="overflow-hidden bg-gradient-to-r from-amber-50 via-pink-50 to-amber-50 py-3 border-y border-amber-200 shadow-inner">
        <div className="whitespace-nowrap animate-scroll font-[cursive] text-lg text-rose-700 font-semibold tracking-wide drop-shadow-md">
          ✨ Discover Timeless Elegance • Crafted for Precious Moments • Luxury You Deserve ✨
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16 px-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Link to={`/products/${product.id}`}>
              <img
                src={
                  
                  
                  [product.image_url] || "https://via.placeholder.com/300"}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg mb-4"
              />
            </Link>

            <h2 className="text-sm text-green-800 text-center">{product.name}</h2>
            <p className="text-sm italic text-gray-500 text-center">
              {product.material} • {product.weight}
            </p>
            <p className="text-pink-700 font-bold text-xl">₹{product.price}</p>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock_quantity <= 0}
                className={`mt-4 px-4 py-2 rounded-md font-semibold text-[#480E1E] text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]
                  ${product.stock_quantity > 0
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:scale-105 transition-transform"
                    : "bg-gray-300 cursor-not-allowed"}
                `}
              >
                {product.stock_quantity > 0 ? "Add to Cart" : "Out of Stock"}
              </button>

              <button
                onClick={() => handleWishlist(product)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <HeartIcon className="h-5 w-5 text-red-500" />
              </button>

              <button
                onClick={() => handleShare(product)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ShareIcon className="h-5 w-5 text-blue-500" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Login Required</h2>
            <p className="mb-4">Please login to continue</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  navigate('/login', { state: { from: '/products' } });
                  setShowLoginModal(false);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:opacity-90"
              >
                Login
              </button>
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scrolling Text CSS */}
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
