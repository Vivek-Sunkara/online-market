import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductStatus = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/products/owner');
        if (data.success) {
          setProducts(data.products);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error in fetchProducts:", error);
        toast.error(error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Product Status</h1>
      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg mb-4 shadow">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-gray-700">
              Interested Buyers: {product.interestedBuyers?.length || 0}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductStatus;