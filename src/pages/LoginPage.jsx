import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
const LoginPage = () => 
{
return (
<>
<Header />
<div className="min-h-screen flex items-center justify-center bg-gray-100">
<div className="bg-white p-6 rounded shadow-md w-80">
<h2 className="text-xl font-bold mb-4 text-center">Login</h2>
<form>
<input type="email" placeholder="Email" className="w-full mb-3 p-2 border rounded" />
<input type="password" placeholder="Password" className="w-full mb-4 p-2 border rounded" />
<button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
</form>
<Link to="/products" className="mt-4 block text-center text-blue-600 underline">View Products</Link>
</div>
</div>
</>
);
};
export default LoginPage;

