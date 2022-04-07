const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/voter', async (req, res) => {
  console.log('Working')
  res.status(201).json({ msg: 'Server reached...' })
});

const PORT = 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`))
