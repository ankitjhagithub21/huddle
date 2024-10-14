const express = require('express');
const attendeeRouter = express.Router();
const attendeeController = require('../controllers/attendeeController');

// CRUD routes
attendeeRouter.post('/', attendeeController.createAttendee);
attendeeRouter.get('/', attendeeController.getAllAttendees);
attendeeRouter.get('/:id', attendeeController.getAttendeeById);
attendeeRouter.put('/:id', attendeeController.updateAttendee);
attendeeRouter.delete('/:id', attendeeController.deleteAttendee);

module.exports = attendeeRouter;
