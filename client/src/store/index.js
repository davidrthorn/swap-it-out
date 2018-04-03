import Vue from 'vue'
import Vuex from 'vuex'
import controllers from '@/store/controllers'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    targetId: '',
    currentId: '',
    descriptions: {},
    macros: {},
    micros: {}
  },
  mutations: {
    setTarget (state, targetId) {
      state.targetId = targetId
    },
    setCurrent (state, currentId) {
      state.currentId = currentId
    },
    setDescriptions (state, data) {
      state.descriptions = controllers.getDescriptions(data.targetID, data.foods)
    },
    setMacros (state, data) {
      state.macros = controllers.getMacros(data.targetID, data.foods)
    },
    setMicros (state, data) {
      state.micros = controllers.getMicros(data.targetID, data.foods)
    }
  }
})
