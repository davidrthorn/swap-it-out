<template>
  <div class="bar-chart">
    <div
      v-for="n in rows"
      :key="'row' + n"
      :style="{ height: rowHeight + '%'}"
      class="chart-row">
      <div class="y-label"><p>{{ (rows + 1 - n) * 10 }}g</p></div>
      <div class="rows">
        <div class="row"/>
        <div class="row"/>
      </div>
    </div>
    <div
      :style="{ height: rowHeight + '%'}"
      class="chart-row">
      <div class="y-label"><p>0g</p></div>
      <div class="rows">
        <div class="row"/>
        <div
          id="x-row"
          class="row">
          <div class="x-label">Fat</div>
          <div class="x-label">Protein</div>
          <div class="x-label">Carbs</div>
        </div>
      </div>
    </div>
    <div
      id="fat-bar"
      :style="{ height: `${barHeight(totalFatCurrent)}%`, bottom: `${rowHeight / 2}%` }"
      class="bar">
      <div
        :style="{ height: `${100 * macros[currentId].saturated / totalFatCurrent}%` }"
        class="sub-fat"
        style="background: lightcoral"/>
      <div
        :style="{ height: `${100 * macros[currentId].monounsaturated / totalFatCurrent}%` }"
        class="sub-fat"
        style="background: skyblue"/>
      <div
        :style="{ height: `${100 * macros[currentId].polyunsaturated / totalFatCurrent}%` }"
        class="sub-fat"
        style="background: lightsalmon"/>
    </div>
    <div
      id="fat-reference"
      :style="{ bottom: `${rowHeight / 2 + barHeight(totalFatInitial)}%` }"
      class="reference"/>
    <div
      id="protein-bar"
      :style="{ height: `${barHeight(macros[currentId].protein)}%`, bottom: `${rowHeight / 2}%` }"
      class="bar"/>
    <div
      id="protein-reference"
      :style="{ bottom: `${rowHeight / 2 + barHeight(macros[targetId].protein)}%` }"
      class="reference"/>
    <div
      id="carb-bar"
      :style="{ height: `${barHeight(macros[currentId].carbs)}%`, bottom: `${rowHeight / 2}%` }"
      class="bar"/>
    <div
      id="carb-reference"
      :style="{ bottom: `${rowHeight / 2 + barHeight(macros[targetId].carbs)}%` }"
      class="reference"/>

  </div>
</template>

<script>
export default {
  computed: {
    targetId () {
      return this.$store.state.targetId
    },
    currentId () {
      return this.$store.state.currentId
    },
    macros () {
      return this.$store.state.macros
    },
    totalFatCurrent () {
      let m = this.macros[this.currentId]
      return m.saturated + m.monounsaturated + m.polyunsaturated
    },
    totalFatInitial () {
      let m = this.macros[this.targetId]
      return m.saturated + m.monounsaturated + m.polyunsaturated
    },
    rows () {
      let m = this.macros
      let maxMacros = 0
      let discard = [
        'fibre',
        'sugar',
        'salt'
      ]

      for (let id in m) {
        for (let macro in m[id]) {
          if (discard.includes(macro)) continue
          maxMacros = m[id][macro] > maxMacros ? m[id][macro] : maxMacros
        }
      }
      return Math.ceil(maxMacros / 10)
    },
    rowHeight () {
      return 100 / (this.rows + 1)
    }
  },
  methods: {
    barHeight (value) {
      return (100 - this.rowHeight) * (10 / this.rows) * (value / 100)
    }
  }
}
</script>

<style scoped>

.bar-chart {
  width: 100%;
  height: 400px;
  position: relative;
}

.chart-row {
  clear: both;
  width: 100%;
  margin: 0 !important;
}

.y-label {
  position: relative;
  font-size: 0.7em;
  float: left;
  width: 9%;
  height: 100%;
}

.y-label p {
  position: absolute;
  top: calc(50% - 1em);
  right: 6px;
  color: #999;
}

.rows {
  float: left;
  height: 100%;
  width: 90%;
}

.row {
  height: 50%;
  width: 100%;
  border-left: 1px solid lightgrey;
}

.row:first-child {
  border-bottom: 1px solid lightgrey
}

.bar {
  position: absolute;
  width: 23%;
  transition: height 450ms ease-out;
}

#fat-bar, #fat-reference {
  left: 15%;
}

.sub-fat {
  width: 100%;
  transition: height 450ms ease-out;
}

#protein-bar, #protein-reference {
  left: 43%;
  background: pink;
}

#carb-bar, #carb-reference {
  left: 71%;
  background: darkslategray;
}

.reference {
  position: absolute;
  width: 23%;
  height: 2px;
  background: indianred !important;
  transition: bottom 450ms ease;
}

#x-row {
  border-top: 1px solid grey;
  border-left: none;
}

.x-label {
  float: left;
  color: #999;
  text-align: center;
  width: calc(23% * 10 / 9);
  margin-right: calc(5% * 10 / 9);
}

.x-label:first-child {
  margin-left: calc(6% * 10 / 9)
}
</style>
