import React from 'react';
import ReactDOM  from 'react-dom/client'; 
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import './index.css';
import { CartProvider } from './context/CartContext.jsx';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);




