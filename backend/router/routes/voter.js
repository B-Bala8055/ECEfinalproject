const express = require('express')
const biometric = require('../../middleware/fingerprint')
const voterController = require('../controllers/voter')

const router = express.Router()

/**
 * Registration of voter
 * Gets all data from frontend and posts it to the database
 */
router.post('/', biometric.fingerprint.single('fingerprint'), biometric.multerErrorHandler, voterController.submitVoterController)
/**
 * Gets voter information provided the aadhar number and date of birth
 * Displays values in the frontend
 */
router.get('/', voterController.getVoterData)
router.patch('/', voterController.validateVoter)
module.exports = router
