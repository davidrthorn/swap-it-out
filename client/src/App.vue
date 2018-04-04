<template>
  <div
    id="app"
    class="container is-fluid">
    <app-navbar
      @currentIdChanged="changeCurrentId($event)"
      @targetIdChanged="changeTargetId($event)"/>
    <app-details class="details"/>
    <div class="columns">
      <app-macros class="column is-5"/>
      <!--
      <div class="column">
        <div class="columns">
          <app-micros
            class="column"
            :micro-type="'minerals'"
            :current-id="currentId"/>
          <app-micros
            class="column"
            :micro-type="'vitamins'"
            :current-id="currentId"/>
        </div>
        <div class="columns">
          <div class="column is-1"/>
          <app-qual class="column is-10"/>
        </div>
      </div>
        -->
    </div>
    <!--
  <app-calories
  :current-id="currentId"/>
    -->
  </div>
</template>

<script>
/* eslint-disable */
// Components
import Navbar from './components/app-navbar/Navbar.vue'
import Details from './components/app-details/Details.vue'
import Macros from './components/app-macros/Macros.vue'
import Micros from './components/app-micros/Micros.vue'
import Qual from './components/app-qual/Qual.vue'
import Calories from './components/app-calories/Calories.vue'
import targetFoods from '@/data/target-foods.json'

import Axios from 'axios'

export default {
  components: {
    appNavbar: Navbar,
    appDetails: Details,
    appMacros: Macros,
    appMicros: Micros,
    appQual: Qual,
    appCalories: Calories
  },
  data () {
    return {
      targetFoods: targetFoods
    }
  },
  methods: {
    changeTargetId (id) {
      let foods = [id, ...this.targetFoods[id].swaps].join('_')

      Axios.get(`http://localhost:8081/api/food?foods=${foods}`).then(res => {
        let data = res.data.data
        data.targetId = id
        data.currentId = id
        this.$store.dispatch('changeTarget', res.data.data).then(res => {
          console.log(res)
          this.$store.commit('setTarget', id)
          this.$store.commit('setCurrent', id)
        })
      })
    },
    changeCurrentId (id) {
      this.$store.commit('setCurrent', id)
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
