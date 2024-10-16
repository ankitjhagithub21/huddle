const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
    buildingNumber: {
        type: String,
        required: true,
    },
    roomNumber: {
        type: String,
        required: true,
    },
    roomCapacity: {
        type: Number,
        required: true,
    },
},{versionKey:false,timestamps:true});

module.exports = mongoose.model('Venue', venueSchema);

