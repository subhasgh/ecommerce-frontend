import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminPage from './pages/AdminPage.jsx';
import ProductListPage from './pages/ProductListPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import ThankyouPage from './pages/ThankyouPage.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx'; 
import RegisterPage from './pages/RegisterPage.jsx';

function App() 
{
return (
<>
<Routes>
  <Route path="/" element={<SplashScreen />} />
  <Route path="/home" element={<HomePage />} />
  <Route path="/products" element={<ProductListPage />} />
  <Route path="/cart" element={<CartPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegistrationPage />} />
  <Route path="/adminlogin" element={<AdminLogin />} />
  <Route path="/admindashboard" element={<AdminDashboard />} />
  <Route path="/admin" element={<AdminPage />} />
  <Route path="/checkout" element={<CheckoutPage />} />
  <Route path="/thankyou" element={<ThankyouPage />} />
  <Route path="/forgot-password" element={<ForgotPassword />}/>
  <Route path="/register" element={<RegisterPage />}/>
</Routes>
</>
);
}

export default App;
 

