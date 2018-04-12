<template>
  <div>
    <div
      v-for="(value, key) in micros[currentId]"
      :key="key"
      class="columns is-mobile">
      <div class="column is-3 has-text-right-desktop">
        <p>{{ key | capitalize }}</p>
      </div>
      <div class="column">
        <div class="bar-surround">
          <div
            class="bar"
            :style="{ width: `${value}%` }"/>
        </div>
      </div>
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
    micros () {
      return this.$store.state.micros
    }
  }

}
</script>
<style scoped>
.bar-surround {
  width: 90%;
  background: #eee;
  height: 26px
}
.bar {
  color: white;
  background: #00D1B2;
  height: 100%;
  text-align: center;
  transition: width 500ms ease;
  max-width: 100%
}
.columns {
  margin-top: -0.75rem !important;
}

.hidden {
  visibility: hidden;
}
</style>
