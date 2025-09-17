



import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import headerBanner from "../assets/GoldBanner.jpeg";
import { FaUser, FaShoppingCart, FaHeart, FaSearch } from "react-icons/fa";  // ✅ Added FaSearch
import "../styles/banner.css";

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  // ✅ Search state
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setShowLogoutMessage(true);
    setTimeout(() => {
      setShowLogoutMessage(false);
      navigate("/login");
    }, 3000);
  };

  // ✅ Handle search submit
  {/* const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setShowSearch(false);
      setSearchTerm("");
    }
  }; */}
  
const handleSearch = (e) => {
  e.preventDefault();
  const term = searchTerm.trim().toLowerCase();

  if (!term) return;

  // ✅ Special keyword routing
  if (term === "products") {
    navigate("/products");
  } else if (term === "cart") {
    navigate("/cart");
  } else if (term === "wishlist") {
    navigate("/wishlist");
  } else if (term === "home") {
    navigate("/home");
  } else {
    // ✅ Default: go to search results page
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  }

  setShowSearch(false);
  setSearchTerm("");
};



  return (
    <header className="w-full shadow-md">
      {/* Banner Image */}
      <div className="w-full h-[400px] relative border-b-3 border-yellow-400 shadow-md ">
        <img
          src={headerBanner}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1/2 left-1/2 text-center transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="header-brand">NutMeg Bijoux</h1>
        </div>

        {/* Top Right Icons */}
        <div className="absolute top-6 right-8 flex items-center space-x-4 text-white text-xl drop-shadow">
          {/* Search Icon + Input */}
          <div className="relative h-6 w-6">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="focus:outline-none"
              title="Search"
            >
              <FaSearch />
            </button>

            {showSearch && (
              <form
                onSubmit={handleSearch}
                className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg flex"
              >
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="px-3 py-1 w-40 rounded-l-lg text-black border outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 bg-amber-400 rounded-r-sm text-black font-medium"
                >
                  Go
                </button>
              </form>
            )}
          </div>

          {/* Other icons */}
          <Link to="/login" title="Login">
            <FaUser />
          </Link>
          <Link to="/wishlist" title="Wishlist">
            <FaHeart />
          </Link>
          <Link to="/cart" title="Cart">
            <FaShoppingCart />
          </Link>
          <Link to="/countries" title="Countries">
            <div className="w-7 h-5 flex items-center justify-center">
              <span role="img" aria-label="India" className="text-xl leading-none">
                🇮🇳
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-[#F5DEB3] flex justify-center py-4 shadow border-t-4 border-amber-300">
        <ul className="flex flex-wrap gap-6 text-[#480E1E] font-semibold text-sm items-center">
          <li>
            <Link to="/home" className="hover:underline">
              Home
            </Link>
          </li>

          {/* Elements of Elegance */}
          <li className="group relative">
            <span className="cursor-pointer hover:underline">Elements of Elegance</span>
            <ul className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded z-10 min-w-[160px]">
              <li>
                <Link to="/category/diamond" className="block px-4 py-2 hover:bg-gray-100">
                  Diamond
                </Link>
              </li>
              <li>
                <Link to="/category/platinum" className="block px-4 py-2 hover:bg-gray-100">
                  Platinum
                </Link>
              </li>
              <li className="relative">
                <span className="peer block px-4 py-2 cursor-pointer hover:bg-gray-100">
                  Gold ▸
                </span>
                <ul className="absolute top-0 left-full hidden peer-hover:block hover:block bg-white shadow-lg rounded z-20 min-w-[160px]">
                  <li>
                    <Link to="/jewels/earrings" className="block px-4 py-2 hover:bg-gray-100">
                      Earrings
                    </Link>
                  </li>
                  <li>
                    <Link to="/jewels/bangles" className="block px-4 py-2 hover:bg-gray-100">
                      Bangles
                    </Link>
                  </li>
                  <li>
                    <Link to="/jewels/bracelets" className="block px-4 py-2 hover:bg-gray-100">
                      Bracelets
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="block px-4 py-2 hover:bg-gray-100">
                      Neck Aura
                    </Link>
                  </li>
                  <li>
                    <Link to="/jewels/chain" className="block px-4 py-2 hover:bg-gray-100">
                      Chain
                    </Link>
                  </li>
                  <li>
                    <Link to="/jewels/anklets" className="block px-4 py-2 hover:bg-gray-100">
                      Anklets
                    </Link>
                  </li>
                  <li>
                    <Link to="/jewels/rings" className="block px-4 py-2 hover:bg-gray-100">
                      Rings
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/category/silver" className="block px-4 py-2 hover:bg-gray-100">
                  Silver
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/toppicks" className="hover:underline">
              Top Picks
            </Link>
          </li>
          <li>
            <Link to="/coins" className="hover:underline">
              Coins
            </Link>
          </li>
          <li>
            <Link to="/schemes" className="hover:underline">
              Smart Gold Plans
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;


{/* import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import headerBanner from "../assets/GoldBanner.jpeg";
import { FaUser, FaShoppingCart, FaHeart } from "react-icons/fa";
import "../styles/banner.css";

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setShowLogoutMessage(true);
    setTimeout(() => {
      setShowLogoutMessage(false);
      navigate("/login");
    }, 3000);
  };

  return (
    <header className="w-full shadow-md">
      {/* Banner Image 
      <div className="w-full h-[400px] relative border-b-3 border-yellow-400 shadow-md ">
        <img
          src={headerBanner}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1/2 left-1/2 text-center transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="header-brand">NutMeg Bijoux</h1>
        </div>
        <div className="absolute top-6 right-8 flex space-x-4 text-white text-xl drop-shadow">
          <Link to="/login" title="Login">
            <FaUser />
          </Link> 
        
        


          <Link to="/wishlist" title="Wishlist">
            <FaHeart />
          </Link>
          <Link to="/cart" title="Cart">
            <FaShoppingCart />
          </Link>
          <Link to="/countries" title="Countries">
            <div className="w-7 h-5 flex items-center justify-center">
              <span role="img" aria-label="India" className="text-xl leading-none">
                🇮🇳
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Navigation Bar 
      <nav className="bg-[#F5DEB3] flex justify-center py-4 shadow border-t-4 border-amber-300">
        <ul className="flex flex-wrap gap-6 text-[#480E1E] font-semibold text-sm items-center">
          <li>
            <Link to="/home" className="hover:underline">
              Home
            </Link>
          </li>

          {/* Elements of Elegance 
          <li className="group relative">
            <span className="cursor-pointer hover:underline">Elements of Elegance</span>

            {/* First dropdown 
            <ul className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded z-10 min-w-[160px]">

            
               <li>
                <Link to="/category/diamond" className="block px-4 py-2 hover:bg-gray-100">
                  Diamond
                </Link>
              </li>
              <li>
                <Link to="/category/platinum" className="block px-4 py-2 hover:bg-gray-100">
                  Platinum
                </Link>
              </li>

              
              {/* Gold with nested submenu 
              <li className="relative">
                <span className="peer block px-4 py-2 cursor-pointer hover:bg-gray-100">
                  Gold ▸
                </span>

                {/* Gold submenu (only opens when hovering Gold) 
                <ul className="absolute top-0 left-full hidden peer-hover:block hover:block bg-white shadow-lg rounded z-20 min-w-[160px]">
                  <li>
                    <Link to="/jewels/earrings" className="block px-4 py-2 hover:bg-gray-100">
                      Earrings
                    </Link>
                  </li>
                  <li>
                    <Link to="/jewels/bangles" className="block px-4 py-2 hover:bg-gray-100">
                      Bangles
                    </Link>
                  </li>
                  <li>
                    <Link to="/jewels/bracelets" className="block px-4 py-2 hover:bg-gray-100">
                      Bracelets
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="block px-4 py-2 hover:bg-gray-100">
                      Neck Aura
                    </Link>
                  </li>
                  <li>
                    <Link to="/jewels/chain" className="block px-4 py-2 hover:bg-gray-100">
                      Chain
                    </Link>
                  </li>
                  <li>
                    <Link to="/jewels/anklets" className="block px-4 py-2 hover:bg-gray-100">
                      Anklets
                    </Link>
                  </li>
                  <li>
                    <Link to="/jewels/rings" className="block px-4 py-2 hover:bg-gray-100">
                      Rings
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Other metals 
                            <li>
                <Link to="/category/silver" className="block px-4 py-2 hover:bg-gray-100">
                  Silver
                </Link>
              </li>
           
            </ul>
          </li>

          {/* Other menus 
          <li>
            <Link to="/toppicks" className="hover:underline">
              Top Picks
            </Link>
          </li>
          <li>
            <Link to="/coins" className="hover:underline">
              Coins
            </Link>
          </li>
          <li>
            <Link to="/schemes" className="hover:underline">
              Smart Gold Plans
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
*/}




{/* import React, {useContext,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext, { useAuth } from '../context/AuthContext';
//import { FaUser, FaShoppingCart, FaHeart } from "react-icons/fa";
import headerBanner from "../assets/GoldBanner.jpeg"; // ✅ Ensure this path is correct
import { FaUser, FaShoppingCart, FaHeart } from "react-icons/fa";
import '../styles/banner.css';


const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
      const navigate = useNavigate();
      const [showLogoutMessage, setShowLogoutMessage] = useState(false)
      
      const handleLogout = (e) => {
          e.preventDefault();
          logout();
          setShowLogoutMessage(true)
          setTimeout(()=>{
            setShowLogoutMessage(false);
            navigate("/login")
          },3000)
        };
  return (
    <header className="w-full shadow-md">
      {/* Banner Image 
      <div className="w-full h-[400px] relative  border-b-3 border-yellow-400 shadow-md ">

        <img
          src={headerBanner}
          alt="Banner"
          className="w-full h-full object-cover"
        />

        {/* Title and Subtitle Overlay 
        <div className="absolute top-1/2 left-1/2 text-center transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="header-brand">NutMeg Bijoux</h1>       
 {/*  <h1 className="text-5xl font-semibold  text-[#480E1E] drop-shadow-lg">NutMeg Bijoux</h1>
           <p className="text-3xl font-bold text-[#FFFFF9] drop-shadow-sm mt-2 font-[cursive] animate-slideRight opacity-0 ">where the magic begins</p> comment close
        </div>

        {/* Icons - Top Right 
        <div className="absolute top-6 right-8 flex space-x-4 text-white text-xl drop-shadow">
          <Link to="/login" title="Login">
            <FaUser />
          </Link>
          <Link to="/wishlist" title="Wishlist">
            <FaHeart />
          </Link>
          <Link to="/cart" title="Cart">
            <FaShoppingCart />
          </Link>
  <Link to="/countries" title="Countries">      
  <div className="w-7y h-5 flex items-center justify-center">
  <span role="img" aria-label="India" className="text-xl leading-none">🇮🇳</span>
  </div>
</Link>
        </div>
      </div>

      {/* Navigation Bar 
     
       <nav className="bg-[#F5DEB3] flex justify-center py-4 shadow border-t-4 border-amber-300">
{/*         // <nav className="absolute bottom-15 justify-center left-1/2 transform -translate-x-1/2 w-full px-8 
// py-2 shadow-md border-t-4 border-amber-300 z-10"> 
        <ul className="flex flex-wrap gap-6 text-[#480E1E] font-semibold text-sm items-center">
          <li><Link to="/home" className="hover:underline">Home</Link></li>
         <li className="group relative">
          <span className="cursor-pointer hover:underline">Elements of Elegance</span>
  <span className="block px-4 py-2 cursor-pointer hover:bg-gray-100">Gold ▸</span>
  
  {/* Nested Jewels dropdown under Gold 
  <ul className="absolute top-0 left-full hidden group-hover:block bg-white shadow-lg rounded z-10">
    <li><Link to="/jewels/earrings" className="block px-4 py-2 hover:bg-gray-100">Earrings</Link></li>
    <li><Link to="/jewels/bangles" className="block px-4 py-2 hover:bg-gray-100">Bangles</Link></li>
    <li><Link to="/jewels/bracelets" className="block px-4 py-2 hover:bg-gray-100">Bracelets</Link></li>
    <li><Link to="/products" className="block px-4 py-2 hover:bg-gray-100">Neck Aura</Link></li>
    <li><Link to="/jewels/chain" className="block px-4 py-2 hover:bg-gray-100">Chain</Link></li>
    <li><Link to="/jewels/anklets" className="block px-4 py-2 hover:bg-gray-100">Anklets</Link></li>
    <li><Link to="/jewels/rings" className="block px-4 py-2 hover:bg-gray-100">Rings</Link></li>
  </ul>
</li>



             <li><Link to="/category/silver" className="block px-4 py-2 hover:bg-gray-100">Silver</Link></li>
              <li><Link to="/category/diamond" className="block px-4 py-2 hover:bg-gray-100">Diamond</Link></li>
              <li><Link to="/category/platinum" className="block px-4 py-2 hover:bg-gray-100">Platinum</Link></li>
            
          </li>

         {/* <li><Link to="/products" className="hover:underline">Products</Link></li> 
          <li className="group relative">
            <Link to="/products" className="hover:underline">Jewels</Link>
            <ul className="absolute  top-full hidden group-hover:block bg-white shadow-lg rounded z-10">
              <li><Link to="/jewels/earrings" className="block px-4 py-2 hover:bg-gray-100">Earrings</Link></li>
              <li><Link to="/jewels/bangles" className="block px-4 py-2 hover:bg-gray-100">Bangles</Link></li>
              <li><Link to="/jewels/bracelets" className="block px-4 py-2 hover:bg-gray-100">Bracelets</Link></li>
              {/* <li><Link to="/jewels/necklaces" className="block px-4 py-2 hover:bg-gray-100">Neck Aura</Link></li> 
                 <Link to="/products" className="block px-4 py-2 hover:bg-gray-100">
    Neck Aura
  </Link>

              <li><Link to="/jewels/chain" className="block px-4 py-2 hover:bg-gray-100">Chain</Link></li>
             {/* <li><Link to="/jewels/haram" className="block px-4 py-2 hover:bg-gray-100">Haram</Link></li> 
              <li><Link to="/jewels/anklets" className="block px-4 py-2 hover:bg-gray-100">Anklets</Link></li>
              <li><Link to="/jewels/rings" className="block px-4 py-2 hover:bg-gray-100">Rings</Link></li>
            </ul>
          </li>
          <li><Link to="/toppicks" className="hover:underline">Top Picks</Link></li>
          <li><Link to="/coins" className="hover:underline">Coins</Link></li>
          <li><Link to="/schemes" className="hover:underline">Smart Gold Plans</Link></li> 
           {/* {!isLoggedIn ? (               
                        <li><Link to="/login"  className="hover:underline">Login</Link></li>
                          ) : (
                         <>
                         <li><Link to="/login" onClick={handleLogout} className="hover:underline">Logout</Link></li>
                      </>
                         )
} comment close here       
        </ul>
      </nav>

    </header>
  );
};

export default Header;
*/}