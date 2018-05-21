<template>
  <div>
    <div
      v-for="macro in quantMacros"
      :key="macro"
      class="columns is-mobile">
      <div class="column is-2 is-size-5">
        {{ macro | capitalize }}
      </div>
      <div class="column">
        <div class="bar-surround">
          <div
            :style="{
              width: macros[currentId][macro] + '%',
              background: macro == 'fibre' ? '#00D1B2' : 'indianred'
            }"
            class="bar"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      quantMacros: [
        'fibre',
        'sugar',
        'salt'
      ]
    }
  },
  computed: {
    targetId () {
      return this.$store.state.targetId
    },
    currentId () {
      return this.$store.state.currentId
    },
    macros () {
      return this.$store.state.macros
    }
  }
}
</script>

<style scoped>
.bar-surround {
  width: 100%;
  background: #eee;
  height: 34px;
}
.bar {
  color: white;
  height: 100%;
  text-align: center;
  transition: width 530ms ease-out;
  padding-top: 4px;
  max-width: 100%;
}
.columns {
  margin-top: -0.75rem !important;
}
</style>
