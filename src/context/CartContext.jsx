
import React, { createContext, useState } from 'react';

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
   const [cartItems, setCartItems] = useState([]);
    return (
           <CartContext.Provider value={{cartItems, setCartItems }}> {children} </CartContext.Provider>
           );
   };

//const value = { cartItems, addToCart, };

// const addToCart = (product) => { setCartItems((prev) => [...prev,product]); };

