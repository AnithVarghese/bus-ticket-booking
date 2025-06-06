const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    thumbnail: String ,
    name: String,
    source: String,
    departure: String,
    arrival: String,
    destination: String,
    seatsAvailable: Number,
    price: Number,
    date: { type: Date, default: Date.now },
    rating: Number
});

module.exports = mongoose.model('Bus', busSchema);
