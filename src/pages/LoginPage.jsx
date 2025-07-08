import React, {useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { useLocation } from 'react-router-dom';
import nutmegLogo from '../assets/nutmeg-logo.png';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();  
  const location = useLocation();
  const from = location.state?.from || '/products';
  {/* const { setIsLoggedIn } = useContext(UserContext); */}
  const handleLogin = () => {
    {/* setIsLoggedIn(true); */}
    login();
    alert("Login Successful"); 
    console.log("Redirecting to:", from);
    navigate(from);
  };
  
return (
<>
<Header />
<div className="min-h-screen flex flex-col justify-start pt-32 items-center bg-gray-100">
 <div className="text-6xl font-bold text-pink-1000 flex items-end justify-center mb-3">NutMe
 <span className="relative inline-block">
  <img src={nutmegLogo}  alt="Nutmeg Logo" className="w-30 absolute -top-7 left-3/2 -translate-x-3/2" />g
 </span>
 </div>
<p className="text=lg md:text-xl font-medium text-pink-700 mb-6">Ecomm version 1.0</p>
 {/* <h2 className="text-2xl font-bold mb-6 text-center">Login to Nutmeg Bijoux</h2> */}
  <div className="flex justify-center items-center min-h-screen">
  <button onClick={handleLogin} className="text-2xl font-bold bg-blue-600 text-cyan-200 px-6 py-4 rounded hover:bg-white-700">Login</button>
</div>
</div>
</>
       );
};

export default LoginPage;

