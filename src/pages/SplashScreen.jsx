import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import nutmegLogo from '../assets/nutmeg-logo.png';

const SplashScreen = () => { 
{
   const navigate = useNavigate();
   useEffect(() => {
      const timer = setTimeout(() => {
        navigate('/home'); //For redirecting after 2 seconds
        }, 3000);

  return () => clearTimeout(timer); }, [navigate]);
  return ( 
            <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
               <img src={nutmegLogo} alt="Nutmeg Logo" className="w-40 h-40 mb-3" />
              {/*    <p className="text-gray-600 font-semibold text-sm">Ecomm Version 1.0</p> */}
            </div>
         );
};
};

export default SplashScreen; 
    
