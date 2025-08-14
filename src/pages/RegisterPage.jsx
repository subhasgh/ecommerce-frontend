  import React, {useState,useEffect} from 'react'
  import { useNavigate } from 'react-router-dom';
  import Header from '../components/Header';
  import { Link } from 'react-router-dom';
  import {Eye, EyeOff} from 'lucide-react';
  import nutmegLogo from '../assets/nutmeg-logo.png';


  const RegisterPage = () => {
    const [form, setForm] = useState({ email: '', mobile: '', password: ''});
    const [error, setError] = useState({});
    const [passwordStrength, setPasswordStrength] = useState('')
    const [showSuccess, setShowSuccess] = useState(false) 
    const [showPassword, setShowPassword] = useState(false)
    
    const navigate = useNavigate();
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
      const errors = {};
      // email regex
       const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      //  mobile regex
      const mobilePattern = /^\d{10}$/;
      // password regex
      const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
      // email validation 
      if (!form.email) {
        errors.email = 'Email is required';
      }else if(!emailPattern.test(form.email)){
        errors.email = 'Enter a valid email address';
}
// mobile validation 
 if (!form.mobile) {
    errors.mobile = 'Mobile number is required';
  } else if (!mobilePattern.test(form.mobile)) {
    errors.mobile = 'Enter a valid 10-digit mobile number';
  }
  // password validation 
      if (!form.password){
        error.password = "Password is required";
} else if(!passwordPattern.test(form.password)){
   errors.password = 'Password must be at least 6 characters and include a uppercase letter, a number, and a special character';
  }
        return errors;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setError(validationErrors);
        return;
      }
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        navigate('/login')
      },5000)

   
    };
    useEffect(() => {
  const password = form.password;
  let score = 0;

  // Length points (up to 3)
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;

  // Character variety points
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  // Convert score to percentage (max score 6)
  const percentage = Math.min((score / 6) * 100, 100);
  setPasswordStrength(percentage);
}, [form.password]);
   
    return (
        <>
        <Header />
   {/* new model */}
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
      <span className="font-medium">Registered Successfully!</span>
    </div>

    {/* Progress Bar */}
    <div className="h-1 bg-green-300">
      <div className="h-1 bg-green-500 animate-progress"></div>
    </div>
  </div>
)}


        <div className="min-h-screen flex flex-col items-center justify-center pt-8" style={{backgroundColor: '#fef6e4'}}>
           {/* logo */}
            <div className="text-5xl font-bold text-pink-1000 flex items-end justify-start mb-10 ml-1"  >NutMe
           <span className="relative inline-block">
            <img src={nutmegLogo}  alt="Nutmeg Logo" className="w-30 absolute -top-7 left-3/2 -translate-x-3/2" />g
           </span>
           </div>
          
          <form onSubmit={handleSubmit} autoComplete='off' className="bg-white p-6 rounded shadow max-w-sm w-full space-y-4 mt-1 ">
           
            <h2 className="text-lg font-bold text-center" style={{color: '#9b1c1c'}}>Sign Up</h2>
{/* email field */}
<div className='space-y-1'>
  {/* <label htmlFor='email' className='block text-sm font-medium text-pink-600 ml-3'>
    Email
  </label> */}

            
            <input
              type="email" autoComplete='new-email'
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="border p-2 rounded-full w-full"
            />
            {error.email && <p className="text-red-500 text-sm ">{error.email}</p>}
            </div>

           {/* mobile field */}
            <div className='space-y-1'>
              {/* <label htmlFor='mobile' className='block text-sm font-medium text-pink-600 ml-3'>
                Mobile
              </label> */}
              <input type='tel'  name='mobile' placeholder='Mobile number' value={form.mobile} onChange={handleChange}
              className="border p-2 rounded-full w-full "
  autoComplete="new-mobile"/>
  {error.mobile && (
  <p className="text-red-500 text-sm ">{error.mobile}</p>
)}
  </div>
  {/* password field */}
  <div className='space-y-1 relative'>
    {/* <label htmlFor='password' className='block text-sm font-medium text-pink-600 ml-3'>
      Password
    </label> */}
    <input
      type= {showPassword ? "text" : "password"}
      autoComplete='off'
      name="password"
      placeholder="Password"
      value={form.password}
      onChange={handleChange}
      className="border p-2 rounded-full w-full pr-10"
/>
{/* eye icon */}
<button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute top-3 right-3 flex items-center text-gray-500"
    
  >
    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
  </button>

    {error.password && (
      <p className="text-red-500 text-sm ">{error.password}</p>
    )}
    
{/* password strength progress */}
     
  {form.password && (
  <div className="mt-2">
    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full transition-all duration-300 ${
          passwordStrength < 30
            ? 'bg-red-500'
            : passwordStrength < 70
            ? 'bg-yellow-500'
            : 'bg-green-500'
        }`}
        style={{ width: `${passwordStrength}%` }}
      />
    </div>
    <p
      className={`text-sm mt-1 ${
        passwordStrength < 30
          ? 'text-red-500'
          : passwordStrength < 70
          ? 'text-yellow-500'
          : 'text-green-600'
      }`}
    >
      {passwordStrength < 30
        ? 'Weak'
        : passwordStrength < 80
        ? 'Medium'
        : 'Strong'}
    </p>
  </div>
)}
</div>
   {/* remember me checkbox */}

  <div className="flex items-center p-3 mt-4 space-x-2">
  <input
    type="checkbox"
    id="rememberMe"
    name="rememberMe"
    checked={form.rememberMe || false}
    onChange={(e) =>
      setForm({ ...form, rememberMe: e.target.checked })
    }
    // className="h-4 w-4 text-pink-500 border-gray-300 rounded focus:ring-pink-400"
  />
  <label
    htmlFor="rememberMe"
    className="text-sm text-gray-700 cursor-pointer "
  >
    Remember Me
  </label>
</div>
    
    
    <button type="submit" className="block w-1/2 mx-auto bg-gradient-to-r from-pink-300 to-rose-400 text-white font-medium py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-300 ">
              Register
            </button>
          </form>
           <div className="mt-3 text-sm text-center">
          <span className="text-gray-700">Already have an account?</span>{' '}
          <Link
            to="/login"
            className=" font-semibold underline transition-colors duration-200"style={{color: '#9b1c1c'}}
          >
            Sign In 
          </Link>
        </div>
        </div>
      </>
    )
  }
  
  export default RegisterPage