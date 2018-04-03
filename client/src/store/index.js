import Vue from 'vue'
import Vuex from 'vuex'
import controllers from '@/store/controllers'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    swaps: {}
  },
  mutations: {
    updatePortions (state, data) {
      state.swaps = controllers.portionData(data.targetID, data.foods.foods)
    },
    setTarget (state, targetID) {
      state.targetID = targetID
    }
  }
})
