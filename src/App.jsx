


{/*
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen.jsx';
import HomePage from './pages/HomePage.jsx';
import DailyMetalRate from './components/DailyMetalRate.jsx';
import Header from './components/Header.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminPage from './pages/AdminPage.jsx';
import ProductListPage from './pages/ProductListPage.jsx';
import GoldEarringsPage from './pages/GoldEarringsPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import ThankyouPage from './pages/ThankyouPage.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === "/"; // Hide header on splash

  return (
    <>
      <DailyMetalRate />
      {!hideHeader && <Header />} 

      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/collections/gold/earrings" element={<GoldEarringsPage />} />
        <Route path="/jewels" element={<ProductListPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/thankyou" element={<ThankyouPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;

*/}



import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen.jsx';
import HomePage from './pages/HomePage.jsx';
import DailyMetalRate from './components/DailyMetalRate.jsx';
import Header from './components/Header.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminPage from './pages/AdminPage.jsx';
import ProductListPage from './pages/ProductListPage.jsx';
import GoldEarringsPage from './pages/GoldEarringsPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import ThankyouPage from './pages/ThankyouPage.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx'; 


 function App() 
{
  const location = useLocation();
return (
<>
 {location.pathname !== '/' && <DailyMetalRate />}

<Routes>
  <Route path="/" element={<SplashScreen />} />
  <Route path="/home" element={<HomePage />} />
  <Route path="/collections/gold/earrings" element={<GoldEarringsPage />} />
  <Route path="/products" element={<ProductListPage />} />
  <Route path="/cart" element={<CartPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegistrationPage />} />
  <Route path="/adminlogin" element={<AdminLogin />} />
  <Route path="/admindashboard" element={<AdminDashboard />} />
  <Route path="/admin" element={<AdminPage />} />
  <Route path="/checkout" element={<CheckoutPage />} />
  <Route path="/thankyou" element={<ThankyouPage />} />
  <Route path="/forgotpassword" element={<ForgotPassword />}/>
{/*  <Route path="/register" element={<RegisterPage />}/> */}
 </Routes>
</>
);
}

export default App;
 

