const express = require('express');
const eventRouter = express.Router();
const {createEvent,getEventById,updateEvent,deleteEvent, getAllEvents, changeEventVisibility} = require('../controllers/eventController');
const upload = require('../middlewares/multer');

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

//change event visibility
eventRouter.post("/:eventId",changeEventVisibility)

module.exports = eventRouter;
