const promise = require('bluebird')

const options = {
  promiseLib: promise
}

const pgp = require('pg-promise')(options)
const connectionString = 'postgres://davidr:testapp@localhost:5432/usda'
const db = pgp(connectionString)

module.exports = {
  getFoodByID: getFoodByID
}

function getFoodByID (req, res, next) {
  let foodID = req.params.id
  db.any(`SELECT food_des.ndb_no AS food_id,
    food_des.lONg_desc AS food_name,
    nutr_def.nutrdesc AS nutrient_name,
    nut_data.nutr_val AS nutrient_value,
    nutr_def.units AS units
    FROM food_des
    INNER join nut_data ON food_des.ndb_no=nut_data.ndb_no
    INNER join nutr_def ON nut_data.nutr_no=nutr_def.nutr_no
    WHERE food_des.ndb_no = $1`,
  `${foodID}`)
    .then(data => {
      res.status(200)
        .json({
          status: 'success',
          message: `Retrieved record with ID ${foodID} from USDA database.`,
          name: data[0].food_name,
          data: (() => {
            let nutr = {}
            data.forEach(d => {
              nutr[d.nutrient_name] = d.nutrient_value + d.units
            })
            return nutr
          })()
        })
    })
    .catch(err => next(err))
}
