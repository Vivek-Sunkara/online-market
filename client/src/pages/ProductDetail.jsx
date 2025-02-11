import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/products/${id}`)
        setProduct(data.product)
      } catch (error) {
        console.error(error)
      }
    }
    fetchProduct()
  }, [id, backendUrl])

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='container mx-auto py-8'>
        <div className='bg-white p-8 rounded-lg shadow-md'>
          <img src={product.image} alt={product.name} className='w-full h-96 object-cover rounded-md' />
          <h1 className='text-3xl font-bold mt-4'>{product.name}</h1>
          <p className='text-gray-600 mt-2'>${product.price}</p>
          <p className='text-gray-800 mt-4'>{product.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail