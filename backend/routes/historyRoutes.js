const express = require('express')

const router = express.Router()

const authMiddleware = require('../middleware/authMiddleware')

const {
  getPredictionHistory
} = require('../controllers/historyController')

router.get(
  '/history',
  authMiddleware,
  getPredictionHistory
)

module.exports = router