const Party = require('../../models/partyModel')

const submitPartyController = async (req, res) => {
  try {
    const { body } = req
    // console.log('Data reached backend', party)

    const alreadyExists = Party.exists({ party: body.party })

    if (alreadyExists) {
      return res.status(201).json({ confirmation: false, msg: 'Party already exists' })
    }

    // Create a new political party in database
    await Party.create(body)

    // Send confirmaton message
    res.status(201).json({ confirmation: true, msg: 'Party registration successful' })
  }
  catch (err) {
    // Send error
    res.status(500).json({ confirmation: false, msg: 'Internal Server Error' })
    console.log('submitPartyController section', err)
  }
}

const getPartiesController = async (req, res) => {
  try {
    // Get all political parties from the database
    const data = await Party.find()
    // Send all the political parties to the embedded system voting machine
    res.status(200).json({ confirmation: true, msg: 'Data fetched', data })
  }
  catch (err) {
    // Send error
    res.status(500).json({ confirmation: false, msg: 'Internal Server Error' })
    console.log('getPartiesController section', err)
  }
}

module.exports = { submitPartyController, getPartiesController }
