<template>
  <div style="position: relative">
    <div>
      <input
        class="input is-large is-primary is-capitalized"
        v-model="dropEntry"
        @focus="showList()"
        @blur="hideList()"
        @keyup.down="changePosition('down')"
        @keyup.up="changePosition('up')"
        @keyup.enter="changeTargetId(listKeyPosition)">
    </div>
    <div
      class="food-list"
      v-if="listVisible"
      @mouseover="listHover = true"
      @mouseleave="listHover = false">
      <div
        class="drop-item is-size-5 is-capitalized"
        v-for="(item, index) in targetList"
        :key="`drop_${item}`"
        :class="{cursorHover: index === listCursorPosition, keyHover: index === listKeyPosition}"
        @mouseover="listCursorPosition = index"
        @click="changeTargetId(listCursorPosition)">
        {{ item }}
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
      targetList: [],
      dropEntry: targetFoods[this.$route.params.id].name,
      listVisible: false,
      listHover: false,
      listCursorPosition: -1,
      listKeyPosition: -1
    }
  },
  computed: {
    targetId () {
      return targetFoods[this.$store.state.targetId].name
    },
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
    changeTargetId (index) {
      let name = this.targetList[index]
      let id = this.targetNames[name]

      this.$emit('targetIdChanged', id)
      this.dropEntry = name
      this.hideList()
      this.listHover = false
    },
    hideList () {
      let delay = this.listHover ? 300 : 0
      const resetList = () => {
        this.listVisible = false
        this.listKeyPosition = -1
        this.listCursorPosition = -1
      }
      if (this.listHover) {
        setTimeout(() => {
          resetList()
        }, delay)
      } else {
        resetList()
        this.dropEntry = this.targetId
      }
    },
    showList () {
      this.dropEntry = ''
      this.listVisible = true
    },
    filterList () {
      let item = this.dropEntry.toLowerCase()
      this.targetList = Object.keys(this.targetNames).filter(k => k.includes(item)).splice(0, 10)
    },
    changePosition (direction) {
      let length = Object.keys(this.targetList).length - 1
      let increment = direction === 'down' ? 1 : -1
      this.listKeyPosition = this.listKeyPosition + increment

      if (this.listKeyPosition >= length) this.listKeyPosition = length
      if (this.listKeyPosition < 0) this.listKeyPosition = -1
    }
  }
}
</script>
<style scoped>
input {
  width: 15rem;
}

.food-list {
  z-index: 1000;
  background: rgb(250, 250, 250);
  box-shadow: 2px 2px 2px 2px rgba(200, 200, 200, 0.2);
  position: absolute;
  top: 60px;
  width: 100%;
}

.keyHover {
  background: rgba(0, 180, 180, 0.2);
}

.cursorHover {
  color: olivedrab;
}

.drop-item {
  cursor: pointer;
  padding: 8px;
}
</style>
