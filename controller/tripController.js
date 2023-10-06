const { validate } = require('jsonschema');
const Trip = require('../models/Trip');

const tripSchema = {
    "type": "object",
    "properties": {
        "destination": { "type": "string" },
        "startDate": { "type": "string", "format": "date" },
        "endDate": { "type": "string", "format": "date" },
        "price": { "type": "number" },
        "travelers": { "type": "string" }
    },
    "required": ["destination", "startDate", "endDate", "price", "travelers"]
};

const validateTrip = (req, res, next) => {
    const validationResult = validate(req.body, tripSchema);
    if (!validationResult.valid) {
        return res.status(400).json({ error: validationResult.errors });
    }
    next();
};

const addTrip = async (req, res) => {
    try {
        const trip = new Trip(req.body);
        await trip.save();
        res.status(201).json(trip);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getTrips = async (req, res) => {
    try {
        const query = {};

        if (req.query.destination) {
            query.destination = req.query.destination;
        }
        if (req.query.startDate) {
            query.startDate = new Date(req.query.startDate);
        }
        if (req.query.endDate) {
            query.endDate = new Date(req.query.endDate);
        }
        if (req.query.price) {
            query.price = Number(req.query.price);
        }
        if (req.query.travelers) {
            query.travelers = req.query.travelers;
        }

        const trips = await Trip.find(query);

        if (trips.length === 0) {
            return res.status(404).json({ error: 'No trips found matching the criteria' });
        }

        res.json(trips);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const deleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findByIdAndDelete(req.query.id);

        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        res.json({ message: 'Trip deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    validateTrip,
    addTrip,
    getTrips,
    deleteTrip
};
