<template>
  <div class="navbar is-fixed-top">
    <div class="navbar-item">
      <div class="buttons">
        <div class="dropdown is-hoverable">
          <div class="dropdown-trigger">
            <div
              class="button is-large"
              :class="{ 'is-primary': targetId === currentId }"
              @click="changeCurrent(targetId)">
              <span>{{ targetFoods[targetId].name | capitalize }}</span>
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
                v-for="(value, key) in targets"
                :key="'targets_' + key"
                @click="changeInitial(key)">
                {{ value | capitalize }}
              </a>
            </div>
          </div>
        </div>
        <div
          class="button is-large"
          :class="{ 'is-primary': key === currentId }"
          v-for="(value, key) in swaps"
          :key="'current_' + key"
          @click="changeCurrent(key)">
          {{ value.name | capitalize }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import targetFoods from '@/data/target-foods.json'

export default {
  props: {
    targetId: {
      type: String,
      required: true
    },
    currentId: {
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
    desc () {
      return this.$store.state.descriptions
    },
    swaps () {
      let swaps = {}
      for (let id in this.desc) {
        if (id !== this.targetId) swaps[id] = this.desc[id]
      }
      return swaps
    },
    targets () {
      let targets = {}
      for (let target in this.targetFoods) {
        targets[target] = this.targetFoods[target].name
      }
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
