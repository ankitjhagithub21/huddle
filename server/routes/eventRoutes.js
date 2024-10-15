
const express = require('express');
const eventRouter = express.Router();
const {createEvent,getEventById,updateEvent,deleteEvent, getAllEvents} = require('../controllers/eventController');

// Create a new event
eventRouter.post('/', createEvent);

// Get all events
eventRouter.get('/', getAllEvents);

// Get an event by ID
eventRouter.get('/:eventId', getEventById);

// Update an event by ID
eventRouter.put('/:eventId', updateEvent);

// Delete an event by ID
eventRouter.delete('/:eventId', deleteEvent);

module.exports = eventRouter;
