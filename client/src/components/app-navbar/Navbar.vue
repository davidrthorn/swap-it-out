<template>
  <div class="navbar is-fixed-top">
    <div class="navbar-item">
      <div class="buttons">
        <div class="dropdown is-hoverable">
          <div class="dropdown-trigger">
            <div
              class="button is-large"
              :class="{ 'is-primary': targetID === currentFood }"
              @click="changeCurrent(targetID)">
              <span>{{ targetName | capitalize }}</span>
              <span style="padding: 0 0 0.5rem 0.6rem">⌄</span>
            </div>
          </div>
          <div
            class="dropdown-menu"
            id="dropdown-menu"
            role="menu">
            <div class="dropdown-content">
              <a
                class="dropdown-item"
                v-for="(value, key) in allTargets"
                :key="'allTargets_' + key"
                @click="changeInitial(key)">
                {{ value | capitalize }}
              </a>
            </div>
          </div>
        </div>
        <div
          class="button is-large"
          v-for="(value, key) in currentSwaps"
          :key="'current_' + key"
          :class="{ 'is-primary': key === currentFood }"
          @click="changeCurrent(key)">
          {{ value | capitalize }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import targetFoods from '@/data/target-foods.json'
export default {
  props: {
    currentFood: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      targetFoods: targetFoods
    }
  },
  computed: {
    targetID () {
      return this.$store.state.swaps.targetID
    },
    targetName () {
      let target = this.targetFoods[this.targetID]
      return target ? target.name : 'Error'
    },
    currentSwaps () {
      let foods = this.$store.state.swaps.foods
      let swaps = {}
      for (let food in foods) {
        if (food === this.targetID) continue
        swaps[food] = foods[food].name
      }
      return swaps
    },
    allTargets () {
      let targets = {}
      for (let target in this.targetFoods) {
        targets[target] = this.targetFoods[target].name
      }
      console.log(targets)
      return targets
    }
  },
  methods: {
    changeCurrent (food) {
      this.$emit('currentChanged', food)
    },
    changeInitial (food) {
      this.$emit('initialChanged', food)
    }
  }
}
</script>

<style scoped>

.navbar {
  padding: 1rem 0 0.5rem 1rem;
}

.dropdown-trigger .button {
  margin-right: 0.5rem !important;
}

@media screen and (max-width: 1024px) {
  .navbar {
    padding-left: 0;
  }
}
</style>
