import targetFoods from '@/data/target-foods.json'
import rdaValues from '@/data/rda.json'

export default {
  getDescription: getDescription,
  getMacros: getMacros,
  getMicros: getMicros
}


// functions needed: 
// 1. create swap description object
// 2. portion the data
// 3. split into macros and micros
// 4. apply RDA to micros
// 5. rank micros and deliver limited set

function getDescription (targetID, foods) {
  let desciptions = {}

  const portions = determinePortion(targetID, foods)

  for (let id in foods) {
    descriptions[id].name = foods[id].name
    descriptions[id].details = foods[id].description
    descriptions[id].portion = portions[id]
  } 
}

function getMacros (targetID, foods) {
  let macros = {}
  const toChoose = [
    'saturated',
    'monounsaturated',
    'polyunsaturated',
    'protein',
    'carbohydrates'
  ]

  const portions = determinePortion(targetID, foods)

  for (let id in foods) {
    let portion = portions[id]

    for (let nutr in foods[food].nutrition) {
      if (!toChoose.includes(nutr)) continue
      macros[id][nutr] = foods[food].nutrition[nutr] * portion / 100
    }
  }
  return macros
}

function getMicros (targetID, foods) {
  let micros = {}
  const portions = determinePortion(targetID, foods)

  for (let id in foods) {
    let portion = portions[id]

    for (let nutr in foods[food].nutrition) {
      micros[id][nutr] = foods[food]nutrition[nutr] * portion / 100
    }
  }
}

function determinePortion (targetID, foods) {
  let portions = {}
  let nut = ID => foods[ID].nutrition
  let targetPortion = targetFoods[targetID].portionWgt
  let targetCals = Math.round(nut(targetID)['calories'] * targetPortion / 100)

  portions[targetID] = targetPortion

  for (let id in foods) {
    if (id === targetID) continue
    let cals = nut(id)['calories']
    let meds = foods[id].medPortions

    portions[id] = meds
      ? meds[Object.keys(meds)[0]]
      : cals > 400
        ? Math.round(100 / cals * targetCals)
        : Math.round(100 / cals * 150)
  }
  return portions
}
