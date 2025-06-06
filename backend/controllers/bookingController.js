const Booking = require('../models/Booking');
const Bus = require('../models/Bus');
const PDFDocument = require('pdfkit');
const path = require('path');

exports.createBooking = async (req, res) => {
    const { userId, busId, seats  , passengers ,email, phone ,bookingDate } = req.body;

    try {
        const bus = await Bus.findById(busId);
        if (!bus || bus.seatsAvailable < seats) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        const newBooking = new Booking({
            userId,
            busId,
            seats,
            passengers,
            email,
            phone,
            bookingDate: bookingDate || new Date() ,
             totalPrice: req.body.totalPrice,
        });

        const savedBooking = await newBooking.save();

        
        bus.seatsAvailable -= seats;
        await bus.save();

        res.status(201).json({ message: 'Booking successful', booking: savedBooking ,bookingId: savedBooking._id });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error });
    }
};


exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('busId').populate('userId');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.getBookingsByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const bookings = await Booking.find({ userId }).populate('busId');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};


exports.cancelBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

       
        const bus = await Bus.findById(booking.busId);
        bus.seatsAvailable += booking.seats;
        await bus.save();

        await Booking.findByIdAndDelete(id);
        res.status(200).json({ message: 'Booking canceled' });
    } catch (error) {
        res.status(500).json({ message: 'Error canceling booking', error });
    }
};

exports.generateBookingPDF = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId).populate('busId');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const bus = booking.busId;

    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    res.setHeader('Content-Disposition', `attachment; filename=booking-${bookingId}.pdf`);
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);

    // ✅ Load BookMyBus logo (served from frontend/public/static/ or symlinked to backend)
    const logoPath = path.join(__dirname, '..', 'public', 'BookMyBus.png');
    try {
      doc.image(logoPath, doc.page.width / 2 - 40, 40, { width: 80 });
    } catch (err) {
      console.warn('Logo not found or unreadable:', logoPath);
    }

    doc.moveDown(4);
    doc.fontSize(20).fillColor('#22c55e').text('Booking Confirmed!', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(12).fillColor('#555').text('Your ticket has been successfully booked.', { align: 'center' });

    doc.moveDown(2);

    // 📦 Bus Details
    doc.fontSize(16).fillColor('#000').text(' Bus Details', { underline: true });
    doc.fontSize(12).text(`Name: ${bus?.name || 'N/A'}`);
    doc.text(`From: ${bus?.source || 'N/A'} → To: ${bus?.destination || 'N/A'}`);
    doc.text(`Departure: ${bus?.departure || 'N/A'}`);
    doc.text(`Arrival: ${bus?.arrival || 'N/A'}`);
    doc.moveDown();

    // 🧍 Passenger Info
    doc.fontSize(16).text(' Passenger Details', { underline: true });
    booking.passengers.forEach((p, i) => {
      doc.fontSize(12).text(`${i + 1}. ${p.name}, Age: ${p.age}, Gender: ${p.gender}`);
    });
    doc.moveDown();

    // 📞 Contact Info
    doc.fontSize(16).text(' Contact Information', { underline: true });
    doc.fontSize(12).text(`Email: ${booking.email}`);
    doc.text(`Phone: ${booking.phone}`);
    doc.moveDown();

    // 💳 Summary
    doc.fontSize(16).text(' Booking Summary', { underline: true });
    doc.fontSize(12).text(`Booking ID: ${booking._id}`);
    doc.text(`Booking Date: ${new Date(booking.bookingDate).toDateString()}`);
    doc.text(`Seats Booked: ${booking.seats}`);
    doc.text(`Total Price: ₹${booking.totalPrice || 'N/A'}`);

    doc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Error generating PDF', error });
  }
};

