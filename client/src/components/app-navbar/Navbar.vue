<template>
  <div class="navbar is-fixed-top">
    <div class="navbar-item">
      <target-dropdown @targetIdChanged="changeTargetId($event)"/>
    </div>
    <div class="navbar-item">
      <div class="buttons">
        <div
          v-for="(value, key) in swaps"
          :class="{ 'is-primary': key === currentId }"
          :key="'current_' + key"
          class="button is-large"
          @click="changeCurrentId(key)">
          {{ value.name | capitalize }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import targetFoods from '@/data/target-foods.json'
import targetDropdown from './TargetDropdown.vue'

export default {
  components: {
    targetDropdown: targetDropdown
  },
  data () {
    return {
      targetFoods: targetFoods
    }
  },
  computed: {
    targetId () {
      return this.$store.state.targetId
    },
    currentId () {
      return this.$store.state.currentId
    },
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
    changeCurrentId (id) {
      this.$emit('currentIdChanged', id)
    },
    changeTargetId (id) {
      this.$emit('targetIdChanged', id)
    }
  }
}
</script>

<style scoped>

.navbar {
  padding: 1rem 0 0.5rem 1rem;
  background: ghostwhite !important;
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
