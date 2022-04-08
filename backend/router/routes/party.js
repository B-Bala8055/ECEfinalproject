const express = require('express')
const partyControllers = require('../controllers/party')

const router = express.Router()

router.post('/', partyControllers.submitPartyController)
router.get('/', partyControllers.getPartiesController)

module.exports = router
