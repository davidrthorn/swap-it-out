/* eslint-disable */

const swaps = require('./swaps')
module.exports = {
  createStore (foodID, portionData, nutData) {
    let store = {}

    store.targetID = foodID
    store.swapIDs = swaps[foodID]
    store.foods = {}

    for (let id of [foodID, ...swaps[foodID]]) {
      // Create object for individual food
      store.foods[id] = {}

      // Create and populate portions object
      let medPortions = {}

      portionData.forEach(p => {
        if (p.ndb_no === id) {
          medPortions[p.msre_desc] = parseInt(p.gm_wgt)
          store.foods[id].name = p.long_desc
        }
      })

      store.foods[id].medPortions = Object.keys(medPortions).length ? medPortions : null

      // Create and populate nutrition object
      let nutrition = {}
      for (let nutr of nutData) {
        if (nutr.ndb_no === id) nutrition[nutr.nutr_no] = parseInt(nutr.nutr_val)
      }
      store.foods[id].nutrition = nutrition
    }

    return longDesc('Snacks, potato chips, blah, some more info')
  }
}

function longDesc (desc) {
  let categories = [
    'Snacks',
    'Babyfood',
    'Nuts',
    'Seeds'
  ]

  let reCat = new RegExp (`(${categories.join('|')}), (.*?),`)

  let matchCat = desc.match(reCat) 

  let foodName = matchCat ? matchCat[2] : desc.match(/(.+?),/)[1].toLowerCase()
  let reDetails = new RegExp(`.*${foodName}, (.*)`, 'i')
  let foodDetails = desc.match(reDetails)[1]

  return {
    foodName: foodName,
    foodDesc: foodDesc
  }
}
