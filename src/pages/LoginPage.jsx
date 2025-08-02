import React, { useState, useContext } from 'react';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false)
  
  // const[passwordRules, setPasswordRules] = useState({
  //   length: 'false',
  //   upper: 'false',
  //   special: 'false'
  // });
  
  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
      else if (password.length < 6)
          newErrors.password = 'Password must be atleast 6 characters';
          return newErrors;
   }; 
  
    const handleLogin = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0)
      {
        setErrors(validationErrors);
        return;
      };   

    login();
    setShowSuccess(true)
    setTimeout(()=>{
      setShowSuccess(false)
      navigate(from)
    },3000)
   };
  
  const isPasswordValid = password.length>=6;
return (
<>
<Header />
{showSuccess && (
  <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-all duration-300 z-50">
    Login successful!
  </div>
)}
<div className="min-h-screen flex flex-col justify-start pt-32 items-center bg-gray-100">
 <div className="text-6xl font-bold text-pink-1000 flex items-end justify-center mb-3">NutMe
 <span className="relative inline-block">
  <img src={nutmegLogo}  alt="Nutmeg Logo" className="w-30 absolute -top-7 left-3/2 -translate-x-3/2" />g
 </span>
 </div>
<p className="text=lg md:text-xl font-medium text-pink-700 mb-6">Ecomm version 1.0</p>
 <form onSubmit={handleLogin} autoComplete='off' className="flex flex-col gap-4 w-full max-w-sm  bg-white p-6 rounded shadow">
 
<input type="email" name='user_email' autoComplete='off' placeholder="Enter your email here" className="border p-2 rounded-full" value={email} onChange={(e) =>
    setEmail(e.target.value)} />
   {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
   
 <input type="password" name='user_password'autoComplete='off'  placeholder="Enter your password here" className="border p-2 rounded-full" value={password} onChange={(e) =>
    setPassword(e.target.value)} />
   
    
   
<p className="text-sm text-right text-blue-600 hover:underline cursor-pointer">
  <Link to="/forgot-password">Forgot Password?</Link>
</p>

 <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">Login</button>
 {/* <button type='submit' disabled={!isPasswordValid} 
 className={`px-6 py-2 rounded-full transition ${
  isPasswordValid?'bg-blue-600 text-white hover:bg-blue-700':'bg-gray-300 text-gray-500 cursor-not-allowed'
 }`}>Login</button> */}

 <p className='mt-4 text-sm text-center text-gray-600'>Don't have an account?{' '}
  <Link to='/registered' className='text-amber-900 underline'> Sign Up</Link>
 </p>
  
</form>
</div>
</>
       );
};

export default LoginPage;

