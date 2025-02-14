import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import AddProductForm from '../components/AddProductForm';
import axios from 'axios';
import { AppContent } from '../context/AppContext'; // Correct import

const Home = () => {
  const [products, setProducts] = useState([]);
  const { userData, backendUrl } = useContext(AppContent);

  useEffect(() => {
    const fetchProducts = async () => {
      if (userData) { // Fetch products only if user is logged in
        try {
          const { data } = await axios.get(`${backendUrl}/api/products`);
          setProducts(data.products);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }
    };

    fetchProducts();
  }, [backendUrl, userData]);

  const handleProductAdded = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>
      <Navbar />
      <Header />
      {userData && <AddProductForm onProductAdded={handleProductAdded} />}
      {userData ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className='text-gray-700 mt-4'>Please log in to view products.</p>
      )}
    </div>
  );
};

export default Home;
