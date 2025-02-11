import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);

  const sendVerificationOtp = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`);
      if (data.success) {
        navigate('/email-verify'); // Fixed route
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
      if (data.success) {
        setIsLoggedin(false);
        setUserData({}); // Ensures re-render
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='w-full flex justify-between items-center p-5 sm:p-6 sm:px-24 absolute top-0'>
      <img src={assets.logo} alt="" className='w-28 sm:w-32 cursor-pointer' onClick={() => navigate('/')} />
      {userData ? (
        <div className='flex space-x-4 items-center'>
          <button onClick={() => navigate('/cart')} className='text-blue-500 hover:text-blue-700'>Cart</button>
          <button onClick={() => navigate('/products-for-sale')} className='text-blue-500 hover:text-blue-700'>Products for Sale</button>
          
          <div className='relative group'>
            <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white cursor-pointer'>
              {userData.name[0].toUpperCase()}
            </div>
            <div className='absolute hidden group-hover:block right-0 mt-2 bg-white shadow-md rounded'>
              <ul className='list-none p-2 text-sm text-gray-800'>
                {!userData.isAccountVerified && (
                  <li className='py-1 px-4 hover:bg-gray-200 cursor-pointer' onClick={sendVerificationOtp}>
                    Verify Email
                  </li>
                )}
                <li className='py-1 px-4 hover:bg-gray-200 cursor-pointer' onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <button onClick={() => navigate('/login')}
          className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all'>
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
