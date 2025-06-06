const express = require('express');
const { createBooking, getBookingsByUser, getAllBookings, cancelBooking,generateBookingPDF } = require('../controllers/bookingController');

const router = express.Router();


router.post('/', createBooking);                      
router.get('/user/:userId', getBookingsByUser);        
router.get('/', getAllBookings);                       
router.delete('/:id', cancelBooking);                  
router.get('/:id/pdf',generateBookingPDF);
module.exports = router;
