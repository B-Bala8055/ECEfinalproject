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

    const data = await Voter.create(voterData)

    console.log('From db...', data)

    const deleteAsync = promisify(fs.unlink)

    await deleteAsync(path.join(__dirname, '..', '..', 'uploads', 'fp', file.filename))

    // console.log('fingerprint location', path.join(__dirname, '..', '..', 'uploads', 'fp'))
    res.status(201).json({ msg: 'Reached server' })
  }
  catch (err) {
    console.log('submitVoterController error', err)
  }
}

module.exports = { submitVoterController }
