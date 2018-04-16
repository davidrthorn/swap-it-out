<template>
  <div style="position: relative">
    <div>
      <input
        class="input is-large is-primary is-capitalized"
        v-model="dropEntry"
        @focus="showList()"
        @blur="hideList()">
    </div>
    <div
      class="food-list"
      v-if="listVisible">
      <div
        class="drop-item is-size-5 is-capitalized"
        v-for="(value, key) in targetList"
        :key="`drop_${key}`"
        @click="changeTargetId(value, key)"
        @mouseover="dropdownHover = true"
        @mouseleave="dropdownHover = false">
        {{ key }}
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
      listVisible: false,
      dropdownHover: false
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
    listVisible () {
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
      this.dropdownHover = false
    },
    hideList () {
      if (this.dropdownHover) {
        setTimeout(() => {
          this.listVisible = false
        }, 300)
      } else {
        this.listVisible = false
      }
    },
    showList () {
      this.listVisible = true
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
  width: 15rem;
}

.food-list {
  background: white;
  box-shadow: 1px 1px 1px 1px rgba(200, 200, 200, 0.5);
  position: absolute;
  top: 60px;
  width: 100%;
}

.drop-item:hover {
  background: rgba(0, 180, 180, 0.2);
}

.drop-item {
  cursor: pointer;
  padding: 8px;
}
</style>
