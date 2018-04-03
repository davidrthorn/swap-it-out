<template>
  <div class="columns">
    <div class="column">
      <span class="is-subtitle is-size-3 has-text-grey-dark">
        {{ portion }}g <span v-show="foodDescription.length">&ndash;</span>
      </span>
      <span class="is-subtitle is-size-3 has-text-grey-dark">
        {{ foodDescription }}
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
    portion () {
      return this.$store.state.swaps.foods[this.currentFood].portion
    },
    foodDescription () {
      return this.$store.state.swaps.foods[this.currentFood].description
    }
  }
}
</script>

<style scoped>
.is-subtitle {
  margin-top: -0.75rem;
}
</style>
