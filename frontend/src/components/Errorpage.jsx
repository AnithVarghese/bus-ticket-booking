import React from 'react'
import { NavLink } from 'react-router-dom'

const Errorpage = () => {
  return (
    <div className='pt-20 flex flex-col justify-center items-center h-screen bg-gray-100'>
        <img 
        src="https://thaka.bing.com/th/id/OIP.6HlxL1ENaCBqb9L7ssrLDgHaGu?pid=ImgDet&w=184&h=167&c=7&dpr=1.3" alt="Error" className='w-1/4 h-1/4 mb-4' />
      
      <NavLink to='/home'><button className='min-w-sm h-10 bg-[#ff5757] text-white rounded hover:bg-[#e04c4c] transition-duration-200'> Go back home</button></NavLink>
    </div>
  )
}

export default Errorpage
