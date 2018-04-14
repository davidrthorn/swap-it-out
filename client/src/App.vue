<template>
  <div
    id="app"
    v-if="appLoaded">
    <div
      class="loader-overlay"
      v-if="!appReady">
      <div class="loader"/>
    </div>
    <div class="container is-fluid">
      <app-navbar
        @currentIdChanged="changeCurrentId($event)"
        @targetIdChanged="changeTargetId($event)"/>
      <app-details class="details"/>
      <div class="columns">
        <app-macros class="column is-5"/>
        <div class="column">
          <div class="columns">
            <app-micros
              class="column"
              :micro-type="'vitamins'"/>
            <app-micros
              class="column"
              :micro-type="'minerals'"/>
          </div>
          <div class="columns">
            <div class="column is-1"/>
            <app-qual class="column is-10"/>
          </div>
        </div>
      </div>
      <app-calories/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
// Components
import Axios from 'axios'

import Navbar from './components/app-navbar/Navbar.vue'
import Details from './components/app-details/Details.vue'
import Macros from './components/app-macros/Macros.vue'
import Micros from './components/app-micros/Micros.vue'
import Qual from './components/app-qual/Qual.vue'
import Calories from './components/app-calories/Calories.vue'

import targetFoods from '@/data/target-foods.json'

export default {
  components: {
    appNavbar: Navbar,
    appDetails: Details,
    appMacros: Macros,
    appMicros: Micros,
    appQual: Qual,
    appCalories: Calories
  },
  mounted () {
    let id = this.$route.params.id || '19411'
    this.changeTargetId(id)
  },
  data () {
    return {
      targetFoods: targetFoods,
      appReady: false,
      appLoaded: false
    }
  },
  methods: {
    changeTargetId (id) {
      this.appReady = false
      let foods = [id, ...this.targetFoods[id].swaps].join('_')
      Axios.get(`http://localhost:8081/api/food?foods=${foods}`).then(res => {
        let data = res.data.data
        data.targetId = id
        data.currentId = id
        this.$store.dispatch('changeTargetId', data)
        this.$router.push(id)
        this.appReady = true
        this.appLoaded = true
      })
    },
    changeCurrentId (id) {
      this.$store.dispatch('changeCurrentId', id)
    }
  }
}
</script>

<style lang="scss">
@import './css/custom.sass';
@import '~bulma/bulma.sass';

.columns {
  margin: 0 !important;
}

.navbar {
  padding: 1rem 0 0.5rem 1rem;
}

.details {
  margin-top: 1.4rem !important;
}

.dropdown-trigger .button {
  margin-right: 0.5rem !important;
}

.loader-overlay {
  z-index: 1000;
  position: absolute;
  background: rgba(200, 200, 200, 0.2);
  top: 0;
  width: 100vw;
  height: 100vh;
}
.loader {
  width: 4vw;
  height: 4vw;
  top: 44vh;
  left: 48vw;
}

@media screen and (max-width: 558px) {
  .details {
    margin-top: 5.2rem !important;
  }
}

@media screen and (max-width: 1024px) {
  .navbar {
    padding-left: 0;
  }
}
</style>
