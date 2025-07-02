import React from 'react';
import Header from '../components/Header.jsx';

const ProductListPage = () => {

const products = [
  
  {
    id: 1,
    name: 'Gold Necklace',
    price: '$2000',
    image: 'https://via.placeholder.com/150?text=Necklace', 
  },
  {
    id: 2,
    name:  'Silver Earrings',
    price: '$50',
    image: 'https://via.placeholder.com/150?text=Earringse',
  },
  {
    id: 3,
    name: 'Ring',
    price: '$100',
    image: 'https://via.placeholder.com/150?text=Ring',
  },
];

  return (
    <>  
      <Header />      
      <div className="min-h-screen bg-gray-100 py-10 px-4">
         <h1 className="text-3xl font-bold text-center mb-8">Jewellery Collection</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
               {products.map((product) => ( 
                  <div key={product.id} className="bg-white p-4 rounded shadow">
                     <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
                       <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
                         <p className="text-gray-600">{product.price}</p>
                           <button className="mt-3 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-blue-700">Add to Cart</button>
                  </div>
                ))}
            </div>
      </div>
    </>
        );
};

export default ProductListPage;               
