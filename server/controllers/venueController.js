const Venue = require('../models/venue');

// Create a new venue
const createVenue = async (req, res) => {
    try {
        const { buildingNumber, roomNumber, roomCapacity } = req.body;

        const newVenue = new Venue({
            buildingNumber,
            roomNumber,
            roomCapacity,
        });

        const savedVenue = await newVenue.save();
        res.status(201).json(savedVenue);
    } catch (error) {
        res.status(500).json({ message: 'Error creating venue', error });
    }
};

// Get all venues
const getAllVenues = async (req, res) => {
    try {
        const venues = await Venue.find();
        res.status(200).json(venues);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching venues', error });
    }
};

// Get a single venue by ID
const getVenueById = async (req, res) => {
    try {
        const venue = await Venue.findById(req.params.id);
        if (!venue) {
            return res.status(404).json({ message: 'Venue not found' });
        }
        res.status(200).json(venue);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching venue', error });
    }
};

// Update a venue by ID
const updateVenueById = async (req, res) => {
    try {
        const { buildingNumber, roomNumber, roomCapacity } = req.body;

        const updatedVenue = await Venue.findByIdAndUpdate(
            req.params.id,
            { buildingNumber, roomNumber, roomCapacity },
            { new: true } 
        );

        if (!updatedVenue) {
            return res.status(404).json({ message: 'Venue not found' });
        }

        res.status(200).json(updatedVenue);
        
    } catch (error) {
        res.status(500).json({ message: 'Error updating venue', error });
    }
};

// Delete a venue by ID
const deleteVenueById = async (req, res) => {
    try {
        const deletedVenue = await Venue.findByIdAndDelete(req.params.id);

        if (!deletedVenue) {
            return res.status(404).json({ message: 'Venue not found' });
        }

        res.status(200).json({ message: 'Venue deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting venue', error });
    }
};

module.exports = {
    createVenue,
    getAllVenues,
    getVenueById,
    updateVenueById,
    deleteVenueById,
};
