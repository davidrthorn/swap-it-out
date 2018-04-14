import Vue from 'vue'
import Vuex from 'vuex'
import ctr from '@/store/controllers'

Vue.use(Vuex)

function createState (data) {
  let id = data.targetId
  let food = [id, data.foods]

  return {
    targetId: id,
    currentId: id,
    descriptions: ctr.getDescriptions(...food),
    macros: ctr.getMacros(...food),
    vitamins: ctr.getMicros(...food, 'vitamins'),
    minerals: ctr.getMicros(...food, 'minerals')
  }
}

export const store = new Vuex.Store({
  state: {
    targetId: '19411',
    currentId: '19411'
  },
  mutations: {
    setTargetId (state, data) {
      Object.assign(state, createState(data))
    },
    setCurrentId (state, id) {
      state.currentId = id
    }
  },
  actions: {
    changeTargetId ({commit}, data) {
      commit('setTargetId', data)
    },
    changeCurrentId ({commit}, id) {
      commit('setCurrentId', id)
    }
  }
})
