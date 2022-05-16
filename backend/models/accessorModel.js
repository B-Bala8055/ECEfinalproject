const Mongoose = require('mongoose')

const accessorModel = new Mongoose.Schema({
  accessorId: { type: String, required: true },
  name: { type: String, required: true },
  aadhar: { type: String, required: true },
  voter: { type: String, required: true },
  ward: { type: String, required: true },
  dob: { type: String, required: true },
  fingerprint: {
    data: Buffer,
    contentType: String
  },
  votingStatus: { type: Boolean, required: true }
})

const Accessor = Mongoose.model('accessor', accessorModel)

module.exports = Accessor
