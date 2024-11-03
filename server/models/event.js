const mongoose = require('mongoose');

// Event Schema Definition
const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      minlength: [50, 'Title must be at least 50 characters long'], 
      trim: true,
    },
    images: [
      {
        imageUrl: {
          type: String,
          required: [true, 'Image URL is required'],
        },
        publicId: {
          type: String,
          required: [true, 'Cloudinary public ID is required'],
        },
      },
    ],
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [300, 'Description must be at least 300 characters long'], 
      trim: true,
    },
    videoUrl: {
      type: String,
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],

    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    speakers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Speaker',
        required: true, // Ensure at least one speaker is added
      },
    ],
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attendee',
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
