import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContent } from '../context/AppContext'; // Correct import
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { userData } = useContext(AppContent);

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleBuy = async () => {
    try {
      const { data } = await axios.post(`http://localhost:4000/api/products/buy/${product._id}`, {
        buyerId: userData._id,
      });
      if (data.success) {
        toast.success('Product bought successfully');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Error buying product');
    }
  };

  return (
    <div className='border rounded-lg p-4 m-4 cursor-pointer' onClick={handleCardClick}>
      <img src={product.image} alt={product.name} className='w-full h-48 object-cover rounded-lg' />
      <h2 className='text-xl font-semibold mt-2'>{product.name}</h2>
      <p className='text-gray-700'>${product.price}</p>
      {isExpanded && (
        <div className='mt-4'>
          <p className='text-gray-700'>{product.description}</p>
          <p className='text-gray-700'>Seller: {product.username}</p>
          <button className='mt-2 px-4 py-2 bg-blue-500 text-white rounded' onClick={handleBuy}>Buy</button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;