const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const queries = require('./queries')

app.use(bodyParser.json())
app.use(cors())

app.get('/api/food', queries.getFoodByID)

app.listen(process.env.PORT || 8081)
