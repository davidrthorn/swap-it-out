<template>
  <div
    id="app"
    class="container is-fluid">
    <!--
    <app-navbar
      :current-food="currentFood"
      @currentChanged="currentFood = $event"
      @initialChanged="requestFood($event)"/>
    -->
    <app-details
      :current="currentFood"
      class="details"/>
      <!--
    <div class="columns">
      <app-macros
        class="column is-5"
        :current-food="currentFood"/>
      <div class="column">
        <div class="columns">
          <app-micros
            class="column"
            :micro-type="'minerals'"
            :current-food="currentFood"/>
          <app-micros
            class="column"
            :micro-type="'vitamins'"
            :current-food="currentFood"/>
        </div>
        <div class="columns">
          <div class="column is-1"/>
          <app-qual class="column is-10"/>
        </div>
      </div>
    </div>
    <app-calories
    :current-food="currentFood"/>
    -->
  </div>
</template>

<script>
// Components
import Navbar from './components/app-navbar/Navbar.vue'
import Details from './components/app-details/Details.vue'
import Micros from './components/app-micros/Micros.vue'
import Macros from './components/app-macros/Macros.vue'
import Calories from './components/app-calories/Calories.vue'
import Qual from './components/app-qual/Qual.vue'

import axios from 'axios'

import targetFoods from '@/data/target-foods.json'

export default {
  components: {
    appNavbar: Navbar,
    appDetails: Details,
    appMicros: Micros,
    appMacros: Macros,
    appCalories: Calories,
    appQual: Qual
  },
  data () {
    return {
      targetFoods: targetFoods,
      currentFood: '19411'
    }
  },
  created () {
    let reqFood = this.$route.params.id || '19411'
    this.requestFood(reqFood)
  },
  methods: {
    requestFood (id) {
      let foods = [id, ...this.targetFoods[id].swaps].join('_')
      this.$store.commit('setTarget', id)
      this.$store.commit('setCurrent', id)
      axios.get(`http://localhost:8081/api/food?foods=${foods}`).then(res => {
        this.$store.commit('setDescriptions', {
          targetID: id,
          foods: res.data.data.foods
        })
        this.$store.commit('setMacros', {
          targetID: id,
          foods: res.data.data.foods
        })
        this.$store.commit('setMicros', {
          targetID: id,
          foods: res.data.data.foods
        })
      })
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
