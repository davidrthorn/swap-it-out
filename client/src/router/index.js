import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/:id',
    name: 'reqFood',
    component: App
  }]
})
