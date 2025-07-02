import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import ProductListPage from './pages/ProductListPage.jsx';
 
function App() 
{
return (
<Routes>
  <Route path="/" element={<LoginPage />} />
  <Route path="/products" element={<ProductListPage />} />
</Routes>
);
}
export default App;
 

