const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  mobile:{
    type:String,
    required:true
  },
 
 
},{versionKey:false,timestamps:false});

module.exports = mongoose.model('Attendee', attendeeSchema);
