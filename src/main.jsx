import React from 'react';
import ReactDOM  from 'react-dom/client'; 
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import './index.css';
import { CartProvider } from './context/CartContext.jsx';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <AdminProvider>
          <CartProvider>
            <App />
          </CartProvider>
          </AdminProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);




