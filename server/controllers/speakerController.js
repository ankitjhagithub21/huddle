const Speaker = require('../models/speaker');

// Create a new speaker
const createSpeaker = async (req, res) => {
  try {
    const { fullName, bio, email, mobile, profilePic, socialLinks } = req.body;
    const newSpeaker = new Speaker({
      fullName,
      bio,
      email,
      mobile,
      profilePic,
      socialLinks,
    });

    const savedSpeaker = await newSpeaker.save();
    res.status(201).json({ message: 'Speaker created successfully', speaker: savedSpeaker });
  } catch (error) {
    res.status(500).json({ message: 'Error creating speaker', error: error.message });
  }
};

// Get all speakers
const getAllSpeakers = async (req, res) => {
  try {
    const speakers = await Speaker.find();
    res.status(200).json(speakers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching speakers', error: error.message });
  }
};

// Get a speaker by ID
const getSpeakerById = async (req, res) => {
  try {
    const speaker = await Speaker.findById(req.params.id);
    if (!speaker) {
      return res.status(404).json({ message: 'Speaker not found' });
    }
    res.status(200).json(speaker);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching speaker', error: error.message });
  }
};

// Update a speaker by ID
const updateSpeaker = async (req, res) => {
  try {
    const { fullName, bio, email, mobile, profilePic, socialLinks } = req.body;

    const updatedSpeaker = await Speaker.findByIdAndUpdate(
      req.params.id,
      { fullName, bio, email, mobile, profilePic, socialLinks },
      { new: true, runValidators: true }
    );

    if (!updatedSpeaker) {
      return res.status(404).json({ message: 'Speaker not found' });
    }

    res.status(200).json({ message: 'Speaker updated successfully', speaker: updatedSpeaker });
  } catch (error) {
    res.status(500).json({ message: 'Error updating speaker', error: error.message });
  }
};

// Delete a speaker by ID
const deleteSpeaker = async (req, res) => {
  try {
    const deletedSpeaker = await Speaker.findByIdAndDelete(req.params.id);

    if (!deletedSpeaker) {
      return res.status(404).json({ message: 'Speaker not found' });
    }

    res.status(200).json({ message: 'Speaker deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting speaker', error: error.message });
  }
};


module.exports = {
  createSpeaker,
  getAllSpeakers,
  getSpeakerById,
  updateSpeaker,
  deleteSpeaker,

}