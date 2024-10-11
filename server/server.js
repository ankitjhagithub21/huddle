require('dotenv').config()
const express = require('express')
const connectDB = require('./config/dbconnection')
const app = express()


connectDB()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})