const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const voterRouter = require('./router/routes/voter')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
dotenv.config()

app.use('/voter', voterRouter)

const PORT = 5000

mongoose.connect(process.env.MONGODB_CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`)))
  .catch((error) => console.log('Error in Establishing connection with database', error))
