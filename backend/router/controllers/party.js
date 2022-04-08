const Party = require('../../models/partyModel')

const submitPartyController = async (req, res) => {
  try {
    const { body } = req
    // console.log('Data reached backend', party)
    await Party.create(body)

    res.status(201).json({ confirmation: true, msg: 'Party registration successful' })
  }
  catch (err) {
    res.status(500).json({ confirmation: false, msg: 'Internal Server Error' })
    console.log('submitPartyController section', err)
  }
}

const getPartiesController = async (req, res) => {
  try {
    const data = await Party.find()
    res.status(200).json({ confirmation: true, msg: 'Data fetched', data })
  }
  catch (err) {
    res.status(500).json({ confirmation: false, msg: 'Internal Server Error' })
    console.log('getPartiesController section', err)
  }
}

module.exports = { submitPartyController, getPartiesController }
