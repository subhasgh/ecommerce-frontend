

import React, {useContext,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

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
     <>
     {/* logout success toast */}
     {/* {showLogoutMessage && (
      <div className='fixed top-5 right-5 z-50 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300'>
        Logged Out Successfully!
        
    </div>
     )} */}
     {/* new logout model  */}
     {showLogoutMessage && (
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
      <span className="font-medium">Logged Out Successfully!</span>
    </div>

    {/* Progress Bar */}
    <div className="h-1 bg-green-300">
      <div className="h-1 bg-green-500 animate-progress"></div>
    </div>
  </div>
)}

       <header className="bg-black text-white  py-8 min-h-[300px] shadow-lg border-b-4 border-yellow-400">
         <div className="container mx-auto flex flex-col items-center justify-center space-y-20">
           <p className="text-base md:text-lg lg:text-lg"></p> 
            <h1 className="text-7xl font-extrabold uppercase text-yellow-500 tracking-wide mb-3">Nutmeg Bijoux</h1> 
             <div className="flex space-x-4">
              <nav className="flex flex-col mt-2 md:flex-row md:space-x-4 space-y-2 md:space-y-0 items-center">
                <Link to="/home" className="mr-4 text-lg md:text-xl font-medium text-cyan-400 hover:text-blue-600">Home</Link>
                <Link to="/products" className=" mr-4 text-lg md:text-xl font-medium text-cyan-400 hover:underline hover:text-blue-600">Products</Link>
                <Link to="/cart" className="text-lg md:text-xl  font-medium text-cyan-400 hover:underline hover:text-blue-600">Go to Cart</Link>
                        {!isLoggedIn ? (               
                        <Link to="/login"  className=" mr-4 text-lg md:text-xl font-medium text-cyan-400 hover:underline hover:text-bue-600">Login</Link>
                          ) : (
                         <>
                         <Link to="/login" onClick={handleLogout} className=" mr-4 text-lg md:text-xl font-medium text-cyan-400 hover:underline hover:text-blue-600">Logout</Link>
                      </>
                         )
}
                   </nav>
               </div>
</div>      
      </header>
</>
          );
};
export default Header; 


