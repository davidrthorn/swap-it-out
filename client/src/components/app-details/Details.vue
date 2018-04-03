<template>
  <div class="columns">
    <div class="column">
      <span class="is-subtitle is-size-3 has-text-grey-dark">
        {{ portion }}g
        <span v-show="details.length">&ndash;</span>
      </span>
      <span class="is-subtitle is-size-3 has-text-grey-dark">
        {{ details }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: String,
      required: true
    }
  },
  computed: {
    desc () {
      return this.$store.state.descriptions
    },
    portion () {
      return this.current in this.desc
        ? this.desc[this.current].portion
        : 0
    },
    details () {
      return this.current in this.desc
        ? this.desc[this.current].details
        : ''
    }
  }
}
</script>

<style scoped>
.is-subtitle {
  margin-top: -0.75rem;
}
</style>
