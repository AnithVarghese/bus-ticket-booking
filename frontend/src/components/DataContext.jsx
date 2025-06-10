import { createContext, useEffect, useState,use } from 'react';
import axios from 'axios';
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [bus, setBus] = useState([]);

   useEffect(()=>{
    const fetchBuses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/buses');
        setBus(res.data);
      } catch (error) {
        console.error('Error fetching buses:', error);
      }
    };
    fetchBuses();
  },[])

  

  return (
    <DataContext.Provider value={{ bus }}>
      {children}
    </DataContext.Provider>
  );
};