<template>
  <div style="position: relative; color: indianred">
    <div>
      <input
        v-model="dropEntry"
        @focus="showList = true"
        @blur="showList = false">
    </div>
    <div
      class="food-list"
      v-if="showList">
      <div
        class="drop-item"
        v-for="food in dropList.splice(0, 10)"
        :key="`drop_${food}`"
        @click="changeTargetId(food)">
        {{ food }}
      </div>
      testing
    </div>
  </div>
</template>

<script>
import targetFoods from '@/data/target-foods.json'

export default {
  data () {
    return {
      targetFoods: targetFoods,
      dropEntry: '',
      showList: false
    }
  },
  computed: {
    dropList () {
      return Object.keys(this.targetFoods).filter(k => k.match(this.dropEntry))
    },
    testComp () {
      return this.dropEntry
    }
  },
  methods: {
    changeTargetId (id) {
      this.$emit('targetIdChanged', id)
    }
  }
}
</script>
<style scoped>
.food-list {
  position: absolute;
  top: 30px;
  width: 100%;
  background: skyblue;
}

.drop-item:hover {
  background: lightgray;
}

.drop-item {
  background: cornsilk;
  cursor: pointer;
  padding: 4px;
}
</style>
