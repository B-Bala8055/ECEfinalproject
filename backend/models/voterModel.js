const Mongoose = require('mongoose')

const voterModel = new Mongoose.Schema({
  name: { type: String, required: true },
  aadhar: { type: String, required: true },
  voter: { type: String, required: true },
  dob: { type: String, required: true },
  fingerprint: {
    data: Buffer,
    contentType: String
  }
})

const Voter = Mongoose.model('voter', voterModel)

module.exports = Voter
