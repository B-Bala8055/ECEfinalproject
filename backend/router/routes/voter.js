const express = require('express')
const biometric = require('../../middleware/fingerprint')
const { submitVoterController } = require('../controllers/voter')

const router = express.Router()

router.post('/', biometric.fingerprint.single('fingerprint'), biometric.multerErrorHandler, submitVoterController)

module.exports = router
