import React, { useContext } from 'react';
import busback from '../assets/busback.png';
import { useState } from 'react';

import Searchcomponent from './Searchcomponent';
import { DataContext } from './Datacontext';


export default function LandingPage() {
   const bus = useContext(DataContext).bus || [];
  let [date,setDate] =useState('');
  const [searchForm, setSearchForm] = useState({
    from: '',
    to: '',
    date: ''
  });
 
  
    return (
    <div className="w-full pt-20 max-w-screen">
      
      <div
        className="w-full h-[60vh] bg-cover bg-center flex items-center justify-center px-4 max-w-screen"
        style={{ backgroundImage: `url(${busback})` }}
      >
        
        
         <Searchcomponent onDateChange={setDate}
          searchForm={searchForm}
          setSearchForm={setSearchForm}
         />
       
      </div>

      
      <div className="bg-[#efefef] px-4 py-8 md:px-16 flex flex-col items-center justify-center w-full max-w-screen">
        <h1 className="text-4xl font-bold mb-4 ">Our top partners</h1>
        <div className="flex  flex-wrap gap-4 text-lg text-gray-800">
          {bus.slice(0,8).map((elem)=>(
             <span className='flex justify-center items-center flex-col' key={elem.id || elem._id}>
                 <img className='w-[330px] h-[230px] ' 
                 src={elem.thumbnail} alt="bus-image" />
                 <h1>{elem.name}</h1>
             </span>
          ))
            
          }
        </div>
      </div>
      
    </div>
  )
}
