const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const Voter = require('../../models/voterModel')

const submitVoterController = async (req, res) => {
  try {
    const { voter, file } = req

    const voterData = {
      ...voter,
      fingerprint: {
        data: fs.readFileSync(path.join(__dirname, '..', '..', 'uploads', 'fp', file.filename)),
        contentType: file.mimetype
      }
    }

    await Voter.create(voterData)

    // console.log('From db...', data)

    const deleteAsync = promisify(fs.unlink)

    await deleteAsync(path.join(__dirname, '..', '..', 'uploads', 'fp', file.filename))

    // console.log('fingerprint location', path.join(__dirname, '..', '..', 'uploads', 'fp'))
    res.status(201).json({ confirmation: true, msg: 'Voter registered successfully' })
  }
  catch (err) {
    res.status(500).json({ confirmation: false, msg: 'Internal Server Error' })
    console.log('submitVoterController error', err)
  }
}

module.exports = { submitVoterController }
