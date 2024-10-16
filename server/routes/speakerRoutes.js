const express = require('express');
const speakerRouter = express.Router();
const { createSpeaker, getAllSpeakers, getSpeakerById, updateSpeaker, deleteSpeaker } = require("../controllers/speakerController");
const upload = require('../middlewares/multer');

// Route to create a new speaker with image upload
speakerRouter.post("/", upload.single('profilePic'), createSpeaker);

// Route to get all speakers
speakerRouter.get("/", getAllSpeakers);

// Route to get a specific speaker by ID
speakerRouter.get("/:id", getSpeakerById);

// Route to update a speaker by ID 
speakerRouter.put("/:id", upload.single('profilePic'), updateSpeaker);

// Route to delete a speaker by ID
speakerRouter.delete("/:id", deleteSpeaker);

module.exports = speakerRouter;
