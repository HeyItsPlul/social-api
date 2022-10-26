const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

// MiddleWare
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

// Routes
const userRoute = require('./Routes/userRoute')
app.use('/user', userRoute)

// Connect To DataBase/Api
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Api Online Using Port: ${PORT}`))
mongoose.connect(process.env.DB_KEY, console.log('Connected To MongoDB...')) 