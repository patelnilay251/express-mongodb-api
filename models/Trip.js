const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    destination: String,
    startDate: Date,
    endDate: Date,
    price: Number,
    travelers: String
});

module.exports = mongoose.model('Trip', TripSchema);
