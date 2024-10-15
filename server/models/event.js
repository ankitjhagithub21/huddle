const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    speakers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Speaker",
            required: true, 
        }
    ],
    attendees: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attendee",
            required: true, 
        }
    ],
}, { versionKey: false, timestamps: true }); 

module.exports = mongoose.model('Event', eventSchema); 
