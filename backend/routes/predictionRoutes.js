const express = require('express')

const router = express.Router()

const authMiddleware = require('../middleware/authMiddleware')

const {
  predictBreastCancer,
  predictCervicalCancer
} = require('../controllers/predictionController')

router.post(
  '/predict/breast',
  authMiddleware,
  predictBreastCancer
)

router.post(
  '/predict/cervical',
  authMiddleware,
  predictCervicalCancer
)

module.exports = router