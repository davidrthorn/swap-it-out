/* eslint-disable */

// --n2k--
// each calorie density
// each whether exists medium portion
// target calories
//
// --decisions--
// If there is no medium portion, normalize*.
//
// If medium portion *but* medium portion calories is within RANGE of target calories, normalize*.
//  Else determine the appropriate medium portion.
//
//
//
// -------------
// *Normalization should have an upper limit denoted by grams.
// No portion should be hundreds of grams in the event that no medium portion
// is available.
export default {
  portionData (data) {
    let foods = data.foods
    let targetID = data.targetID

    const portions = determinePortion(targetID, foods)
    let portionedData = {}
    portionedData.foods = {}

    for (let food in foods) {
      let portion = portions[food]
      portionedData.foods[food] = {}
      for (let nutr in foods[food].nutrition) {
        portionedData.foods[food][nutr] = foods[food].nutrition[nutr] * portion / 100
      }
    }
    return portionedData
  }
}

function determinePortion (targetID, foods) {
  let portions = {}
  let nut = ID => foods[ID].nutrition
  let targetCals = Math.round(nut(targetID)['208'] * 28 / 100) // THIS IS HARDCODED PORTION

  for (let id in foods) {
    let cals = nut(id)['208']
    let meds = foods[id].medPortions

    portions[id] = meds
      ? meds[Object.keys(meds)[0]]
      : cals > 400
        ? Math.round(100 / cals * targetCals)
        : Math.round(100 / cals * 150)
  }
  return portions
}

