<template>
  <div class="column">
    <div class="columns">
      <div
        class="column"
        v-for="exercise in exercises"
        :key="exercise">
        <img
          :src="require('./images/' + exercise + '.svg')"
          width="120px">
        <p class="time">
          <animated-number
            class="is-size-1"
            :number="metCalc(exercise)[0]"
            :duration="0.18"
            v-show="metCalc(exercise)[0]"/>
          <span
            class="is-size-1"
            v-show="metCalc(exercise)[0].length">:</span>
          <animated-number
            class="is-size-1"
            :number="metCalc(exercise)[1]"
            :duration="0.18"
            v-show="metCalc(exercise)[1]"/>
          <animated-number
            class="is-size-1"
            :number="metCalc(exercise)[2]"
            :duration="0.18"/>
          <span class="is-size-3">{{ metCalc(exercise)[0].length ? 'hr' : 'min' }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import metData from '../../data/met.json'

export default {
  props: {
    calories: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      metData: metData,
      exercises: ['walk', 'run', 'cycle']
    }
  },
  methods: {
    metCalc (exercise) {
      let weight = 83.6
      let height = 175
      let age = 30
      let bmr = (13.5 * weight) + (5 * height) - (6.76 * age) + 66
      return this.toTime((24 * this.calories) / (bmr * this.metData[exercise]))
    },
    toTime (float) {
      let hrs = Math.floor(float)
      let minZero = ('0' + Math.round(float % 1 * 60)).substr(-2)
      let m1 = parseInt(minZero.charAt(0))
      let m2 = parseInt(minZero.charAt(1))

      return [hrs, m1, m2]
    }
  }
}
</script>
<style scoped>
img {
  margin-bottom: -8px;
}

.time {
  font-size: 0.3rem;
}
</style>
