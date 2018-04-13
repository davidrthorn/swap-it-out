import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import Axios from 'axios'

import animatedNumber from '@/components/animated-number.js'
import createStore from '@/store/index.js'
import targetFoods from '@/data/target-foods.json'

Vue.config.productionTip = false

Vue.filter('capitalize', (value) => value.substr(0, 1).toUpperCase() + value.substr(1))

Vue.component('animatedNumber', animatedNumber)

/* eslint-disable no-new */
const defaultId = '19411'
const foods = [defaultId, ...targetFoods[defaultId].swaps].join('_')

new Vue({
  store: createStore(data),
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
