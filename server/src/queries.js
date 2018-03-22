const promise = require('bluebird')

const options = {
  promiseLib: promise
}

var pgp = require('pg-promise')(options)
var connectionString = 'postgres://postgres:testapp@localhost:5432/usda'
var db = pgp(connectionString)

module.exports = {
  getSingleFood: getSingleFood
}

function getSingleFood (req, res, next) {
  let food = req.params.id
  db.any(`SELECT long_desc AS name FROM food_des
    WHERE long_desc LIKE $1
    LIMIT 5`,
  `%${food}%`)
    .then(data => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: `Retrieved dem foods wit da word '${food}' in.`
        })
    })
    .catch(err => next(err))
}
