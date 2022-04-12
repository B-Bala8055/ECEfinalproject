const express = require('express')
const partyControllers = require('../controllers/party')

const router = express.Router()

/**
 * Register Political Party information from frontend to database
 * Data sent from frontend
 */
router.post('/', partyControllers.submitPartyController)
/**
 * Get all Political party list.
 * Data sent to the embedded voting machine
 */
router.get('/', partyControllers.getPartiesController)

module.exports = router
