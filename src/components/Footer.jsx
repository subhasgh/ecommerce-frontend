import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-6 mt-10">
      <div className="container mx-auto px-4 text-center space-y-3">
        <p>© 2025 Nutmeg Company Limited. All Rights Reserved.</p>
        <div className="flex justify-center space-x-6 text-sm">
          <a href="/terms" className="hover:text-gray-800">Terms & Conditions</a>
          <a href="/privacy" className="hover:text-gray-800">Privacy Policy</a>
          <a href="/disclaimer" className="hover:text-gray-800">Disclaimer</a>
          <a href="/contact" className="hover:text-gray-800">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
