<template>
  <div class="columns">
    <div class="column">
      <span class="is-subtitle is-size-3 has-text-grey-dark">
        {{ Math.round(portion) }}g &ndash;
      </span>
      <span
        :class="{'has-text-grey-light': !details.length, 'is-italic': !details.length}"
        class="is-subtitle is-size-3 has-text-grey-dark">
        {{ details.length ? details.toLowerCase() : 'no further details' }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    targetId () {
      return this.$store.state.targetId
    },
    currentId () {
      return this.$store.state.currentId
    },
    portion () {
      return this.$store.state.descriptions[this.currentId].portion
    },
    details () {
      return this.$store.state.descriptions[this.currentId].details
    }
  }
}
</script>

<style scoped>
.is-subtitle {
  margin-top: -0.75rem;
}
</style>
