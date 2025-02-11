import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import ProductsForSale from './pages/ProductsForSale';
import Cart from './pages/Cart';
import ProductStatus from './pages/ProductStatus';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/products-for-sale' element={<ProductsForSale />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product-status' element={<ProductStatus />} />
      </Routes>
    </div>
  );
};

export default App;