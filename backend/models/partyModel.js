const Mongoose = require('mongoose')

const partySchema = Mongoose.Schema({
  party: { type: String, required: true },
  leader: { type: String, required: true }
})

const Party = Mongoose.model('party', partySchema)

module.exports = Party
