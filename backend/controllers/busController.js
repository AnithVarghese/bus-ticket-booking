const Bus = require('../models/Bus');


exports.getAllBuses = async (req, res) => {
    try {
        const buses = await Bus.find();
        res.status(200).json(buses);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.getBusById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const bus = await Bus.findById(id);
      if (!bus) {
        return res.status(404).json({ message: 'Bus not found' });
      }
      res.status(200).json(bus);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bus', error });
    }
  };
  


exports.addBus = async (req, res) => {
    const { name, source,departure,arrival, destination, seatsAvailable, price, date } = req.body;

    try {
        const newBus = new Bus({
            thumbnail,
            name,
            source,
            departure,
            arrival,
            destination,
            seatsAvailable,
            price,
            date,
            rating
        });

        await newBus.save();
        res.status(201).json({ message: 'Bus added successfully', bus: newBus });
    } catch (error) {
        res.status(500).json({ message: 'Error adding bus', error });
    }
};


exports.updateBus = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const bus = await Bus.findByIdAndUpdate(id, updates, { new: true });
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }
        res.status(200).json({ message: 'Bus updated', bus });
    } catch (error) {
        res.status(500).json({ message: 'Error updating bus', error });
    }
};


exports.deleteBus = async (req, res) => {
    const { id } = req.params;

    try {
        const bus = await Bus.findByIdAndDelete(id);
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }
        res.status(200).json({ message: 'Bus deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting bus', error });
    }
};
