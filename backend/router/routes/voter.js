const express = require('express')
const biometricRegn = require('../../middleware/fingerprint')
const biometricValidation = require('../../middleware/validationFp')
const voterController = require('../controllers/voter')

const router = express.Router()

/**
 * Registration of voter
 * Gets all data from frontend and posts it to the database
 */
router.post('/', biometricRegn.fingerprint.single('fingerprint'), biometricRegn.multerErrorHandler, voterController.submitVoterController)
/**
 * Gets voter information provided the aadhar number and date of birth
 * Displays values in the frontend
 */
router.get('/', voterController.getVoterData)
router.patch('/', biometricValidation.validationFp.single('fingerprint'), biometricValidation.multerErrorHandler, voterController.validateVoter)
module.exports = router
