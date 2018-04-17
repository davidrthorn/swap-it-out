<template>
  <div>
    <div
      v-for="(value, key) in micros[currentId]"
      :key="key"
      class="columns is-mobile">
      <div class="column is-3 has-text-right-desktop is-capitalized">
        <p>{{ key }}</p>
      </div>
      <div class="column">
        <div class="bar-surround">
          <div
            class="bar"
            :style="{ width: `${value.percentRda < 100 ? value.percentRda : 100}% ` }"/>
          <div
            class="compare"
            :style="{ width: `${micros[targetId][key].percentRda < 100 ? micros[targetId][key].percentRda : 100}%` }"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    microType: {
      type: String,
      required: true
    }
  },
  computed: {
    targetId () {
      return this.$store.state.targetId
    },
    currentId () {
      return this.$store.state.currentId
    },
    micros () {
      return this.$store.state[this.microType]
    }
  }

}
</script>
<style scoped>
.bar-surround {
  position: relative;
  width: 90%;
  background: #eee;
  height: 26px
}
.bar {
  color: white;
  background: #00D1B2;
  height: 100%;
  text-align: center;
  transition: width 300ms ease-out;
}
.compare {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-right: 2px solid orange;
}
.columns {
  margin-top: -0.75rem !important;
}

.hidden {
  visibility: hidden;
}
</style>
