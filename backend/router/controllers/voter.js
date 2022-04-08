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
    return res.status(201).json({ confirmation: true, msg: 'Voter registered successfully' })
  }
  catch (err) {
    res.status(500).json({ confirmation: false, msg: 'Internal Server Error' })
    console.log('submitVoterController error', err)
  }
}

const getVoterData = async (req, res) => {
  try {
    const { aadhar, dob } = req.query

    const voter = await Voter.findOne({ aadhar }).select({
      name: 1, aadhar: 1, voter: 1, dob: 1
    })

    if (voter === null) {
      return res.status(200).json({ confirmation: false, msg: 'No data found' })
    }

    if (voter.dob !== dob) {
      return res.status(200).json({ confirmation: false, msg: 'Unauthorized' })
    }

    return res.status(200).json({ confirmation: true, msg: 'Data found', voter })
  }
  catch (err) {
    res.status(500).json({ confirmation: false, msg: 'Internal Server Error' })
    console.log('getVoterData error', err)
  }
}

module.exports = { submitVoterController, getVoterData }
