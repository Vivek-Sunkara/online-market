import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
      <img src={assets.header_img} alt="" className='w-36 h-36 rounded-full mb-6' />
      <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>
        Hey Developer <img className='w-8 aspect-square' src={assets.hand_wave} alt="" />
      </h1>
      <p className='text-sm sm:text-base text-gray-600'>
        Welcome to the Online Marketing website. Your account has been created successfully.
      </p>
    </div>
  )
}

export default Header