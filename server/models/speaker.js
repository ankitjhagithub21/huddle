const mongoose = require('mongoose');

const speakerSchema = new mongoose.Schema({
  salutation: {
    type: String,
    required: true, 
  },
  fullName: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true
  },
  
  profilePic: {  
    type: String,
    required: true,
  },
  cloudinaryId: { 
    type: String,
    required: true,
  },
  
  socialLinks: {
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    linkedin: {
      type: String,
    },
  },
}, { versionKey: false, timestamps: false });

module.exports = mongoose.model('Speaker', speakerSchema);
