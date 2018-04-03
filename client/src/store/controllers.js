import targetFoods from '@/data/target-foods.json'
export default {
  portionData: portionData
}

function portionData (targetID, foods) {
  const portions = determinePortion(targetID, foods)
  let portionedData = {
    targetID: targetID
  }
  portionedData.foods = {}

  for (let food in foods) {
    let portion = portions[food]
    portionedData.foods[food] = {
      name: foods[food].name,
      description: foods[food].description,
      portion: portion,
      nutrition: {}
    }
    for (let nutr in foods[food].nutrition) {
      portionedData.foods[food].nutrition[nutr] = foods[food].nutrition[nutr] * portion / 100
    }
  }
  return portionedData
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
