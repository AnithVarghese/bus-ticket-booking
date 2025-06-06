import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'
const Footer = () => {
  return (
    
      <footer className='bg-gray-700 px-4 md:px-16 lg:px-28  bottom-0 pt-20' >
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4  text-white'>
          <div>

            <h2 className='text-lg font-bold'>About Us</h2>
            <p className='text-gray-300'>We are a leading bus booking platform, dedicated to providing you with the best travel experience.</p>
          </div>
          <div>
          <h2 className='text-lg font-bold '>Quick Links</h2>
            <ul className='text-gray-300'>
              <li><a href="#home" className='hover:underline text-gray-300'>Home</a></li>
              <li><a href="#about" className='hover:underline text-gray-300'>About</a></li>
              <li><a href="#contact" className='hover:underline text-gray-300'>Contact</a></li>
            </ul>
          </div>
          <div>

            <h2 className='text-lg font-bold'>Follow us</h2>

            <ul className='flex space-x-4 text-gray-300'>
              <li><FaFacebookF className='text-blue-500'/>
              <a href="https://www.facebook.com" className='hover:underline text-gray-400'>Facebook</a></li>
              <li><FaTwitter className='text-sky-400'/>
                <a href="https://www.twitter.com" className='hover:underline text-gray-400'>Twitter</a></li>
              <li><FaInstagram className='text-pink-500'/>
                <a href="https://www.instagram.com" className='hover:underline text-gray-400'>Instagram</a></li>
             </ul>

        
          </div>
        </div>
        <div className='border-t border-gray-700 mt-4 pt-4'>
          <p className='text-center text-gray-300 py-4'>© 2025 BookMyBus. All rights reserved.</p>
        </div>
     </footer>
    
  )
}

export default Footer
