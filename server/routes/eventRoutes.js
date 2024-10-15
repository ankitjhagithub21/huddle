
const express = require('express');
const eventRouter = express.Router();
const eventController = require('../controllers/eventController');

// Create a new event
eventRouter.post('/', eventController.createEvent);

// Get all events
eventRouter.get('/', eventController.getEvents);

// Get an event by ID
eventRouter.get('/:id', eventController.getEventById);

// Update an event by ID
eventRouter.put('/:id', eventController.updateEvent);

// Delete an event by ID
eventRouter.delete('/:id', eventController.deleteEvent);

module.exports = eventRouter;
