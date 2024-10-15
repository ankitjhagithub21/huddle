// controllers/eventController.js

const Event = require('../models/event');

// Create a new event
const createEvent = async (req, res) => {
    try {
        const { title, description, date, speakers } = req.body;

        const newEvent = new Event({
            title,
            description,
            date,
            speakers,
        });

        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: newEvent });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('speakers');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a single event by ID
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('speakers');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update an event
const updateEvent = async (req, res) => {
    try {
        const { title, description, date, speakers } = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, {
            title,
            description,
            date,
            speakers,
        }, { new: true });

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete an event
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


module.exports = {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
}