import React,{useState} from 'react';
import BookMyBus from '../assets/BookMyBus.png';

const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }
  return (
    <nav className="fixed top-0 w-full bg-[#ff5757] py-5  shadow-md " >
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
        
        <div className="flex-shrink-0">
          <img src={BookMyBus} alt="Logo" className="w-30 md:w-40" />
        </div>

       
        

       
        <div className="relative inline-block text-left">
          <button
            onClick={toggleMenu}
            className="text-white border-none h-10 w-30 flex items-center justify-center shadow-lg hover:bg-transparent-700 transition-all duration-300"
          > 
            Account
            <svg
              className="w-5 h-5 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          
          {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <div className="py-1">
              <a
                href="/login"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Login
              </a>
              <a
                href="/signup"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Signup
              </a>
            </div>
        </div>
          )}
        
         </div>
      </div>
    </nav>
  );
};

export default Navbar;
