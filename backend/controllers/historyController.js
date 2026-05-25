const db = require('../config/db')

exports.getPredictionHistory = (req, res) => {

  try {

    db.query(
      `SELECT * FROM predictions
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [req.user.id],
      (err, result) => {

        if (err)
          return res.status(500).json(err)

        res.status(200).json(result)
      }
    )

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}