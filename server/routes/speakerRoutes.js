const express = require('express')
const speakerRouter = express.Router()
const {createSpeaker,getAllSpeakers,getSpeakerById,updateSpeaker,deleteSpeaker} =  require("../controllers/speakerController")

speakerRouter.post("/",createSpeaker)
speakerRouter.get("/",getAllSpeakers)
speakerRouter.get("/:id",getSpeakerById)
speakerRouter.put("/:id",updateSpeaker)
speakerRouter.delete("/:id",deleteSpeaker)


module.exports = speakerRouter


