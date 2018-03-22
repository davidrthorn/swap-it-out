<template>
  <div class="bar-chart">
    <div
      class="chart-row"
      v-for="n in rows"
      :key="'row' + n"
      :style="{ height: rowHeight + '%'}">
      <div class="y-label"><p>{{ (rows + 1 - n) * 10 }}g</p></div>
      <div class="rows">
        <div class="row"/>
        <div class="row"/>
      </div>
    </div>
    <div
      class="chart-row"
      :style="{ height: rowHeight + '%'}">
      <div class="y-label"><p>0g</p></div>
      <div class="rows">
        <div class="row"/>
        <div
          class="row"
          id="x-row">
          <div class="x-label">Fat</div>
          <div class="x-label">Protein</div>
          <div class="x-label">Carbs</div>
        </div>
      </div>
    </div>
    <div
      class="bar"
      id="fat-bar"
      :style="{ height: `${barHeight(totalFatCurrent)}%`, bottom: `${rowHeight / 2}%` }">
      <div
        class="sub-fat"
        style="background: lightcoral"
        :style="{ height: `${100 * macros.sat / totalFatCurrent}%` }"/>
      <div
        class="sub-fat"
        style="background: skyblue"
        :style="{ height: `${100 * macros.mono / totalFatCurrent}%` }"/>
      <div
        class="sub-fat"
        style="background: lightsalmon"
        :style="{ height: `${100 * macros.poly / totalFatCurrent}%` }"/>
    </div>
    <div
      class="reference"
      id="fat-reference"
      :style="{ bottom: `${rowHeight / 2 + barHeight(totalFatInitial)}%` }"/>
    <div
      class="bar"
      id="protein-bar"
      :style="{ height: `${barHeight(macros.protein)}%`, bottom: `${rowHeight / 2}%` }"/>
    <div
      class="reference"
      id="protein-reference"
      :style="{ bottom: `${rowHeight / 2 + barHeight(initial.protein)}%` }"/>
    <div
      class="bar"
      id="carb-bar"
      :style="{ height: `${barHeight(macros.carbs)}%`, bottom: `${rowHeight / 2}%` }"/>
    <div
      class="reference"
      id="carb-reference"
      :style="{ bottom: `${rowHeight / 2 + barHeight(initial.carbs)}%` }"/>

  </div>
</template>

<script>
export default {
  props: {
    initial: {
      type: Object,
      required: true
    },
    macros: {
      type: Object,
      required: true
    }
  },
  computed: {
    totalFatCurrent () {
      return this.macros.sat + this.macros.mono + this.macros.poly
    },
    totalFatInitial () {
      return this.initial.sat + this.initial.mono + this.initial.poly
    },
    rows () {
      let swaps = this.$store.state.swaps
      let macroValues = []
      const addToMacro = food => {
        let totalFat = food.sat + food.mono + food.mono
        macroValues.push(
          totalFat,
          food.protein,
          food.carbs
        )
      }

      addToMacro(this.initial)
      for (let swap in swaps) addToMacro(swaps[swap].macros)

      return Math.ceil(Math.max(...macroValues) / 10)
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
  transition: height 450ms ease;
}

#fat-bar, #fat-reference {
  left: 15%;
}

.sub-fat {
  width: 100%;
  transition: height 450ms ease;
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
