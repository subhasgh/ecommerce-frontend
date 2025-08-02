  import React, {useState,useEffect} from 'react'
  import { useNavigate } from 'react-router-dom';
  import Header from '../components/Header';


  const RegisterPage = () => {
    const [form, setForm] = useState({ email: '', password: '', confirmPassword: '', mobile: '' });
    const [error, setError] = useState({});
    const [passwordStrength, setPasswordStrength] = useState('')
    const [showSuccess, setShowSuccess] = useState(false) 
    const navigate = useNavigate();
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
      const errors = {};
      if (!form.email) errors.email = 'Email is required';
      if (!form.password || form.password.length < 6)
        errors.password = 'Password must be at least 6 characters';
      if (form.password !== form.confirmPassword)
        errors.confirmPassword = 'Passwords do not match';
      if(!form.mobile) {
        errors.mobile = 'Mobile number is required';
      }else if(!/^\d{10}$/.test(form.mobile)){
        errors.mobile = 'Enter a valid 10-digit mobile number'
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

      // alert('Registered successfully!');
      // navigate('/login');
    };
    useEffect(() => {
    const checkStrength = () => {
      const password = form.password;
      let strength = 0;
      if (password.length >= 8) strength += 2;
      if (/[A-Z]/.test(password)) strength += 1;
      if (/[0-9]/.test(password)) strength += 1;
      if (/[^A-Za-z0-9]/.test(password)) strength += 1;

      if (strength <= 1) setPasswordStrength('Weak');
      else if (strength <= 3) setPasswordStrength('Medium');
      else setPasswordStrength('Strong');
    };

    if (form.password) {
      checkStrength();
    } else {
      setPasswordStrength('');
    }
  }, [form.password]);
    return (
        <>
        <Header />
        {showSuccess && (
  <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-all duration-300 z-50">
    Registered successfully!
  </div>
)}
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 pt-24">
          <form onSubmit={handleSubmit} autoComplete='off' className="bg-white p-6 rounded shadow max-w-sm w-full space-y-4">
            <h2 className="text-2xl font-bold text-center text-pink-700">Sign Up</h2>
{/* email field */}
            <div className='space-y-1'>
            <input
              type="email" autoComplete='new-email'
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="border p-2 rounded-full w-full"
            />
            {error.email && <p className="text-red-500 text-sm ">{error.email}</p>}
            </div>

           {/* mobile field */}
            <div className='space-y-1'>
              <input type='tel' name='mobile' placeholder='Mobile number' value={form.mobile} onChange={handleChange}
              className="border p-2 rounded-full w-full "
  autoComplete="new-mobile"/>
  {error.mobile && (
  <p className="text-red-500 text-sm ">{error.mobile}</p>
)}
  </div>
  {/* password field */}
  <div className='space-y-1'>
    <input
      type="password" autoComplete='off'
      name="password"
      placeholder="Password"
      value={form.password}
      onChange={handleChange}
      className="border p-2 rounded-full w-full"
    />
    {error.password && (
      <p className="text-red-500 text-sm ">{error.password}</p>
    )}
    

    {form.password && (
      <p
        className={`text-sm mt-1 ${
          passwordStrength === 'Weak'
            ? 'text-red-500'
            : passwordStrength === 'Medium'
            ? 'text-yellow-500'
            : 'text-green-600'
        }`}
      >
        Strength: {passwordStrength}
      </p>
    )}
    </div>

{/* confirm password */}
<div className='space-y-1'>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="border p-2 rounded-full w-full"
            />
            {error.confirmPassword && (
              <p className="text-red-500 text-sm ">{error.confirmPassword}</p>
            )}
            </div>
           

            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-700">
              Register
            </button>
          </form>
        </div>
      </>
    )
  }

  export default RegisterPage