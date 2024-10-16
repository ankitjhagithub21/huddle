const Attendee = require('../models/attendee');

// CREATE a new attendee
const createAttendee = async (req, res) => {
    const { fullName, email, mobile } = req.body;

    try {

        // Create new attendee object
        const newAttendee = new Attendee({
            fullName,
            email,
            mobile,
        });

        // Save attendee to the database
        await newAttendee.save();
        res.status(201).json({ message: 'Attendee created successfully!', attendee: newAttendee });

    } catch (error) {


        res.status(500).json({ message: 'Error creating attendee', error: error.message });

    }
};

// READ all attendees
const getAllAttendees = async (req, res) => {
    try {
        const attendees = await Attendee.find();
        res.status(200).json(attendees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendees', error: error.message });
    }
};

// READ a single attendee by ID
const getAttendeeById = async (req, res) => {
    const { id } = req.params;

    try {
        const attendee = await Attendee.findById(id);
        if (!attendee) {
            return res.status(404).json({ message: 'Attendee not found!' });
        }
        res.status(200).json({ data: attendee });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendee', error: error.message });
    }
};

// UPDATE an attendee by ID
const updateAttendee = async (req, res) => {
    const { id } = req.params;
    const { fullName, email, mobile } = req.body;

    try {
        const updatedAttendee = await Attendee.findByIdAndUpdate(
            id,
            { fullName, email, mobile },
            { new: true, runValidators: true } // `new: true` returns the updated attendee
        );

        if (!updatedAttendee) {
            return res.status(404).json({ message: 'Attendee not found!' });
        }

        res.status(200).json({ message: 'Attendee updated successfully!', attendee: updatedAttendee });
    } catch (error) {
        res.status(500).json({ message: 'Error updating attendee', error: error.message });
    }
};

// DELETE an attendee by ID
const deleteAttendee = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAttendee = await Attendee.findByIdAndDelete(id);

        if (!deletedAttendee) {
            return res.status(404).json({ message: 'Attendee not found!' });
        }

        res.status(200).json({ message: 'Attendee deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting attendee', error: error.message });
    }
};


module.exports = {
    createAttendee,
    getAllAttendees,
    getAttendeeById,
    updateAttendee,
    deleteAttendee
}