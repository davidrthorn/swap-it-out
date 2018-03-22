import Vue from 'vue'
import Vuex from 'vuex'
import { createDataStore } from './create'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: createDataStore('crisps')
})
