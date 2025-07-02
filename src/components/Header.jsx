import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

   return (

       <header className="bg-black shadow-md py-20 px-40 flex justify-between items-center">
           <p class="text-base md:text-lg lg:text-2xl"></p>
           <p className="text-5xl text-yellow-500">Nutmeg Bijoux</p>
            <nav>
              <Link to="/" className="mr-4 text-cyan-400 hover:text-blue-600">Login</Link>
              <Link to="/products" className="text-cyan-400 hover:text-blue-600">Products</Link>
            </nav>
       </header>
          );
};

export default Header;

