const swaps = require('./swaps')
module.exports = {
  createStore (foodID, portionData, nutData) {
    let store = {}

    store.targetFood = foodID
    store.swaps = swaps[foodID]

    for (let id of swaps[foodID]) {
      // Create object for individual food
      store[id] = {}

      // Create and populate portions object
      let medPortions = {}

      portionData.forEach(p => {
        if (p.ndb_no === id) {
          medPortions[p.med_portion] = parseInt(p.gm_wgt)
          store[id].name = p.long_desc
        }
      })

      store[id].medPortions = medPortions

      // Create and populate nutrition object
      let nutrition = {}
      for (let nutr of nutData) {
        if (nutr.ndb_no === id) nutrition[nutr.nutr_no] = parseInt(nutr.nutr_val)
      }
      store[id].nutrition = nutrition
    }

    return store
  }
}
