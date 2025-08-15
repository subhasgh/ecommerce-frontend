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
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false)
  
 
  
  
  const[passwordRules, setPasswordRules] = useState({
    length: 'false',
    upper: 'false',
    special: 'false'
  });
  const [showPasswordRules, setShowPasswordRules] = useState(false);

  const validatePasswordRules = (value) => {
    setPasswordRules({
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
    setShowSuccess(true)
    setTimeout(()=>{
      setShowSuccess(false)
      navigate(from)
    },5000)
   };
  const isPasswordValid = password.length>=6;
return (
<>
<Header />
{/* new model 2 */}
{showSuccess && (
  <div className="fixed top-5 right-5 z-50 animate-slide-in flex flex-col bg-green-100 border border-green-300 text-green-800 rounded-lg shadow-lg w-72 overflow-hidden">
    
    {/* Message Row */}
    <div className="flex items-center gap-2 px-4 py-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-green-600"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414L9 14.414 5.293 10.707a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      <span className="font-medium">Login successful!</span>
    </div>

    {/* Progress Bar */}
    <div className="h-1 bg-green-300">
      <div className="h-1 bg-green-500 animate-progress"></div>
    </div>
  </div>
)}

<div className="min-h-screen flex flex-col justify-start pt-32 items-center" style={{backgroundColor: '#fef6e4'}}>
 <div className="text-6xl font-bold text-pink-1000 flex items-end justify-start mb-10 ml-1">NutMe
 <span className="relative inline-block">
  <img src={nutmegLogo}  alt="Nutmeg Logo" className="w-30 absolute -top-7 left-3/2 -translate-x-3/2" />g
 </span>
 </div>
<p className="text=lg md:text-xl font-medium text-pink-700 mb-6">Ecomm version 1.0</p>
 <form onSubmit={handleLogin} autoComplete='off' className="flex flex-col gap-4 w-full max-w-sm  bg-white p-6 rounded shadow">
 
<input type="email" name='user_email' autoComplete='off' placeholder="Enter your email" className="border p-2 rounded-full" value={email} onChange={(e) =>
    setEmail(e.target.value)} />
   {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
   
 <input type="password" name='user_password'autoComplete='off'  placeholder="Enter your password" className="border p-2 rounded-full" value={password} onChange={(e) =>
    setPassword(e.target.value)} />
   
    
   
<p className="text-sm text-right text-blue-600 hover:underline cursor-pointer">
  <Link to="/forgot-password">Forgot Password?</Link>
</p>

 <button type="submit" className="block w-1/2 mx-auto bg-gradient-to-r from-pink-300 to-rose-400 text-white font-medium py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-300">Login</button>
 </form>
{/* <p className='mt-4 text-sm text-center text-gray-600'>New User?{' '}
  <Link to='/registered' className='text-amber-900 underline'> Sign Up</Link>
 </p> */}
 <div className="mt-6 text-sm text-center">
          <span className="text-gray-700">New User?</span>{' '}
          <Link
            to="/registered"
            className=" font-semibold underline transition-colors duration-200"style={{color: '#9b1c1c'}}
          >
            Sign up 
          </Link>
        </div>
  

</div>
</>
       );
};

export default LoginPage;

