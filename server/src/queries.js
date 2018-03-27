require('dotenv').config()

const promise = require('bluebird')
const options = { promiseLib: promise }
const createStore = require('./create-store')
const swaps = require('./swaps')

const pgp = require('pg-promise')(options)

const cn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
}

const db = pgp(cn)

module.exports = {
  getFoodByID: getFoodByID
}

function getFoodByID (req, res, next) {
  let foodID = req.params.id
  db.any(`
    SELECT
      ndb_no,
      msre_desc,
      gm_wgt
    FROM weight
    WHERE ndb_no IN ($1:csv)
      AND msre_desc LIKE '%medium%'
      AND gm_wgt BETWEEN 25 AND 150`,
  [[foodID, ...swaps[foodID]]]
  )
    .then(portionData => {
      db.any(`
        SELECT
          food_des.ndb_no,
          food_des.long_desc,
          nutr_def.nutr_no,
          nutr_def.nutrdesc,
          nut_data.nutr_val
        FROM food_des
        INNER JOIN nut_data ON nut_data.ndb_no=food_des.ndb_no
        INNER JOIN nutr_def ON nutr_def.nutr_no=nut_data.nutr_no
        WHERE food_des.ndb_no IN ($1:csv)`,
      [[foodID, ...swaps[foodID]]])
        .then(nutData => {
          let store = createStore.createStore(foodID, portionData, nutData)
          res.status(200)
            .json({
              data: store
            })
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
}
