import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { ShoppingCart, LogIn, LogOut , User} from "lucide-react";
import NutmegLogo from "../assets/nutmeg-logo.png";

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-gradient-to-r from-amber-50 to-rose-100 shadow-md border-b border-amber-200">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <img
            src={NutmegLogo}
            alt="Nutmeg Bijoux Logo"
            className="h-14 w-14 rounded-full shadow-lg"
          />
          <div>
            <h1 className="text-3xl font-bold text-[#480E1E]">Nutmeg Bijoux</h1>
            <p className="text-sm text-[#904A4A]">Ecom Version 1.0</p>
          </div>
        </div>

        {/* Login/Logout and Cart Icons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="text-[#480E1E] hover:text-red-600 flex items-center space-x-1"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="text-[#480E1E] hover:text-green-700 flex items-center space-x-1"
            >
              <LogIn className="w-5 h-5" />
              <span>Login</span>
            </Link>
          )}

          <Link
            to="/cart"
            className="text-[#480E1E] hover:text-pink-600 flex items-center space-x-1 relative"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1.5">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="w-full flex justify-center space-x-6 mt-4 text-xl font-semibold shadow-md border-t border-amber-200 py-2 relative z-10">
        <Link to="/home" className="text-[#480E1E] hover:underline">
          Home
        </Link>

        <Link to="/toppicks" className="text-[#480E1E] hover:underline">
          Top Picks
        </Link>

        {/* Elements of Elegance Dropdown */}
        <div className="group relative">
          <button className="text-[#480E1E] hover:underline">
            Elements of Elegance
          </button>
          <div className="absolute hidden group-hover:block bg-white text-[#480E1E] shadow-md rounded-md mt-2 w-48">
            <Link to="/elegance/gold" className="block px-4 py-2 hover:bg-amber-100">Gold</Link>
            <Link to="/elegance/silver" className="block px-4 py-2 hover:bg-amber-100">Silver</Link>
            <Link to="/elegance/diamond" className="block px-4 py-2 hover:bg-amber-100">Diamond</Link>
            <Link to="/elegance/platinum" className="block px-4 py-2 hover:bg-amber-100">Platinum</Link>
          </div>
        </div>

        {/* Jewelry Dropdown */}
        <div className="group relative">
          <button className="text-[#480E1E] hover:underline">
            Adornments
          </button>
          <div className="absolute hidden group-hover:block bg-white text-[#480E1E] shadow-md rounded-md mt-2 w-48">
            <Link to="/jewelry/rings" className="block px-4 py-2 hover:bg-amber-100">Rings</Link>
            <Link to="/jewelry/bracelets" className="block px-4 py-2 hover:bg-amber-100">Bracelets</Link>
            <Link to="/jewelry/bangles" className="block px-4 py-2 hover:bg-amber-100">Bangles</Link>
            <Link to="/jewelry/necklaces" className="block px-4 py-2 hover:bg-amber-100">Necklaces</Link>
            <Link to="/jewelry/rings" className="block px-4 py-2 hover:bg-amber-100">Studs</Link>
            <Link to="/jewelry/bracelets" className="block px-4 py-2 hover:bg-amber-100">Anklets</Link>
            <Link to="/jewelry/bangles" className="block px-4 py-2 hover:bg-amber-100">Harams</Link>
            <Link to="/jewelry/necklaces" className="block px-4 py-2 hover:bg-amber-100">Chains</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
