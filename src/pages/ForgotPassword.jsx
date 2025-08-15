import React, { useState }from 'react'
import Header from '../components/Header.jsx';
import nutmegLogo from '../assets/nutmeg-logo.png';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatus('Please enter your email.');
      return;
    }

    try {
      const response = await fetch('/api/request-password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('A reset link has been sent to your email.');
      } else {
        setStatus('Failed to send reset email. Please try again.');
      }
    } catch (err) {
      setStatus('Server error.');
    }
  };

  return (
    <>
    <Header />
   
    
    <div className="min-h-screen flex flex-col justify-center items-center relative "style={{backgroundColor:'#fef6e4'}}>
 
    {/* links */}
  <div className="absolute top-4  right-6   flex gap-x-3 text-sm font-semibold underline text-blue-500">
    <a href="/login">Sign In</a>
    
  </div>   
  {/* logo */}
     <div className="text-5xl font-bold text-pink-1000 flex items-end justify-start mb-10 ml-1 ">NutMe
               <span className="relative inline-block">
                <img src={nutmegLogo}  alt="Nutmeg Logo" className="w-10 absolute -top-6 left-1/2 -translate-x-1/2" />g
               </span>
               
               </div>
               
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow relative ">
      
        
        <h2 className="text-2xl font-bold text-center mb-4" style={{color: '#9b1c1c'}}>Forgot Password</h2>
        <p className="mb-4 text-sm text-gray-600">
          Enter your registered email address. We will send you a password reset link.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            autoComplete='off'
            className="border p-2 rounded-full"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="block w-1/2 mx-auto bg-gradient-to-r from-pink-300 to-rose-400 text-white font-medium py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-300"
            // className='bg-gradient-to-r from-blue-500  to-indigo-500 text-white font-semibold text-sm py-1.5 px-4 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400'
          >
            Next
          </button>
        </form>
      
        {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
      </div>
    </div>
   
    </>
  )
}

export default ForgotPassword
