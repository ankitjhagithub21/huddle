require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/dbconnection')
const speakerRouter = require('./routes/speakerRoutes')
const attendeeRouter = require('./routes/attendeeRoutes')
const eventRouter = require('./routes/eventRoutes')
const venueRouter = require('./routes/venueRoutes')
const app = express()


connectDB()
const port = process.env.PORT || 3000

app.use(express.static("public"))

app.use(express.json())
app.use(cors({
  origin:process.env.ORIGIN,
  credentials:true
}))


app.use("/speakers",speakerRouter)
app.use("/attendees",attendeeRouter)
app.use("/events",eventRouter)
app.use("/venues",venueRouter)

app.get("/",(req,res)=>{
  res.json({"message":"Api working."})
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})

