


import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen.jsx';
import HomePage from './pages/HomePage.jsx';
import DailyMetalRate from './components/DailyMetalRate.jsx';
import Header from './components/Header.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import { ToastContainer } from 'react-toastify';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminPage from './pages/AdminPage.jsx';
import ProductListPage from './pages/ProductListPage.jsx';
import GoldEarringsPage from './pages/GoldEarringsPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import ThankyouPage from './pages/ThankyouPage.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx'; 
import OtpVerification from './pages/OtpVerification.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';

function App() {
  const location = useLocation();
  const handleSuccess = () => {
    console.log("OTP verified successfully!");
    // Navigate to Reset Password page or perform any other action
  };


  return (
    <>
      <ToastContainer />
      {/* <ProductDetailPage />; */}
     {/* {location.pathname !== '/' && <DailyMetalRate />} */} 

      {/* <nav className="flex gap-4 p-4 bg-gray-200">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/forgot-password">Forgot Password</Link>
        <Link to="/otp">Forgot Password</Link>
        <Link to="/reset-password">Reset Password</Link>
      </nav> */}

      

      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/collections/gold/earrings" element={<GoldEarringsPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />    {/* ✅ Dynamic product detail */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/thankyou" element={<ThankyouPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/reset-password" element={<ResetPasswordPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        {/* <Route path="/forgotpassword" element={<ForgotPassword />}/> */}
        {/*  <Route path="/otp" element={<OtpVerification email="test@gmail.com" onSuccess={() => alert('OTP Verified')}  />}/> */}
               {/* <Route path="/otp-verification/:userId" element={<OtpVerification onSuccess={handleSuccess} />} /> */}
        <Route path="/otp" element={<OtpVerification />}/>
        {/* <Route path="/productdetail" element={<ProductDetailPage />} /> */} {/* ✅ Kept your old static route */}
      </Routes>
    </>
  );
}

export default App;






