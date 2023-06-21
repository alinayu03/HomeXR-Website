require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const homeRoutes = require('./routes/homes')
const userRoutes = require('./routes/user')

// express app
const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/homes', homeRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
