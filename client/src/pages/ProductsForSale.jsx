import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import { AppContent } from '../context/AppContext';
import axios from 'axios';

const ProductsForSale = () => {
  const [products, setProducts] = useState([]);
  const { backendUrl, userData } = useContext(AppContent);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/products/user/${userData._id}`);
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (userData?._id) {
      fetchProducts();
    }
  }, [userData, backendUrl]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>
      <Navbar />
      <h1 className='text-3xl font-semibold text-white mt-6'>Products For Sale</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
        {products.map(product => (
          <div key={product._id} className='border rounded-lg p-4 m-4'>
            <img src={product.image} alt={product.name} className='w-full h-48 object-cover rounded-lg' />
            <h2 className='text-xl font-semibold mt-2'>{product.name}</h2>
            <p className='text-gray-700'>${product.price}</p>
            <p className='text-gray-700'>{product.description}</p>
            <p className='text-gray-700'>Status: {product.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsForSale;
