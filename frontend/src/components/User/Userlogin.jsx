import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import userImage from '../../assets/user.png'; 

const Userlogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', formData);
      localStorage.setItem('userToken', res.data.token); 
      toast.success('Login successful!');
      navigate('/home'); 
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center px-4">
  
  <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6 flex flex-col items-center  gap-4">
    
   
    <img 
      src={userImage} 
      alt="User" 
      className="w-16 h-16 object-cover rounded-full shadow-sm border" 
    />

    
    <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
      >
        Log in
      </button>
    </form>

    
    <span className="text-sm text-gray-600">
      New to our site?{' '}
      <Link to="/signup" className="font-semibold text-blue-600 hover:underline">
        Sign up
      </Link>
    </span>
  </div>
</div>

  );
};

export default Userlogin;
