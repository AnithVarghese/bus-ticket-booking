import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BookMyBus from '../assets/BookMyBus.png';
import axios from 'axios';

const BookingConfirmation = () => {
  const location = useLocation();

  // Load state from navigation or fallback from localStorage
  const stateData = location.state || JSON.parse(localStorage.getItem('bookingData') || '{}');
  const { busDetails, seatsBooked, passengers, bookingId, contact, totalPrice } = stateData;

  const [error, setError] = useState('');

  if (!busDetails) {
    return <div className="pt-24 text-center text-red-500">No booking data available.</div>;
  }

  // Save to localStorage for reload support
  localStorage.setItem('bookingData', JSON.stringify(stateData));

const handleDownloadTicket = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/bookings/${bookingId}/pdf`, {
      responseType: 'blob', // important for binary data
      headers: {
        Accept: 'application/pdf',
      },
    });

    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));

    const a = document.createElement('a');
    a.href = url;
    a.download = `booking-${bookingId}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
    setError('Failed to download ticket. Please try again.');
  }
};
  return (
    <div className="pt-24 pb-4 px-4 flex justify-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-xl p-8">
        {/* Header with logo */}
        <div className="text-center space-y-2 mb-6">
          <div className="flex items-center justify-center flex-col gap-3">
            <img src={BookMyBus} alt="BookMyBus Logo" className="h-12" />
            <h1 className="text-3xl font-bold text-green-600">Booking Confirmed!</h1>
          </div>
          <p className="text-gray-600">Your ticket has been successfully booked.</p>
        </div>

        {/* Bus Details */}
        <div className="mb-6 border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">🚌 Bus Details</h3>
          <p className="font-medium">{busDetails.name}</p>
          <p>{busDetails.source} → {busDetails.destination}</p>
          <p>Departure: {busDetails.departure}</p>
          <p>Arrival: {busDetails.arrival}</p>
        </div>

        {/* Passenger Details */}
        <div className="mb-6 border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">👥 Passenger Details</h3>
          {passengers?.map((p, i) => (
            <p key={i}>{i + 1}. {p.name}, Age: {p.age}, Gender: {p.gender}</p>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mb-6 border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">📞 Contact Information</h3>
          <p>Email: {contact?.email}</p>
          <p>Phone: {contact?.phone}</p>
        </div>

        {/* Summary */}
        <div className="mb-6 border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">💳 Booking Summary</h3>
          <p>Seats Booked: <span className="font-medium">{seatsBooked}</span></p>
          <p>Total Price: <span className="font-bold text-green-700">₹{totalPrice}</span></p>
          <p className="text-sm text-gray-500">Booking ID: <span className="text-gray-700">{bookingId}</span></p>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Download Button */}
        <div className="flex justify-center">
          <button
            onClick={handleDownloadTicket}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
          >
            Download Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
