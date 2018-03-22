<template>
  <div class="navbar is-fixed-top">
    <div class="navbar-item">
      <div class="buttons">
        <div class="dropdown is-hoverable">
          <div class="dropdown-trigger">
            <div
              class="button is-large"
              :class="{ 'is-primary': currentTarget === currentFood }"
              @click="changeCurrent(currentTarget)">
              <span>{{ currentTarget | capitalize }}</span>
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
                v-for="target in allTargets"
                :key="target"
                @click="changeInitial(target)">
                {{ target | capitalize }}
              </a>
            </div>
          </div>
        </div>
        <div
          class="button is-large"
          v-for="swap in currentSwaps"
          :key="swap"
          :class="{ 'is-primary': swap === currentFood }"
          @click="changeCurrent(swap)">
          {{ swap | capitalize }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swaps from '../../data/swaps.json'

export default {
  props: {
    currentFood: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      swaps: swaps
    }
  },
  computed: {
    currentTarget () {
      return this.$store.state.targetFood.name
    },
    currentSwaps () {
      let store = this.$store.state
      let final = []
      Object.values(store.swaps).forEach(swap => { final.push(swap.name) })

      return final
    },
    allTargets () {
      return Object.keys(this.swaps)
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
