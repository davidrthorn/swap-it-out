<template>
  <div
    v-if="appLoaded"
    id="app">
    <div
      v-if="!appReady"
      class="loader-overlay">
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
              :micro-type="'vitamins'"
              class="column"/>
            <app-micros
              :micro-type="'minerals'"
              class="column"/>
          </div>
          <div class="columns">
            <div class="column">
              <div class="watch-space">
                <p>Watch this space</p>
                <p>Qualitative data will be represented here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <app-calories/>
    </div>
  </div>
</template>

<script>
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
  data () {
    return {
      targetFoods: targetFoods,
      appReady: false,
      appLoaded: false
    }
  },
  mounted () {
    let id = this.$route.params.id || '19411'
    this.changeTargetId(id)
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
        .catch(err => {
          console.log(err)
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

.watch-space {
  border-radius: 6px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  font-size: 26px;
  height: 200px;
  justify-content: center;
  margin: auto;
  text-align: center;
  width: 80%;
}

.watch-space p:first-child {
  font-weight: bold;
  font-size: 40px;
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
