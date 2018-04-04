<template>
  <div>
    <div>
      <app-bar/>
    </div>
    <!--
    <app-quant
      :initial="initial"
      :current-macros="macros[currentId]"
      style="margin-top: 24px"/>
    -->
  </div>
</template>
<script>
import Bar from './Bar.vue'
import Quant from './Quant.vue'

export default {
  components: {
    appBar: Bar,
    appQuant: Quant
  }
}
</script>
<style>
</style>
