import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';


const RegisterPage = () => {
    const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState({});
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
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    alert('Registered successfully!');
    navigate('/login');
  };
  return (
      <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 pt-24">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-sm w-full space-y-4">
          <h2 className="text-2xl font-bold text-center text-pink-700">Register</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          {error.email && <p className="text-red-500 text-sm">{error.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          {error.password && <p className="text-red-500 text-sm">{error.password}</p>}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          {error.confirmPassword && (
            <p className="text-red-500 text-sm">{error.confirmPassword}</p>
          )}

          <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700">
            Register
          </button>
        </form>
      </div>
    </>
  )
}

export default RegisterPage