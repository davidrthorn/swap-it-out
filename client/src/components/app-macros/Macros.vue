<template>
  <div>
    <div>
      <app-bar/>
    </div>
    <app-quant style="margin-top: 24px"/>
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
