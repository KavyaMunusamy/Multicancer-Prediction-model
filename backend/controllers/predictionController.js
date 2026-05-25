const axios = require('axios')
const db = require('../config/db')

exports.predictBreastCancer = async (req, res) => {

  try {

    // Send data to ML API
    const response = await axios.post(
      'http://localhost:8000/predict/breast',
      req.body
    )

    const prediction = response.data.prediction
    const risk_score = response.data.risk_score

    // Save prediction history
    db.query(
      `INSERT INTO predictions 
      (user_id, cancer_type, prediction, risk_score)
      VALUES (?, ?, ?, ?)`,
      [
        req.user.id,
        'Breast Cancer',
        prediction,
        risk_score
      ]
    )

    res.status(200).json({
      prediction,
      risk_score
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}

exports.predictCervicalCancer = async (req, res) => {

  try {

    const response = await axios.post(
      'http://localhost:8000/predict/cervical',
      req.body
    )

    const prediction = response.data.prediction
    const risk_score = response.data.risk_score

    db.query(
      `INSERT INTO predictions 
      (user_id, cancer_type, prediction, risk_score)
      VALUES (?, ?, ?, ?)`,
      [
        req.user.id,
        'Cervical Cancer',
        prediction,
        risk_score
      ]
    )

    res.status(200).json({
      prediction,
      risk_score
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}