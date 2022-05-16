const Accessor = require('../../models/accessorModel')
const Voter = require('../../models/voterModel')

const grantAccess = async (req, res) => {
  try {
    const { aadhar } = req.query
    console.log('Reached backend', aadhar)
    const voter = await Voter.findOne({ aadhar })

    const data = {
      accessorId: voter._doc._id,
      name: voter._doc.name,
      aadhar: voter._doc.aadhar,
      voter: voter._doc.voter,
      ward: voter._doc.ward,
      dob: voter._doc.dob,
      fingerprint: voter._doc.fingerprint,
      votingStatus: voter._doc.votingStatus
    }

    // console.log(data.accessorId, data.name, data.dob)

    await Accessor.create(data)

    res.status(200).json({ confirmation: true, msg: 'Granted succesfully' })
  }
  catch (err) {
    res.status(500).json({ confirmation: false, msg: 'Internal server error' })
    console.log('Error in grant access', err)
  }
}

module.exports = { grantAccess }
