import swapData from '../data/swaps.json'
import foodData from '../data/foods.json'
import rdaData from '../data/rda.json'

export function createDataStore (food) {
  const macros = [
    'sat',
    'mono',
    'poly',
    'protein',
    'carbs'
  ]

  // Functions

  function toPortion (value, portion, rda) {
    return rda
      ? Math.round((portion / 100 * value) / rda * 100)
      : Math.round(portion / 100 * value)
  }

  function normalizePortion (swapCals, swapPortion, targetCals, targetPortion) {
    let adjTarget = toPortion(targetCals, targetPortion)
    let adjSwap = toPortion(swapCals, swapPortion)
    return Math.abs(adjTarget - adjSwap) < 50
      ? Math.round(swapPortion / adjSwap * adjTarget)
      : Math.round(swapPortion)
  }

  const swaps = swapData[food]
  const targetPortion = Math.round(foodData[food].portion)
  const finalSwaps = {}

  const microCalc = (category) => {
    let current = foodData[food].micros[category]
    let final = {}

    for (let micro in current) {
      let rda = rdaData[micro]
      final[micro] = toPortion(current[micro], targetPortion, rda)

      for (let swap of swaps) {
        let currentSwap = foodData[swap]
        let swapMicro = toPortion(currentSwap.micros[category][micro], currentSwap.portion, rda)
        if (swapMicro > final[micro]) {
          final[micro] = swapMicro
        }
      }
    }

    return Object.keys(final).sort((a, b) => final[b] - final[a])
      .splice(0, 6)
      .sort()
  }

  const minerals = microCalc('minerals')
  const vitamins = microCalc('vitamins')

  // Build swap objects and push to swaps array
  for (let s of swaps) {
    let current = foodData[s]
    let portion = normalizePortion(
      current.calories,
      current.portion,
      foodData[food].calories,
      foodData[food].portion
    )
    let swap = {
      details: {},
      macros: {},
      micros: {
        minerals: {},
        vitamins: {}
      }
    }

    swap.name = s
    swap.calories = toPortion(current.calories, portion)
    swap.portion = portion
    swap.details.cooked = current.cooked
    swap.details.flavour = current.flavour

    macros.forEach(m => {
      swap.macros[m] = toPortion(current.macros[m], portion)
    })

    swap.macros.fat = toPortion(current.macros.sat + current.macros.mono + current.macros.poly, portion)
    swap.macros.salt = toPortion(current.macros.salt, portion, rdaData.salt)
    swap.macros.sugar = toPortion(current.macros.sugar, portion, rdaData.sugar)
    swap.macros.fibre = toPortion(current.macros.fibre, portion, rdaData.fibre)

    minerals.forEach(m => {
      swap.micros.minerals[m] = toPortion(current.micros.minerals[m], portion, rdaData[m])
    })

    vitamins.forEach(m => {
      swap.micros.vitamins[m] = toPortion(current.micros.vitamins[m], portion, rdaData[m])
    })

    finalSwaps[s] = swap
  }

  return {
    targetFood: {
      name: food,
      calories: toPortion(foodData[food].calories, targetPortion),
      portion: targetPortion,
      details: {
        cooked: foodData[food].cooked,
        flavour: foodData[food].flavour
      },
      macros: (() => {
        let obj = {}
        macros.forEach((macro) => {
          obj[macro] = toPortion(foodData[food].macros[macro], targetPortion)
        })

        obj.fat = toPortion(foodData[food].macros.sat + foodData[food].macros.mono + foodData[food].macros.poly, targetPortion)
        obj.salt = toPortion(foodData[food].macros.salt, targetPortion, rdaData.salt)
        obj.sugar = toPortion(foodData[food].macros.sugar, targetPortion, rdaData.sugar)
        obj.fibre = toPortion(foodData[food].macros.fibre, targetPortion, rdaData.fibre)

        return obj
      })(),
      micros: {
        minerals: (() => {
          let obj = {}
          minerals.forEach((mineral) => {
            obj[mineral] = toPortion(foodData[food].micros.minerals[mineral], targetPortion, rdaData[mineral])
          })
          return obj
        })(),
        vitamins: (() => {
          let obj = {}
          vitamins.forEach((vitamin) => {
            obj[vitamin] = toPortion(foodData[food].micros.vitamins[vitamin], targetPortion, rdaData[vitamin])
          })
          return obj
        })()
      }
    },
    swaps: finalSwaps
  }
}
