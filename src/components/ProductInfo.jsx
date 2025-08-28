import React from "react";

const ProductInfo = ({ product }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600">SKU: {product.sku}</p>
      <p className="text-xl text-pink-600 font-semibold mt-3">
        ₹{product.price.total}
      </p>

      <button className="w-full mt-4 bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600">
        Add to Cart
      </button>
      <button className="w-full mt-2 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700">
        Buy Now
      </button>
    </div>
  );
};

export default ProductInfo;
