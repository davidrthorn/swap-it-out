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
        @keyup.enter="changeTargetId()">
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
        :class="{dropHover: listPosition === index}"
        @mouseover="listPosition = index"
        @click="changeTargetId()">
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
      dropEntry: targetFoods[this.$store.state.targetId].name,
      listVisible: false,
      listHover: false,
      listPosition: 0
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
    changeTargetId () {
      let name = this.targetList[this.listPosition]
      let id = this.targetNames[name]

      this.$emit('targetIdChanged', id)
      this.dropEntry = name
      this.listPosition = 0
      this.listHover = false
    },
    hideList () {
      if (this.listHover) {
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
      this.targetList = Object.keys(this.targetNames).filter(k => k.match(this.dropEntry.toLowerCase())).splice(0, 10)
    },
    changePosition (direction) {
      let length = Object.keys(this.targetList).length - 1
      let increment = direction === 'down' ? 1 : -1
      this.listPosition = this.listPosition + increment

      if (this.listPosition >= length) this.listPosition = length
      if (this.listPosition < 0) this.listPosition = 0
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

.dropHover {
  background: rgba(0, 180, 180, 0.2);
}

.drop-item {
  cursor: pointer;
  padding: 8px;
}
</style>
