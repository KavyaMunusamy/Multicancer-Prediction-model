const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes')
const predictionRoutes = require('./routes/predictionRoutes')
const historyRoutes = require('./routes/historyRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api', predictionRoutes)
app.use('/api', historyRoutes)

app.listen(5000, () => {
  console.log('Server running on port 5000')
})
