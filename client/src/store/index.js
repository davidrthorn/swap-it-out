import Vue from 'vue'
import Vuex from 'vuex'
import ctr from '@/store/controllers'

Vue.use(Vuex)

function createState (data) {
  return {
    targetId: data.targetId,
    currentId: data.targetId,
    descriptions: ctr.getDescriptions(data.targetId, data.foods),
    macros: ctr.getMacros(data.targetId, data.foods),
    micros: ctr.getMicros(data.targetId, data.foods)
  }
}

function builder (data) {
  return new Vuex.Store({
    state: createState(data),
    mutations: {
      setTarget (state, data) {
        Object.assign(state, createState(data))
      },
      setCurrentId (state, currentId) {
        state.currentId = currentId
      }
    },
    actions: {
      changeTarget ({commit}, data) {
        commit('setTarget', data)
      }
    }
  })
}

export default builder
