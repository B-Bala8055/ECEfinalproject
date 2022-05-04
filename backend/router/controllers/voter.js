const path = require('path')
const base64Img = require('base64-img');
const fs = require('fs')
const { promisify } = require('util')
const { spawn } = require('child_process')
const Voter = require('../../models/voterModel')

const submitVoterController = async (req, res) => {
  try {
    const { voter, file } = req

    // // read binary data
    // var bitmap = fs.readFileSync(file);
    // // convert binary data to base64 encoded string
    // return new Buffer(bitmap).toString('base64');
    const binImg = fs.readFileSync(path.join(__dirname, '..', '..', 'uploads', 'fp', file.filename))
    const baseImg = new Buffer.from(binImg, 'base64').toString('base64')
    const voterData = {
      ...voter,
      votingStatus: false,
      fingerprint: {
        data: baseImg,
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
    // Get aadhar number and date of birth from query string.
    const { aadhar, dob } = req.query

    // Find the voter with aadhar card
    const voter = await Voter.findOne({ aadhar }).select({
      name: 1, aadhar: 1, voter: 1, dob: 1, votingStatus: 1
    })

    // If voter is not found, send 'No data found' message
    if (voter === null) {
      return res.status(200).json({ confirmation: false, msg: 'No data found' })
    }

    // If the voter is accessed from embedded machine, allow access without dob
    if (dob === 'privileged') {
      return res.status(200).json({ confirmation: true, msg: 'Data found', voter })
    }
    // If voter provides a wrong date of birth, send 'Unauthorized' message
    if (voter.dob !== dob) {
      return res.status(200).json({ confirmation: false, msg: 'Unauthorized' })
    }

    // If voter is found, send voter data
    return res.status(200).json({ confirmation: true, msg: 'Data found', voter })
  }
  catch (err) {
    // Send error
    res.status(500).json({ confirmation: false, msg: 'Internal Server Error' })
    console.log('getVoterData error', err)
  }
}

const validateVoter = async (req, res) => {
  try {
    const { aadhar } = req.query
    let score
    let matched = false

    const voter = await Voter.findOne({ aadhar }).select({ fingerprint: 1 })

    const fpString = voter._doc.fingerprint.data.toString()

    const prefix = 'data:image/jpeg;base64,'

    base64Img.img(prefix + fpString, './IMG', `${aadhar}`, (err, filepath) => {
      if (err) {
        return res.status(500).send(
          { message: `Image failed to decode ${err}` }
        );
      }
      console.log(filepath)
      return res.send({ msg: 'Success' })
    })

    const pyfp = spawn('python', [path.join(__dirname, '..', '..', 'python', 'fpmatch.py'), storedImage]) // All after path in list is arguments

    pyfp.stdout.on('data', (data) => {
      score = Number(data.toString())
      if (score > 50) {
        matched = true
      }
      res.send(matched)
    })
    pyfp.stderr.on('data', (data) => {
      res.send(data.toString())
    })
  }
  catch (err) {
    console.log('Validate Voter', err)
  }
}

module.exports = { submitVoterController, getVoterData, validateVoter }
