import React, { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => 
{
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   useEffect(() => {
   if (import.meta.env.DEV) {
       localStorage.clear();
                         }
   const storedLogin = localStorage.getItem('isLoggedIn');
    //  setIsLoggedIn(storedLogin === 'true'); }, []);
        if (storedLogin === 'true') 
          { setIsLoggedIn(true); }
                  }, []); 
   const login = () => {
           setIsLoggedIn(true);
           localStorage.setItem('isLoggedIn', 'true');
                     };
   const logout = () => {
           setIsLoggedIn(false);
           localStorage.removeItem('isLoggedIn');   
                       };
   return (
     <AuthContext.Provider value={{ isLoggedIn, login, logout }}> 
        {children}
     </AuthContext.Provider>
          );
};


