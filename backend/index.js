const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const voterRouter = require('./router/routes/voter')
const partyRouter = require('./router/routes/party')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
dotenv.config()

// Route to handle voter routes
app.use('/voter', voterRouter)
// Route to handle political party routes
app.use('/party', partyRouter)

// Server port
const PORT = 5000
const host = '192.168.43.168'
/** ESTABLISHING mongodb connection
 * After connection is established, server is started at port specified
 * If error, It prints the error
 */
mongoose.connect(process.env.MONGODB_CONNECTION_URL)
  .then(() => app.listen(PORT, host, () => console.log(`Server is running on port ${PORT}...`)))
  .catch((error) => console.log('Error in Establishing connection with database', error))
