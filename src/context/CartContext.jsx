
import React, { createContext, useState, useEffect} from 'react';

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
   const [cartItems, setCartItems] = useState(() => {
      const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];

   })
     useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter(item => item.id !== id));
  };

  const updateItemQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };



    return (
           <CartContext.Provider value={{cartItems, setCartItems, addToCart, removeFromCart, updateItemQuantity }}> {children} </CartContext.Provider>
           );
   };


