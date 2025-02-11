import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AppContent } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {
  const { backendUrl, userData } = useContext(AppContent)
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/user/products`)
        setProducts(data.products)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUserProducts()
  }, [backendUrl])

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='container mx-auto py-8'>
        <h1 className='text-3xl font-bold mb-6'>My Products</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {products.map(product => (
            <div key={product._id} className='bg-white p-4 rounded-lg shadow-md'>
              <img src={product.image} alt={product.name} className='w-full h-48 object-cover rounded-md' />
              <h2 className='text-xl font-semibold mt-4'>{product.name}</h2>
              <p className='text-gray-600 mt-2'>${product.price}</p>
              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className='mt-4 bg-blue-500 text-white py-2 px-4 rounded-md'
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserProfile