<template>
  <div style="position: relative; color: indianred">
    <div>
      <input v-model="dropEntry">
    </div>
    <div
      class="food-list"
      v-if="showList">
      <div
        class="drop-item"
        v-for="(value, key) in targetList"
        :key="`drop_${key}`"
        @click="changeTargetId(value, key)">
        {{ key | capitalize }}
      </div>
    </div>
  </div>
</template>

<script>
import targetFoods from '@/data/target-foods.json'

export default {
  data () {
    return {
      targetFoods: targetFoods,
      targetList: {},
      dropEntry: targetFoods[this.$route.params.id].name,
      showList: true
    }
  },
  computed: {
    testComp () {
      return this.dropEntry
    },
    targetNames () {
      let namePairs = {}
      for (let id in targetFoods) {
        namePairs[targetFoods[id].name] = id
      }
      return namePairs
    }
  },
  watch: {
    showList () {
      this.filterList()
    },
    dropEntry () {
      this.filterList()
    }
  },
  methods: {
    changeTargetId (id, name) {
      this.$emit('targetIdChanged', id)
      this.dropEntry = name
    },
    filterList () {
      let list = {}
      let keys = Object.keys(this.targetNames).filter(k => k.match(this.dropEntry.toLowerCase())).splice(0, 10)
      for (let key of keys) {
        list[key] = this.targetNames[key]
      }
      this.targetList = list
    }
  }
}
</script>
<style scoped>
input {
  text-transform: capitalize
}

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
