const express = require('express');
const venueRouter = express.Router();
const {
    createVenue,
    getAllVenues,
    getVenueById,
    updateVenueById,
    deleteVenueById,
} = require('../controllers/venueController');

// Route to create a new venue
venueRouter.post('/', createVenue);

// Route to get all venues
venueRouter.get('/', getAllVenues);

// Route to get a venue by ID
venueRouter.get('/:id', getVenueById);

// Route to update a venue by ID
venueRouter.put('/:id', updateVenueById);

// Route to delete a venue by ID
venueRouter.delete('/:id', deleteVenueById);

module.exports = venueRouter;
