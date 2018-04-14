<template>
  <div style="position: relative">
    <div>
      <input>
    </div>
    <div class="list">
      hello
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    dropList () {
      return 'THE LIST GO HERE'
    }
  }
}
</script>
<style scoped>
.list {
  position: absolute;
  top: 30px;
  width: 100%;
  height: 400px;
  background: skyblue;
}
</style>
