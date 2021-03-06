/* eslint-disable */
require('dotenv').config()

const promise = require('bluebird')
const options = { promiseLib: promise }
const controllers = require('./controllers')
const nutDetails = require('./nutrient-details')

const pgp = require('pg-promise')(options)

const cn = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'usda',
  user: process.env.DB_USER || 'davidrowthorn',
  password: process.env.DB_PASSWORD || 'postpass'
}

const db = pgp(cn)

module.exports = {
  getFoodByID: getFoodByID
}

function getFoodByID (req, res, next) {
  if (!req.query.foods) {
    res.status(400)
      .json({
        status: 'Failed',
        message: 'No valid parameters specified in request',
        code: 'NOVALIDPARAMS'
      })
    return
  }

  let foods = req.query.foods.split('_')

  for (let food of foods) {
    if (food.match(/\d/g).length !== 5) {
      res.status(400)
        .json({
          status: 'Failed',
          message: 'Invalid food id requested',
          invalidId: food,
          code: 'INVALIDID'
        })
      return
    }
  }

  db.any(`
    SELECT
      ndb_no,
      msre_desc,
      gm_wgt
    FROM weight
    WHERE ndb_no IN ($1:csv)
      AND msre_desc LIKE '%medium%'
      AND gm_wgt BETWEEN 25 AND 200`,
  [foods])
    .then(portionData => {
      db.any(`
        SELECT
          food_des.ndb_no,
          food_des.long_desc,
          nutr_def.nutr_no,
          nut_data.nutr_val,
          nutr_def.units
        FROM food_des
        INNER JOIN nut_data ON nut_data.ndb_no=food_des.ndb_no
        INNER JOIN nutr_def ON nutr_def.nutr_no=nut_data.nutr_no
        WHERE food_des.ndb_no IN ($1:csv)
        AND nutr_def.nutr_no IN ($2:csv)`,
      [foods, Object.keys(nutDetails.names)])
        .then(nutData => {
          let responseData = controllers.createResponse(foods, portionData, nutData)
          for (let id in responseData.foods) {
            if (!responseData.foods[id].nutrition.protein) {
              res.status(400)
                .json({
                  status: 'Failure',
                  message: 'Food id not found',
                  missingId: id,
                  data: responseData
                })
              return
            }
          }
          res.status(200)
            .json({
              status: 'Success',
              message: `Retrieved data for ${foods.length} foods`,
              data: responseData
            })
        })
    })
    .catch(err => {
      console.log(err)
      if (err.code === 'ECONNREFUSED') {
        res.status(500)
          .json({
            status: 'Failed',
            message: 'Could not connect to postgresql server',
            code: err.code
          })
      } else {
        res.sendStatus(500)
      }
    })
}
