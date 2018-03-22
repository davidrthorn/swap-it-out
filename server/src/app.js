const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const db = require('./queries')

app.use(bodyParser.json())

app.get('/api/:id', db.getSingleFood)

app.listen(process.env.PORT || 8081)
