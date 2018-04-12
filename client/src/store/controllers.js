/* eslint-disable */
import targetFoods from '@/data/target-foods.json'
import rdaValues from '@/data/rda.json'

const microLimit = 6

export default {
  getDescriptions: getDescriptions,
  getMacros: getMacros,
  getMicros: getMicros
}

function getDescriptions (targetId, foods) {
  let descriptions = {}

  const portions = determinePortion(targetId, foods)

  for (let id in foods) {
    descriptions[id] = {}
    descriptions[id].name = foods[id].name
    descriptions[id].details = foods[id].description
    descriptions[id].portion = portions[id]
  }
  return descriptions
}

function getMacros (targetId, foods) {
  let macros = {}
  const toChoose = [
    'saturated',
    'monounsaturated',
    'polyunsaturated',
    'protein',
    'carbs'
  ]

  const portions = determinePortion(targetId, foods)

  for (let id in foods) {
    macros[id] = {}
    let portion = portions[id]

    for (let nutr in foods[id].nutrition) {
      if (!toChoose.includes(nutr)) continue
      macros[id][nutr] = foods[id].nutrition[nutr] * portion / 100
    }
    
    // This way of storing the data does not allow access to the original values
    macros[id].salt = foods[id].nutrition.sodium * portion * 2.5 / rdaValues.macro.salt
    macros[id].sugar = foods[id].nutrition.sugar * portion / rdaValues.macro.sugar
    macros[id].fibre = foods[id].nutrition.fibre * portion / rdaValues.macro.fibre
  }
  return macros
}

function getMicros (targetId, foods) {
  let micros = {}
  let tempMicros = {}
  let microMaxes = {}

  const portions = determinePortion(targetId, foods)

  for (let id in foods) {
    tempMicros[id] = {}
    let portion = portions[id]

    for (let nutr in foods[id].nutrition) {
      if (!rdaValues.micro[nutr]) continue 
      tempMicros[id][nutr] = {}
      let portionNutr = foods[id].nutrition[nutr] * portion / 100
      let rdaNutr = portionNutr / rdaValues.micro[nutr] * 100

      tempMicros[id][nutr].total = portionNutr
      tempMicros[id][nutr].percentRda = rdaNutr

     if (!microMaxes[nutr] || microMaxes[nutr] < rdaNutr) microMaxes[nutr] = rdaNutr
    }
  }

  let sortedMicros = Object.keys(microMaxes).sort((a, b) => {
    return microMaxes[b] - microMaxes[a]
  }).slice(0, microLimit)

  for (let id in tempMicros) {
    micros[id] = {}
    for (let micro in tempMicros[id]) {
      if (sortedMicros.includes(micro)) micros[id][micro] = tempMicros[id][micro]
    }
  }

  return micros
}

function determinePortion (targetId, foods) {
  let portions = {}
  let nut = id => foods[id].nutrition
  let targetPortion = targetFoods[targetId].portion
  let targetCals = Math.round(nut(targetId)['calories'] * targetPortion / 100)

  portions[targetId] = targetPortion

  for (let id in foods) {
    if (id === targetId) continue
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
