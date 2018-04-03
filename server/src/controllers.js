/* eslint-disable */
const nutrientDetails = require('./nutrient-details')

module.exports = {
  createResponse: createResponse
}

function createResponse (foods, portionData, nutData) {
  // Unit conversion factors
  let unitConversion = {
    'mg': 1000,
    'µg': 1000000
  }

  let response = {
    foods: {}
  }

  // Create entry for each food
  for (let id of foods) {

    // Create object for individual food
    response.foods[id] = {
      nutrition: {},
      medPortions: {}
    }

    let food = response.foods[id]

    // Create and populate portions object
    portionData.forEach(portion => {
      if (portion.ndb_no === id) {
        food.medPortions[portion.msre_desc] = parseInt(portion.gm_wgt)
      }
    })

    food.medPortions = Object.keys(food.medPortions).length
      ? food.medPortions
      : null

    // Create and populate nutrition object
    let descFound = false

    for (let nutr of nutData) {
      let nutName = nutrientDetails.names[nutr.nutr_no]

      if (nutr.ndb_no === id) {
        let factor = unitConversion[nutr.units] || 1
        food.nutrition[nutName] = nutr.nutr_val / factor

        if (!descFound) {
          [food.name, food.description] = getDetails(nutr.long_desc)
          descFound = true
        }
      }
    }
  }
  return response
}

function getDetails (desc) {
  // Categories that can precede food names in long_desc
  let categories = [
    'Snacks',
    'Babyfood',
    'Nuts',
    'Seeds',
    'Crackers'
  ]

  let reCat = new RegExp(`(${categories.join('|')}), ([^(,|$)]+)`)

  let matchCat = desc.match(reCat)

  let foodName = matchCat
    ? matchCat[2]
    : desc.match(/(.+?),/)
      ? desc.match(/(.+?),/)[1].toLowerCase()
      : desc.toLowerCase()

  let reDetails = new RegExp(`.*${foodName}, (.*)`, 'i')
  let foodDetails = desc.match(reDetails)
    ? desc.match(reDetails)[1]
    : ''

  return [foodName, foodDetails]
}
