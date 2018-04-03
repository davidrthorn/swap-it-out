import Vue from 'vue'
import Vuex from 'vuex'
import controllers from '@/store/controllers'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    targetID: '',
    currentID: '',
    description: {},
    macros: {},
    micros: {}
  },
  mutations: {
    setTarget (state, targetID) {
      state.targetID = targetID
    },
    setCurrent (state, currentID) {
      state.currentID = currentID
    },
    setDescription (state, targetID, data) {
      
    },
    setMacros (state, targetID, data) {

    },
    setMicros (state, data) {

    }
  }
})
