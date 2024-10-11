const mongoose = require('mongoose');

const speakerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true, 
  },
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', 
  }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('Speaker', speakerSchema);
