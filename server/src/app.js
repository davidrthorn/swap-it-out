const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const db = require('./queries')

app.use(bodyParser.json())
app.use(cors())

app.get('/api/:id', db.getFoodByID)

app.listen(process.env.PORT || 8081)
