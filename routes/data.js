const express = require('express');
const router = express.Router();
const { validateTrip, addTrip, getTrips, deleteTrip } = require('../controller/tripController');  // Import the delete function

// POST route to add a trip
router.post('/', validateTrip, addTrip);

// GET route to retrieve trips
router.get('/', getTrips);

// DELETE route to delete a trip by ID
router.delete('/', deleteTrip);

module.exports = {
    dataRouter: router
};
