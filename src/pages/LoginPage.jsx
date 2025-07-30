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
  
  const[passwordRules, setPassowordRules] = useState({
    length: 'false',
    upper: 'false',
    special: 'false'
  });
  const [showPasswordRules, setShowPasswordRules] = useState(false);

  const validatePasswordRules = (value) => {
    setPassowordRules({
      length: value.length >= 6,
      upper: /[A-Z]/.test(value),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    })
  }
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
    alert("Login Successful"); 
    navigate(from);
   };
   const isPasswordValid = Object.values(passwordRules).every(Boolean)
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
 <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm  bg-white p-6 rounded shadow">
 
<input type="email" placeholder="Enter your email here" className="border p-2 rounded" value={email} onChange={(e) =>
    setEmail(e.target.value)} />
   {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
   
 <input type="password" placeholder="Enter your password here" className="border p-2 rounded" value={password} onChange={(e) =>
    {setPassword(e.target.value); 
    validatePasswordRules(e.target.value);
    }}
    onFocus={() => setShowPasswordRules(true)}
    />
   {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
{/* password rules */}
{showPasswordRules && (
   <div className="text-sm mt-2 space-y-1">
            <p
              className={
                passwordRules.length ? 'text-green-600' : 'text-gray-600'
              }
            >
              • At least 6 characters
            </p>
            <p
              className={
                passwordRules.upper ? 'text-green-600' : 'text-gray-600'
              }
            >
              • At least 1 uppercase letter
            </p>
            <p
              className={
                passwordRules.special ? 'text-green-600' : 'text-gray-600'
              }
            >
              • At least 1 special character (!@#$%^&)
            </p>
          </div>
)}
<p className="text-sm text-right text-blue-600 hover:underline cursor-pointer">
  <Link to="/forgot-password">Forgot Password?</Link>
</p>

 {/* <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Login</button> */}
 <button type='submit' disabled={!isPasswordValid} 
 className={`px-6 py-2 rounded transition ${
  isPasswordValid?'bg-blue-600 text-white hover:bg-blue-700':'bg-gray-300 text-gray-500 cursor-not-allowed'
 }`}>Login</button>

 <p className='mt-4 text-sm text-center text-gray-600'>Don't have an account?{' '}
  <Link to='/registered' className='text-pink-600 underline'>Register</Link>
 </p>
  {/* <div className="mb-4 ">
   <label className="block text-gray-700 mb-2">Email</label>
   <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="w-full px-4 py-2 border rounded"/>
  </div> 

  <div className="mb-6">
   <label className="block text-gray-700 mb-2">Password</label> 
   <input type="password" name="password" value={form.password} onChange={handleChange} placeholder=".........." className="w-full px-4 py-2 border rounded"/>
  </div>
 
  <button type="submit" className="w-full  bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition">Login</button>
  <p className="mt-4 text-sm text-center text-gray-600">Dont have an account?{' '}
    <Link to="/register" className="text-pink-600 underline">Register</Link>
 </p> */}
</form>
</div>
</>
       );
};

export default LoginPage;

