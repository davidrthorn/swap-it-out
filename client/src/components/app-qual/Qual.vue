<template>
  <div class="tags">
    <span
      v-for="(item, index) in list"
      :key="index"
      class="tag is-medium is-info">
      {{ item }}
    </span>
  </div>
</template>

<script>

export default {
  data () {
    return {
      list: [
        'turmeric',
        'arsenic',
        'camomile',
        'triptophan',
        'abracadabra',
        'turmeric',
        'turmeric',
        'arsenic',
        'camomile',
        'triptophan',
        'abracadabra',
        'arsenic',
        'camomile',
        'triptophan',
        'abracadabra'
      ]
    }
  }
}
</script>

<style scoped>
</style>
