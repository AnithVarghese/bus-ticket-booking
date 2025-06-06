import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa6';
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { DataContext } from './Datacontext';
import axios from 'axios';

const Bookbuscard = () => {
  const { id } = useParams();
  const { bus = [], currentUser } = useContext(DataContext);
  const [numPassengers, setNumPassengers] = useState(1);
  const [passengers, setPassengers] = useState([{ name: '', age: '', gender: '' }]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const busDetails = bus.find((b) => b._id === id);

  if (!busDetails) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <div className="animate-pulse text-xl">Loading bus details...</div>
      </div>
    );
  }

  const maxPassengers = Math.min(4, busDetails.seatsAvailable);

  const handleNumPassengersChange = (e) => {
    const count = Math.max(1, Math.min(parseInt(e.target.value) || 1, maxPassengers));
    setNumPassengers(count);
    setPassengers(
      Array(count).fill().map((_, i) => passengers[i] || { name: '', age: '', gender: '' })
    );
  };

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const handleBookNow = async () => {
    const allPassengersValid = passengers.every(p => p.name.trim() && p.age && p.gender);
    const contactValid = email.trim() && phone.trim();

    if (allPassengersValid && contactValid) {
      try {
        const response = await axios.post('http://localhost:5000/api/bookings', {
          userId: currentUser?._id || null,
          busId: busDetails._id,
          seats: numPassengers,
          email,
          phone,
          totalPrice: busDetails.price * numPassengers,
          passengers: passengers.map(p => ({
            name: p.name.trim(),
            age: parseInt(p.age, 10) || 0,
            gender:p.gender
          }))
          
        });

      console.log('Booking response:', response.data);
      

      localStorage.setItem('bookingData', JSON.stringify({
  busDetails,
  seatsBooked: numPassengers,
  passengers: passengers.map(p => ({
    name: p.name.trim(),
    age: parseInt(p.age, 10) || 0,
    gender: p.gender
  })),
  bookingId: response.data.bookingId,
  contact: { email, phone },
  totalPrice: busDetails.price * numPassengers
}));

       navigate('/home/bus-tickets/booking-confirmation', {
  state: {
    busDetails,
    seatsBooked: numPassengers,
    passengers: passengers.map(p => ({
      name: p.name.trim(),
      age: parseInt(p.age, 10) || 0,
      gender: p.gender
    })),
    bookingId: response.data.bookingId,
    contact: { email, phone },
    totalPrice: busDetails.price * numPassengers // keep this if needed
  }
});


        alert('Booking confirmed!');
        console.log('Booking confirmed for:', passengers, 'Contact:', { email, phone });

        
      } catch (error) {
        console.error('Error booking bus:', error);
        alert('Booking failed. Please try again.');
      }
    } else {
      alert('Please fill in all passenger details and contact information.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Bus Info Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col sm:flex-row p-6 gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">{busDetails.name}</h1>
              <div className="space-y-2">
                <p className="text-gray-700"><span className="font-medium">From:</span> {busDetails.source}</p>
                <p className="text-gray-700"><span className="font-medium">To:</span> {busDetails.destination}</p>
                <p className="text-gray-700"><span className="font-medium">Departure:</span> {busDetails.departure}</p>
                <p className="text-gray-700"><span className="font-medium">Arrival:</span> {busDetails.arrival}</p>
                <div className="flex items-center text-gray-700">
                  <FaStar className="text-yellow-500 mr-1" />
                  <span>{busDetails.rating}</span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={busDetails.thumbnail}
                alt="Bus Thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Passenger Details */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Passenger Details</h2>
          <div className="mb-6">
            <label className="block font-medium text-gray-700 mb-2">Number of Passengers:</label>
            <input
              type="number"
              min="1"
              max={maxPassengers}
              value={numPassengers}
              onChange={handleNumPassengersChange}
              className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="space-y-6">
            {passengers.map((passenger, index) => (
              <div key={index} className="pb-6 border-b border-gray-100 last:border-b-0">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Passenger {index + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={passenger.name}
                      onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      min="1"
                      value={passenger.age}
                      onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      value={passenger.gender}
                      onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h2>
          <div className="space-y-4 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>
        </div>

        {/* Price & Book Button */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Price Details</h2>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Seats Remaining:</span> {busDetails.seatsAvailable - numPassengers}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Total Price:</span>{" "}
                <span className="flex items-center gap-1">
                  <MdOutlineCurrencyRupee className="text-lg text-green-600" />
                  <span className="font-semibold text-green-600">{busDetails.price * numPassengers}</span>
                </span>
              </p>
            </div>
            <button
              onClick={handleBookNow}
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-3 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookbuscard;
