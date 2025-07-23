import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const RegistrationPage = () => {
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',

    confirmPassword: ''
    });
const [errors, setErrors] = useState({});
const validate = () => {
  const newErrors = {};
  if (!formData.name.trim())
     newErrors.name = 'Name is required';
  if (!formData.email.trim())
     newErrors.email = 'Email is required';
  else if (!/^[^#s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
     newErrors.email = 'Invalid email format';
  if (!formData.password)
     newErrors.password = 'Password is required';
  else if (formData.password.length < 6)
     newErrors.password = 'Password must be atleast 6 characters';
  if (!formData.confirmPassword)
     newErrors.confirmPassword = 'Confirm your password';
  else if (formData.password !== formData.confirmPassword)
     newErrors.confirmPassword = 'Passwords do not match';
  return newErrors;
 };

const handleSubmit = (e) => {
 e.preventDefault();
 const formErrors = validate();
 if (Object.keys(formErrors).length > 0)
    {
      setErrors(formErrors);
    } 
 else 
    {
      alert('Registration Successful!!');
      navigate('/login');
    }
 };

  return (
   <>
     <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow-md">

        <div className="mb-4">
        <label className="block text-gray-700 mb-2">Full Name</label>
        <input type="text" className="w-full px-4 py-2 border rounded" value={formData.name} onChange={(e) =>
           setFormData({ ...formData, name: e.target.value })} />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>  
        <div className="mb-4">
         <label className="block text-gray-700">Email</label>
        <input type="email"  
            className="w-full px-4 py-2 border rounded" value={formData.email} onChange = {(e) =>
            setFormData({ ...formData, email: e.target.value })} />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

         <div className="mb-4"> 
         <label className="block text-gray-700">Password</label>
        <input type="password"  className="w-full px-4 py-2 border rounded" placeholder="John@example.com" value={formData.password} onChange = {(e) => 
            setFormData({ ...formData, password: e.target.value })} />
                {errors.password && ( <p className="text-red-500 text-sm mt-1">{errors.password}</p>)}
        </div>
        
         <div className="mb-4">
         <label className="block text-gray-700">Confirm Password</label>
        <input type="password" className="w-full px-4 py-2 border rounded" value={formData.confirmPassword} onChange = {(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })} />
                {errors.confirmPassword && ( <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>)}
        </div>

        <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition">Register</button>
        </form>
        </div>
      </>
);
};

export default RegistrationPage;
        
          
