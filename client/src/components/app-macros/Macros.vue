<template>
  <div>
    <div>
      <app-bar
        :target-id="targetId"
        :current-id="currentId"/>
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
  },
  props: {
    targetId: {
      type: String,
      required: true
    },
    currentId: {
      type: String,
      required: true
    }
  }
}
</script>
<style>
</style>
