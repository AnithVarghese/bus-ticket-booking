import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchcomponent = ({ searchForm, setSearchForm }) => {
  const navigate = useNavigate();

  
  const handleSearch = (e) => {
    const { name, value } = e.target;
    setSearchForm(prev => ({ ...prev, [name]: value }));
  };

  
  useEffect(() => {
    if (!searchForm.date) {
      const today = new Date().toISOString().split('T')[0];
      setSearchForm(prev => ({ ...prev, date: today }));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams(searchForm).toString();
    navigate(`/home/bus-tickets/search?${query}`);
  };

  return (
    <div className="bg-white bg-opacity-90 shadow-lg rounded-lg p-6 w-full max-w-5xl">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex flex-col w-full sm:w-[48%] md:w-[22%]">
          <input
            type="text"
            name="from"
            value={searchForm.from || ''}
            onChange={handleSearch}
            placeholder="From"
            className="border h-10 px-3 rounded outline-none"
          />
        </div>
        <div className="flex flex-col w-full sm:w-[48%] md:w-[22%]">
          <input
            type="text"
            name="to"
            value={searchForm.to  || ''}
            onChange={handleSearch}
            placeholder="To"
            className="border h-10 px-3 rounded outline-none"
          />
        </div>
        <div className="flex flex-col w-full sm:w-[48%] md:w-[22%]">
          <input
            type="date"
            name="date"
            value={searchForm.date}
            onChange={handleSearch}
            className="border h-10 px-3 rounded outline-none"
          />
        </div>
        <div className="w-full sm:w-[48%] md:w-[22%]">
          <button
            type="submit"
            className="w-full h-10 bg-[#ff5757] text-white rounded hover:bg-[#e04c4c] transition duration-200"
          >
            Search Buses
          </button>
        </div>
      </form>
    </div>
  );
};

export default Searchcomponent;
