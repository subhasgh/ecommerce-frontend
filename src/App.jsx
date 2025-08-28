


{/*
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen.jsx';
import HomePage from './pages/HomePage.jsx';
import DailyMetalRate from './components/DailyMetalRate.jsx';
import Header from './components/Header.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
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
        <Route path="/register" element={<RegisterPage />} />
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
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
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


 function App() 
{
  const location = useLocation();
return (
<>
<ToastContainer />
{/* <ProductDetailPage />; */}
 {location.pathname !== '/' && <DailyMetalRate />}

<nav className="flex gap-4 p-4 bg-gray-200">
<Link to="/register">Register</Link>
<Link to="/login">Login</Link>
<Link to="/forgot-password">Forgot Password</Link>
<Link to="/otp">Forgot Password</Link>
<Link to="/reset-password">Reset Password</Link>
</nav>
<Routes>
  <Route path="/" element={<SplashScreen />} />
  <Route path="/home" element={<HomePage />} />
  <Route path="/collections/gold/earrings" element={<GoldEarringsPage />} />
  <Route path="/products" element={<ProductListPage />} />
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
//  <Route path="/forgotpassword" element={<ForgotPassword />}/>
 //  <Route path="/otp" element={<OtpVerification email="test@gmail.com" onSuccess={() => alert('OTP Verified')}  />}/>
 <Route path="/otp" element={<OtpVerification />}/>
 <Route path="/productdetail" element={<ProductDetailPage />} />


 </Routes>


</>
);
}

export default App;
 



