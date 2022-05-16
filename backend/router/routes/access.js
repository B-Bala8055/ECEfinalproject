const express = require('express')
const access = require('../controllers/access')

const router = express.Router()

router.post('/', access.grantAccess)

module.exports = router
