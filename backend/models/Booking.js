const mongoose = require('mongoose');
const { ref } = require('pdfkit');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }
,
    busId: {type:mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true} ,
    seats: Number,
    passengers: [
        {
            name: String,
            age: Number,
            gender: { type: String, enum:['Male','Female','Other'], required: true } 
        }],
    email: String,
    phone: String,
    bookingDate: { type: Date, default: Date.now },
    totalPrice: { type: Number }
}, {
});

module.exports = mongoose.model('Booking', bookingSchema);
