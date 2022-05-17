const Mongoose = require('mongoose')
/**
 * MongoDB schema for political party.
 */
const partySchema = Mongoose.Schema({
  party: { type: String, required: true },
  ward: { type: String, required: true },
  constituency: { type: String, required: true },
  leader: { type: String, required: true },
  votes: { type: Number, required: true, default: 0 }
})

const Party = Mongoose.model('party', partySchema)

module.exports = Party
