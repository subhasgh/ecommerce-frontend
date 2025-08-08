

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
     {showLogoutMessage && (
      <div className='fixed top-5 right-5 z-50 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300'>
        Logged Out Successfully!
        
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


