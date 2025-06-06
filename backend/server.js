const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


const userRoutes = require('./routes/userRoutes');
const busRoutes = require('./routes/busRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/api/users', userRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/bookings', bookingRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
