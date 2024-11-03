const Event = require('../models/event');
const Speaker = require('../models/speaker');
const mongoose = require('mongoose');
const Attendee = require('../models/attendee');
const { deleteImage } = require('../utils/cloudinary');

// Create a new event
const createEvent = async (req, res) => {
  try {

    const { title, description, date, videoUrl, isPublic, speakers, attendees, images } = req.body;


    if (!title || !description || !date || !speakers) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    // Parse speakers and attendees to ensure they are arrays of ObjectIds
    const parsedSpeakers = Array.isArray(speakers)
      ? speakers.map(id => new mongoose.Types.ObjectId(id))
      : JSON.parse(speakers).map(id => new mongoose.Types.ObjectId(id));

    const parsedAttendees = attendees
      ? Array.isArray(attendees)
        ? attendees.map(id => new mongoose.Types.ObjectId(id))
        : JSON.parse(attendees).map(id => new mongoose.Types.ObjectId(id))
      : [];

    const newEvent = new Event({
      title,
      description,
      date,
      images,
      isPublic,
      videoUrl: videoUrl || "",
      speakers: parsedSpeakers,
      attendees: parsedAttendees,
    });

    const savedEvent = await newEvent.save();
    return res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};




// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
    res.status(200).json(events);
  } catch (error) {

    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single event by ID
const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId)
      .populate('speakers', 'fullName profilePic bio')
      .populate('attendees', 'fullName');



    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (!event.isPublic) {
      return res.status(400).json({ message: 'Event is not public.' });
    }


    res.status(200).json(event);
  } catch (error) {

    res.status(500).json({ message: 'Server error' });
  }
};

// Update an event
const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { title, description, date, speakers, attendees } = req.body;

    // Validate input fields
    if (!title || !description || !date || !speakers || speakers.length === 0 || !attendees || attendees.length === 0) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Ensure that all referenced speakers and attendees exist
    const foundSpeakers = await Speaker.find({ '_id': { $in: speakers } });
    const foundAttendees = await Attendee.find({ '_id': { $in: attendees } });

    // Check if the count of found speakers and attendees matches the input length
    if (foundSpeakers.length !== speakers.length) {
      return res.status(400).json({ message: 'Invalid speakers provided' });
    }

    if (foundAttendees.length !== attendees.length) {
      return res.status(400).json({ message: 'Invalid attendees provided' });
    }

    // Update the event
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { title, description, date, speakers, attendees },
      { new: true, runValidators: true } // Ensure validation during update
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    return res.status(200).json(updatedEvent);

  } catch (error) {
    console.error('Error updating event:', error); // Log the error for debugging
    return res.status(500).json({ message: 'Server error' });
  }
};



// Delete an event
const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Find and delete the event by ID
    const event = await Event.findByIdAndDelete(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // If images exist, delete all images from Cloudinary
    if (event.images && event.images.length > 0) {
      // Use Promise.all to wait for all deletions to complete
      await Promise.all(
        event.images.map(async (image) => {
          try {
            await deleteImage(image.publicId);
          } catch (err) {
            console.error(`Error deleting image with publicId ${image.publicId}:`, err);
          }
        })
      );
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



const changeEventVisibility = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Toggle the isPublic property
    event.isPublic = !event.isPublic;

    await event.save();


    res.status(200).json({
      message: `Event visibility is now ${event.isPublic ? 'public' : 'private'}`
    });

  } catch (error) {

    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  changeEventVisibility,

};
