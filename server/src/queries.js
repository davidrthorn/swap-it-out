require('dotenv').config()
const swaps = require('./swaps')
const promise = require('bluebird')
const options = { promiseLib: promise }
const createStore = require('./create-store')

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
  db.any(`SELECT DISTINCT  ndb_no,
     CASE
       WHEN msre_desc LIKE '%medium%' AND gm_wgt BETWEEN 25 AND 150
         THEN msre_desc
       ELSE
         'standard'
     END AS pt_name,
     CASE
       WHEN msre_desc LIKE '%medium%' AND gm_wgt BETWEEN 25 AND 150
         THEN gm_wgt
      ELSE
        100
    END AS pt_wgt
    FROM weight
    WHERE ndb_no IN ($1:csv)`,
  [swaps[foodID]])
    .then(portionData => {
      db.any(`SELECT food_des.ndb_no, food_des.long_desc, nutr_def.nutrdesc, nut_data.nutr_val
        FROM food_des
        INNER JOIN nut_data ON nut_data.ndb_no=food_des.ndb_no
        INNER JOIN nutr_def ON nutr_def.nutr_no=nut_data.nutr_no
        WHERE food_des.ndb_no IN ($1:csv)`,
      [swaps[foodID]])
        .then(nutData => {
          let store = createStore.createStore(portionData, nutData)
          res.status(200)
            .json({
              status: 'success',
              message: `Retrieved record with ID ${foodID} from USDA database.`,
              data: store
            })
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
}
