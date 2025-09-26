



import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext"; // make sure this path matches your file exactly
import headerBanner from "../assets/GoldBanner.jpeg"; // check exact casing and extension
import { FaUser, FaShoppingCart, FaHeart, FaSearch } from "react-icons/fa";
import "../styles/banner.css";

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  // Search state
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setShowLogoutMessage(true);
    setTimeout(() => {
      setShowLogoutMessage(false);
      navigate("/login");
    }, 3000);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    if (results.length > 0) navigate(results[0].path);
    setShowSearch(false);
    setSearchTerm("");
    setResults([]);
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(`/api/search?query=${value}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    }
  };

  return (
    <header className="w-full shadow-md">
      {/* Banner Image */}
      <div className="w-full h-[400px] relative border-b-3 border-yellow-400 shadow-md">
        <img
          src={headerBanner}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1/2 left-1/2 text-center transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="header-brand">NutMeg Bijoux</h1>
        </div>

        {/* Top Right Icons */}
<div className="absolute top-6 right-8 flex items-center space-x-4 text-xl drop-shadow z-50">

  {/* Search Icon */}
  <div className="relative">
    <button
      onClick={() => setShowSearch(!showSearch)}
      className="  p-2 shadow-lg focus:outline-none text-white transition duration-200"
      title="Search"
    >
      <FaSearch />
    </button>
    {/* bg-white/80 hover:bg-white/100 text-gray-800 rounded-full */}

    {showSearch && (
      <form
        onSubmit={handleSearchSubmit}
        className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg w-64 flex flex-col z-50"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search..."
          className="px-3 py-2 w-full rounded-t-lg border focus:outline-none focus:ring-2 focus:ring-amber-400"
          autoFocus
        />
        {results.length > 0 && (
          <ul className="max-h-60 overflow-auto">
            {results.map((item) => (
              <li
                key={`${item.type}-${item.id}`}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate(item.path);
                  setShowSearch(false);
                  setSearchTerm("");
                  setResults([]);
                }}
              >
                {item.name}{" "}
                <span className="text-gray-400 text-sm">({item.type})</span>
              </li>
            ))}
          </ul>
        )}
      </form>
    )}
  </div>

  {/* Other icons */}
  <Link to="/login" title="Login" className="text-white hover:text-gray-600">
    <FaUser />
  </Link>
  <Link to="/wishlist" title="Wishlist" className="text-white hover:text-gray-600">
    <FaHeart />
  </Link>
  <Link to="/cart" title="Cart" className="text-white hover:text-gray-600">
    <FaShoppingCart />
  </Link>
  <Link to="/countries" title="Countries" className="text-white hover:text-gray-600">
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
import { FaUser, FaShoppingCart, FaHeart } from "react-icons/fa"; // removed FaSearch, we use separate component
import "../styles/banner.css";
import SearchDropdown from "../components/SearchDropdown"; // ✅ Import SearchDropdown

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
      {/* Banner Image *
      <div className="w-full h-[400px] relative border-b-3 border-yellow-400 shadow-md">
        <img
          src={headerBanner}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1/2 left-1/2 text-center transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="header-brand">NutMeg Bijoux</h1>
        </div>

        {/* Top Right Icons *
        <div className="absolute top-6 right-8 flex items-center space-x-4 text-white text-xl drop-shadow">
          {/* ✅ Search Dropdown */}
         {/*} <SearchDropdown/> */}

          {/* Other icons *
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

      {/* Navigation Bar *
      <nav className="bg-[#F5DEB3] flex justify-center py-4 shadow border-t-4 border-amber-300">
        <ul className="flex flex-wrap gap-6 text-[#480E1E] font-semibold text-sm items-center">
          <li>
            <Link to="/home" className="hover:underline">
              Home
            </Link>
          </li>

          {/* Elements of Elegance *
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

*/}


// Working code with static search functionality

{/* import React, { useContext, useState } from "react";
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

  }; *comment closes here
  
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
      {/* Banner Image *
      <div className="w-full h-[400px] relative border-b-3 border-yellow-400 shadow-md ">
        <img
          src={headerBanner}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1/2 left-1/2 text-center transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="header-brand">NutMeg Bijoux</h1>
        </div>

        {/* Top Right Icons *
        <div className="absolute top-6 right-8 flex items-center space-x-4 text-white text-xl drop-shadow">
          {/* Search Icon + Input *
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

          {/* Other icons *
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

      {/* Navigation Bar *
      <nav className="bg-[#F5DEB3] flex justify-center py-4 shadow border-t-4 border-amber-300">
        <ul className="flex flex-wrap gap-6 text-[#480E1E] font-semibold text-sm items-center">
          <li>
            <Link to="/home" className="hover:underline">
              Home
            </Link>
          </li>

          {/* Elements of Elegance *
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
*/}

