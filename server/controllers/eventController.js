const Event = require('../models/event');
const Speaker = require('../models/speaker');
const Attendee = require('../models/attendee');
const { uploadImage } = require('../utils/cloudinary');

// Create a new event
const createEvent = async (req, res) => {
  try {
    const { title, description, date,videoUrl ,isPublic, speakers, attendees } = req.body;


    if (!title || !description || !date || !speakers) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    let images = [];

    // Upload images to Cloudinary
    if (req.files) {
      images = await Promise.all(
        req.files.map(async (file) => {
          const result = await uploadImage(file.path);
          return result;
        })
      );

    }
    // Create new event with uploaded images
    const newEvent = new Event({
      title,
      description,
      date,
      images:images || [],
      isPublic,
      speakers,
      videoUrl:videoUrl || "",
      attendees
    });

    const savedEvent = await newEvent.save();
    return res.status(201).json(savedEvent);

    } catch (error) {
    console.error('Error creating event:', error); // Log the error for debugging
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
      .populate('speakers', 'fullName profilePic')
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

    const event = await Event.findByIdAndDelete(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {

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
