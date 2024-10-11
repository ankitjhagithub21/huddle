require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/dbconnection')
const app = express()


connectDB()
const port = process.env.PORT || 

app.use(express.json())
app.use(cors({
  origin:process.env.ORIGIN,
  credentials:true
}))

app.get("/",(req,res)=>{
  res.json({"message":"Api working."})
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})