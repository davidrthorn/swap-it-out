import Vue from 'vue'
import App from '@/App'
import router from '@/router'

import animatedNumber from '@/components/animated-number.js'
import { store } from '@/store/index'

Vue.config.productionTip = false

Vue.filter('capitalize', (value) => value.substr(0, 1).toUpperCase() + value.substr(1))

Vue.component('animatedNumber', animatedNumber)

/* eslint-disable no-new */
new Vue({
  store: store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
