


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import nutmegLogo from '../assets/nutmeg-logo.png';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    const navTimer = setTimeout(() => {
      navigate('/home');
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div
      className={`h-screen w-screen flex flex-col items-center justify-center bg-white 
      transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <img src={nutmegLogo} alt="Nutmeg Logo" className="w-40 h-40 mb-3" />
      {/* <p className="text-gray-600 font-semibold text-sm">Ecomm Version 1.0</p> */}
    </div>
  );
};

export default SplashScreen;


{/*

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import nutmegLogo from '../assets/nutmeg-logo.png';

const SplashScreen = () => { 
{
   const navigate = useNavigate();
   const [fadeOut, setFadeOut] = useState(false);
   useEffect(() => {
      const fadeTimer = setTimeout(() => {
       setFadeOut(true);
       // navigate('/home'); //For redirecting after 2 seconds
        }, 2500);
const navTimer = setTimeOut(() => {
navigate('/home');
}, 3000);
  return () => { clearTimeout(fadeTimer);
                 clearTimeout(navTimer); };
    }, [navigate]);
  return ( 
            <div className="h-screen w-screen flex flex-col items-center justify-center bg-white
                 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}">
               <img src={nutmegLogo} alt="Nutmeg Logo" className="w-40 h-40 mb-3" />
                 <p className="text-gray-600 font-semibold text-sm">Ecomm Version 1.0</p> 
            </div>
         );
};


export default SplashScreen; 
    
*/}
