const mongoose = require('mongoose');

const speakerSchema = new mongoose.Schema({
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
    unique:true
  },
  mobile:{
    type:String,
    required:true
  },
  profilePic: {
    type: String,
    required: true, 
  },

  socialLinks: {
    website: {
      type: String,
    },
    twitter: {
      type: String,
    },
    linkedin: {
      type: String,
    },
  },
 
},{versionKey:false,timestamps:false});

module.exports = mongoose.model('Speaker', speakerSchema);
