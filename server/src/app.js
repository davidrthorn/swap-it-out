const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
// SECURITY WARNING: CORS
app.use(cors())

app.get('/status', (req, res) => {
  res.send({
    message: `This is my response y'all`
  })
})

app.listen(process.env.PORT || 8081)
