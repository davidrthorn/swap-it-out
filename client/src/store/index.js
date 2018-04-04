import Vue from 'vue'
import Vuex from 'vuex'
import controllers from '@/store/controllers'

Vue.use(Vuex)

function builder (data) {
  return new Vuex.Store({
    state: {
      targetId: data.targetId,
      currentId: data.targetId,
      descriptions: controllers.getDescriptions(data.targetId, data.foods),
      macros: controllers.getMacros(data.targetId, data.foods),
      micros: controllers.getMicros(data.targetId, data.foods)
    },
    mutations: {
      setTarget (state, targetId) {
        state.targetId = targetId
      },
      setCurrent (state, currentId) {
        state.currentId = currentId
      },
      setDescriptions (state, data) {
        state.descriptions = controllers.getDescriptions(data.targetId, data.foods)
      },
      setMacros (state, data) {
        state.macros = controllers.getMacros(data.targetId, data.foods)
      },
      setMicros (state, data) {
        state.micros = controllers.getMicros(data.targetId, data.foods)
      }
    },
    actions: {
      changeTarget ({ state, commit }, data) {
        return new Promise((resolve, reject) => {
          commit('setDescriptions', data)
          commit('setMacros', data)
          commit('setMicros', data)

          if (state.micros[data.targetId]) resolve('success')
        })
      }
    }
  })
}

export default builder
