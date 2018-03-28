import Vue from 'vue'
import Vuex from 'vuex'
import Store from '@/store/create'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    portioned: {}
  },
  mutations: {
    updatePortions (state, data) {
      state.portioned = Store.portionData(data)
    },
    setTarget (state, data) {
      state.targetID = data.targetID
    }
  }
})
