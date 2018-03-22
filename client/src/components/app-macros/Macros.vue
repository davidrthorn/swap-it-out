<template>
  <div>
    <div>
      <app-bar
        :initial="initial"
        :macros="macros"/>
    </div>
    <app-quant
      :macros="macros"
      style="margin-top: 24px"/>
  </div>
</template>
<script>
import Bar from './Bar.vue'
import Quant from './Quant.vue'

export default {
  components: {
    appBar: Bar,
    appQuant: Quant
  },
  props: {
    currentFood: {
      type: String,
      required: true
    }
  },
  computed: {
    macros () {
      let swap = this.$store.state.swaps[this.currentFood]
      return swap ? swap.macros : this.$store.state.targetFood.macros
    },
    initial () {
      return this.$store.state.targetFood.macros
    }
  }
}
</script>
<style>
</style>
