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
    currentId: {
      type: String,
      required: true
    }
  },
  computed: {
    desc () {
      return this.$store.state.descriptions
    },
    portion () {
      return this.currentId in this.desc
        ? this.desc[this.currentId].portion
        : 0
    },
    details () {
      return this.currentId in this.desc
        ? this.desc[this.currentId].details
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
