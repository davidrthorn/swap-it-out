// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import animatedNumber from './components/animated-number.js'
import { store } from './store/index.js'
Vue.config.productionTip = false

Vue.filter('capitalize', (value) => value.substr(0, 1).toUpperCase() + value.substr(1))

Vue.component('animatedNumber', animatedNumber)

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
