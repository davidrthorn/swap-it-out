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
  db.any(
    `WITH portions (ndb_no, med_portion, gm_wgt)
    AS
    (
      SELECT DISTINCT ndb_no,
      CASE
      WHEN weight.msre_desc LIKE '%medium%' AND gm_wgt BETWEEN 25 AND 150
        THEN msre_desc
      ELSE
        'none'
      END AS med_portion,
      CASE
      WHEN weight.msre_desc LIKE '%medium%' AND gm_wgt BETWEEN 25 AND 150
        THEN gm_wgt
      ELSE
        100
      END AS gm_wgt
      FROM weight
      WHERE ndb_no IN ($1:csv)
    )

    SELECT portions.ndb_no, portions.med_portion, portions.gm_wgt, food_des.long_desc FROM portions
    JOIN
    (
      SELECT ndb_no, COUNT(med_portion)
      FROM portions
      GROUP BY ndb_no
    ) AS grouped
    ON grouped.ndb_no=portions.ndb_no
    JOIN food_des ON food_des.ndb_no=portions.ndb_no
    WHERE NOT (med_portion='none' AND count>1)`,
    [swaps[foodID]]
  )
    .then(portionData => {
      db.any(`SELECT food_des.ndb_no, food_des.long_desc, nutr_def.nutr_no, nutr_def.nutrdesc, nut_data.nutr_val
        FROM food_des
        INNER JOIN nut_data ON nut_data.ndb_no=food_des.ndb_no
        INNER JOIN nutr_def ON nutr_def.nutr_no=nut_data.nutr_no
        WHERE food_des.ndb_no IN ($1:csv)`,
      [swaps[foodID]])
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
