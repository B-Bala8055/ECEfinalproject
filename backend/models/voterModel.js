const Mongoose = require('mongoose')
/**
 * MongoDB schema for voter
 */
const voterModel = new Mongoose.Schema({
  name: { type: String, required: true },
  aadhar: { type: String, required: true },
  voter: { type: String, required: true },
  dob: { type: String, required: true },
  fingerprint: {
    data: Buffer,
    contentType: String
  },
  votingStatus: { type: Boolean, required: true }
})

const Voter = Mongoose.model('voter', voterModel)

module.exports = Voter
