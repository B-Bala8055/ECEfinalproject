const express = require('express')
const biometric = require('../../middleware/fingerprint')
const voterController = require('../controllers/voter')

const router = express.Router()

router.post('/', biometric.fingerprint.single('fingerprint'), biometric.multerErrorHandler, voterController.submitVoterController)
router.get('/', voterController.getVoterData)

module.exports = router
