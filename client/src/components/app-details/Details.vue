<template>
  <div class="columns">
    <div class="column">
      <span class="is-subtitle is-size-3 has-text-grey-dark">
        {{ details[0] }}g &ndash;
      </span>
      <span class="is-subtitle is-size-3 has-text-grey-dark">
        {{ details[1] }}<span v-show="details[1].length">,</span>
      </span>
      <span class="is-subtitle is-size-3 has-text-grey-dark">
        {{ details[2] }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentFood: {
      type: String,
      required: true
    }
  },
  computed: {
    details () {
      let state = this.$store.state
      let swap = state.swaps[this.currentFood]
      return swap
        ? [swap.portion, ...Object.values(swap.details)]
        : [state.targetFood.portion, ...Object.values(state.targetFood.details)]
    }
  }
}
</script>

<style scoped>
.is-subtitle {
  margin-top: -0.75rem;
}
</style>
