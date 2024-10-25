const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 50
    },
    images:{
        type:Array,
        default:[]
    },
    video:{
        type:String,
    },
    description: {
        type: String,
        required: true,
        minlength: 300
    },
    date: {
        type: Date,
        required: true
    },
   
    isPublic: {
        type: Boolean,
        default: false 
    },
    speakers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Speaker"
        }
    ],
    attendees: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attendee"
        }
    ]
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
