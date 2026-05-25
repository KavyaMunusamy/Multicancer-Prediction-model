const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../config/db')

exports.register = async (req, res) => {

  try {

    const { name, email, password } = req.body

    // Check existing user
    db.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (err, result) => {

        if (err)
          return res.status(500).json(err)

        if (result.length > 0) {
          return res.status(400).json({
            message: 'User already exists'
          })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Insert user
        db.query(
          'INSERT INTO users(name, email, password) VALUES (?, ?, ?)',
          [name, email, hashedPassword],
          (err, result) => {

            if (err)
              return res.status(500).json(err)

            res.status(201).json({
              message: 'User registered successfully'
            })
          }
        )
      }
    )

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}

exports.login = (req, res) => {

  try {

    const { email, password } = req.body

    db.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (err, result) => {

        if (err)
          return res.status(500).json(err)

        if (result.length === 0) {
          return res.status(404).json({
            message: 'User not found'
          })
        }

        const user = result[0]

        // Compare password
        const validPassword = await bcrypt.compare(
          password,
          user.password
        )

        if (!validPassword) {
          return res.status(400).json({
            message: 'Invalid password'
          })
        }

        // Create token
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email
          },
          'SECRET_KEY',
          {
            expiresIn: '1d'
          }
        )

        res.status(200).json({
          message: 'Login successful',
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        })
      }
    )

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}