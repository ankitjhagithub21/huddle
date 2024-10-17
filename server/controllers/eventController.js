const Event = require('../models/event');
const Speaker = require('../models/speaker');
const Attendee = require('../models/attendee');

// Create a new event
const createEvent = async (req, res) => {
  try {
    const { title, description, date, speakers, attendees } = req.body;

    // Ensure that all referenced speakers and attendees exist
    const foundSpeakers = await Speaker.find({ '_id': { $in: speakers } });
    const foundAttendees = await Attendee.find({ '_id': { $in: attendees } });

    if (foundSpeakers.length !== speakers.length || foundAttendees.length !== attendees.length) {
      return res.status(400).json({ message: 'Invalid speakers or attendees provided' });
    }

    const newEvent = new Event({
      title,
      description,
      date,
      speakers,
      attendees
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {

    res.status(500).json({ message: 'Server error' });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('speakers', 'fullName')
      .populate('attendees', 'fullName');
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

    // Ensure that all referenced speakers and attendees exist
    const foundSpeakers = await Speaker.find({ '_id': { $in: speakers } });
    const foundAttendees = await Attendee.find({ '_id': { $in: attendees } });

    if (foundSpeakers.length !== speakers.length || foundAttendees.length !== attendees.length) {
      return res.status(400).json({ message: 'Invalid speakers or attendees provided' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { title, description, date, speakers, attendees },
      { new: true }
    )
      .populate('speakers', 'fullName')
      .populate('attendees', 'fullName');


    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {

    res.status(500).json({ message: 'Server error' });
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
  changeEventVisibility
};
