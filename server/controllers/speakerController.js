const Speaker = require('../models/speaker');
const { uploadImage, deleteImage } = require('../utils/cloudinary');

// Create a new speaker
const createSpeaker = async (req, res) => {
  try {

    const uploadResponse = await uploadImage(req.file.path);

    if (!uploadResponse) {
        return res.status(500).json({ message: 'Image upload failed' });
    }

   
    const { salutation, fullName, bio, email, mobile} = req.body;
    const socialLinks = JSON.parse(req.body.socialLinks);
    
    const newSpeaker = new Speaker({
      salutation,
      fullName,
      bio,
      email,
      mobile,
      profilePic: uploadResponse.publicUrl, 
      cloudinaryId: uploadResponse.cloudinaryId,
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
    const { salutation, fullName, bio, email, mobile, profilePic, socialLinks } = req.body;

    const updatedSpeaker = await Speaker.findByIdAndUpdate(
      req.params.id,
      {salutation, fullName, bio, email, mobile, profilePic, socialLinks },
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

const deleteSpeaker = async (req, res) => {
  try {
      const speaker = await Speaker.findById(req.params.id);
      
      if (!speaker) {
          return res.status(404).json({ message: 'Speaker not found' });
      }

      // Delete the speaker's image from Cloudinary using the stored cloudinaryId
      await deleteImage(speaker.cloudinaryId);

      // Delete the speaker from the database
      await Speaker.findByIdAndDelete(req.params.id);

      res.json({ message: 'Speaker deleted successfully' });
  } catch (error) {
      console.error('Error deleting speaker:', error);
      res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  createSpeaker,
  getAllSpeakers,
  getSpeakerById,
  updateSpeaker,
  deleteSpeaker,

}