import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProductListPage from './pages/ProductListPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import ThankyouPage from './pages/ThankyouPage.jsx'; 

function App() 
{
return (
<Routes>
  <Route path="/" element={<SplashScreen />} />
  <Route path="/home" element={<HomePage />} />
  <Route path="/products" element={<ProductListPage />} />
  <Route path="/cart" element={<CartPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/checkout" element={<CheckoutPage />} />
  <Route path="/thankyou" element={<ThankyouPage />} />
</Routes>
);
}

export default App;
 

