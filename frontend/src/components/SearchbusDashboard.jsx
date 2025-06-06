import React, {  useState,useContext } from 'react';
import { DataContext } from './Datacontext';
import Searchcomponent from './Searchcomponent';
import { FaStar } from 'react-icons/fa6';
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { NavLink ,useSearchParams } from 'react-router-dom';
import { IoArrowForwardOutline } from "react-icons/io5";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const SearchbusDashboard = () => {
  
  const bus = useContext(DataContext).bus || [];
  const [searchParams] = useSearchParams();
  const [hover, setHover] = useState(false);
  
  const navigate = useNavigate();
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';
  
  const [searchForm, setSearchForm] = useState({
    from,
    to,
    date
  });
  
 
  const handleSubmit = (e) => {
    e.preventDefault();
  };
    let filteredBus = bus.filter((b) =>(
      
        (!searchForm.from || b.source?.toLowerCase().includes(from.toLowerCase())) &&
        (!searchForm.to || b.destination?.toLowerCase().includes(to.toLowerCase())) &&
        (!searchForm.date || (b.date)) ) 
      )
      
    
 
  return (
    <div className="w-full bg-[#efefef] pt-20 max-w-screen flex flex-col items-center justify-center md:px-16 lg:px-0">
      
      
      <div className="w-full bg-white h-[30vh] flex items-center justify-center px-4">
        <div
          className="relative flex items-center mr-3"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <BsArrowLeftCircle size={28}  className="text-gray-600 hover:text-gray-800 transition duration-200"/>
           {hover && (
            <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow">
              Go back to home
            </span>
          )}
        </div>
        <Searchcomponent 
          searchForm={searchForm}
          setSearchForm={setSearchForm}
          
        />
      </div>

      
      <div className="w-full px-4 py-8 md:px-16 flex flex-col justify-evenly items-center max-w-screen">
        {filteredBus.map((elem) => (
          <div
            className="flex flex-col sm:flex-row justify-between items-center w-[80vw] max-w-4xl rounded-xl bg-white shadow-md p-6 mb-6 transition-all hover:shadow-lg"
            key={elem.id || elem._id}
          >
            
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-[70%]">
              <div className="w-full sm:w-[30%]">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
                  {elem.name}
                </h1>
              </div>

              <div className="flex items-center gap-1 text-sm text-white bg-green-500 px-2 py-1 rounded-md h-fit w-fit">
                <FaStar className="text-yellow-300" />
                <span>{elem.rating}</span>
              </div>

             <div > 
             <h1 className="text-sm text-gray-600 whitespace-nowrap">
                {elem.source}
              </h1>
              <h1 className="text-sm text-gray-600 whitespace-nowrap">
                {elem.departure}
               </h1>
             </div>

              <IoArrowForwardOutline className="text-gray-500" />

             <div>
             <h1 className="text-sm text-gray-600 whitespace-nowrap">
                {elem.destination}
              </h1>
              <h1 className="text-sm text-gray-600 whitespace-nowrap">
                {elem.arrival}
               </h1>
             </div>

              <h1 className="text-sm text-gray-700">{elem.seatsAvailable} Seats</h1>

              <h1 className="text-sm sm:text-base font-medium text-gray-800 flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md w-fit">
                   <MdOutlineCurrencyRupee className="text-lg text-[#4caf50]" />
                   {elem.price}
              </h1> 

            </div>

           
            <div className="mt-4 sm:mt-0">
              <NavLink to={`/home/bus-tickets/viewbus/${elem._id}`} state={elem}>
                <button className="bg-[#ff5757] text-white px-6 py-2 rounded-lg hover:bg-[#e04c4c] transition duration-200">
                  View Bus
                </button>
              </NavLink>
            </div>
          </div>
        ))}

      </div>
      
      <div className="w-full bg-[#efefef] py-20 flex items-center justify-center"> 


      </div>
    
    </div>
  );
};

export default SearchbusDashboard;
